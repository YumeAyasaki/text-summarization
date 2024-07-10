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
    
    def __call__(self):
        return self
    
    def get_summary(self, input_text, max_length_in = 512, max_length_out = 128):
        inputs = self.tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=max_length_in, truncation=True).to(self.device)
        with torch.no_grad():
            pre_summary = self.model.generate(inputs, max_length=max_length_out, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True, output_hidden_states=True)
            summary = self.tokenizer.decode(pre_summary[0], skip_special_tokens=True)
        return summary
        
    def get_summaries(self, input_texts, max_length_in = 512, max_length_out = 128, batch_size = 4):
        input_text_arrays = ["summarize: " + x for x in input_texts]
        model_input = self.tokenizer(input_text_arrays, padding=True, truncation=True, return_tensors="pt").to(self.device)
        
        summaries = []
        
        with torch.no_grad():
            for i in range(0, len(model_input["input_ids"]), batch_size):
                batch_input_ids = model_input["input_ids"][i:i + batch_size]
                
                pre_summaries = self.model.generate(batch_input_ids, max_length=max_length_out,
                                                min_length=40, length_penalty=2.0, num_beams=4,
                                                early_stopping=True, output_hidden_states=True)

                for summary in pre_summaries:
                    decoded_summary = self.tokenizer.decode(summary, skip_special_tokens=True)
                    summaries.append(decoded_summary)
                    
        return summaries
    
    def get_encoder_output(self, input_text, max_length_in = 512, max_length_out = 128, batch_size = 4):
        input = self.tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=max_length_in, truncation=True).to(self.device)
        with torch.no_grad():
            encoder_after = self.model.forward (input_ids=input, labels=input, output_hidden_states=True, output_attentions=True)
            encoder_last_hidden_state_np = encoder_after['encoder_last_hidden_state'].cpu().numpy()
            modelOutput = np.sum(encoder_last_hidden_state_np, axis = 1)[0]
            return modelOutput.tolist()
    
Summarization = Summarization()