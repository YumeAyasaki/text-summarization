from django.conf import settings
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch
from datasets import Dataset
import numpy as np

class Summarization:
    def __init__(self):
        pass
    
    # Config
    # Will put in a config file later
    path = settings.BASE_DIR.joinpath("model")
    
    # Initialize
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = AutoModelForSeq2SeqLM.from_pretrained(path, local_files_only=True, output_hidden_states=True).to(device).eval()
    tokenizer = AutoTokenizer.from_pretrained(path, local_files_only=True, output_hidden_states=True)
    
    def predict_one(input_text, max_length_in = 512, max_length_out = 128, model = model, tokenizer = tokenizer, device = device):
        inputs = tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=max_length_in, truncation=True).to(device)
        with torch.no_grad():
            pre_summary = model.generate(inputs, max_length=max_length_out, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True, output_hidden_states=True)
            summary = tokenizer.decode(pre_summary[0], skip_special_tokens=True)
            encoder_after = model.forward (input_ids=inputs, labels=inputs, output_hidden_states=True, output_attentions=True)
            # print(encoder_after.keys())
            encoder_last_hidden_state_np = encoder_after['encoder_last_hidden_state'].cpu().numpy()
            modelOutput = np.sum (encoder_last_hidden_state_np, axis = 1)[0]
            return summary, modelOutput
        
    def predict_many(input_texts, max_length_in = 512, max_length_out = 128, batch_size = 1, model = model, tokenizer = tokenizer, device = device):
        input_text_arrays = ["summarize: " + x for x in input_texts]
        model_input = tokenizer(input_text_arrays, padding=True, truncation=True, return_tensors="pt").to(device)
        
        summaries = []
        model_outputs = []
        with torch.no_grad():
            for i in range(0, len(model_input["input_ids"]), batch_size):
                batch_input_ids = model_input["input_ids"][i:i + batch_size]
                batch_attention_mask = model_input["attention_mask"][i:i + batch_size]

                pre_summaries = model.generate(batch_input_ids, max_length=max_length_out,
                                                min_length=40, length_penalty=2.0, num_beams=4,
                                                early_stopping=True, output_hidden_states=True)

                for summary in pre_summaries:
                    decoded_summary = tokenizer.decode(summary, skip_special_tokens=True)
                    summaries.append(decoded_summary)
                    
                batch_encoder_after = model(input_ids=batch_input_ids,
                                         attention_mask=batch_attention_mask,
                                         labels=batch_input_ids)  # Assuming labels=input_ids
                batch_encoder_last_hidden_state = batch_encoder_after['encoder_last_hidden_state']

                # Mask out padding tokens
                batch_encoder_last_hidden_state[batch_attention_mask == 0] = 0
                batch_model_output = torch.sum(batch_encoder_last_hidden_state, dim=1)  # Efficiently sum using torch

                model_outputs.append(batch_model_output.cpu().numpy())  # Append to list for concatenation

        # Concatenate model outputs for all batches
        model_outputs = np.concatenate(model_outputs, axis=0)

        return summaries, model_outputs