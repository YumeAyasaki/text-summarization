from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt

from .dataset import Dataset

from .summarization import Summarization
from .dataset import Dataset

def index(request):
    return HttpResponse("Hello world. For testing.")

@csrf_exempt
def get_response(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        message = data['message']

        chat_response = Summarization.get_summary(message)
        response = {'text': chat_response}

    else:
	    response['error'] = 'no post data found'
    return HttpResponse(json.dumps(response), content_type="application/json")

@csrf_exempt
def get_encoder_response(request):
    data = Dataset()
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        message = data['message']

        chat_response = Summarization.get_encoder_output(message)
        response = {'hidden_state': chat_response}

    else:
	    response['error'] = 'no post data found'
    return HttpResponse(json.dumps(response), content_type="application/json")

@csrf_exempt
def get_many_response(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data['message']

        chat_response = Summarization.get_summaries(message)
        response = {'text': chat_response}

    else:
	    response['error'] = 'no post data found'
    return HttpResponse(json.dumps(response), content_type="application/json")

@csrf_exempt
def get_samples(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        number, sample = data['number'], data['sample']
        
        dataset = Dataset()
        res = dataset.get_data(number, sample)
    else:
        res['error'] = 'no method'
    return HttpResponse(json.dumps(res), content_type="application/json")

@csrf_exempt
def get_relate(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        idx = data['idx']
        
        dataset = Dataset()
        res = dataset.get_related_document(idx)
    else:
        res['error'] = 'no method'
    return HttpResponse(json.dumps(res), content_type="application/json")