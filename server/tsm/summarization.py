from django.conf import settings
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch

class Summarization:
    def __init__(self):
        pass
    
    # Config
    # Will put in a config file later
    path = settings.BASE_DIR.joinpath("model")
    
    print(path)
    
    # Initialize
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = AutoModelForSeq2SeqLM.from_pretrained(path, local_files_only=True, output_hidden_states=True).to(device).eval()
    tokenizer = AutoTokenizer.from_pretrained(path, local_files_only=True, output_hidden_states=True)
    
    def summarize_one(input_text, max_length_in = 512, max_length_out = 128, model = model, tokenizer = tokenizer, device = device):
        input = tokenizer.encode("summarize: " + input_text, return_tensors="pt", max_length=max_length_in, truncation=True).to(device)
        with torch.no_grad():
            summary_ids = model.generate(input, max_length=max_length_out, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True, output_hidden_states=True)
            summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
            fuckme = model.forward (input_ids=input, labels=input, output_hidden_states =True)
            return summary, fuckme, summary_ids
        
    
        