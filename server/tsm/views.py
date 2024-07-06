from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt

from .summarization import Summarization

def index(request):
    return HttpResponse("Hello world. For testing.")

@csrf_exempt
def get_response(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        message = data['message']

        chat_response = Summarization.predict_one(message)
        response = {'text': chat_response[0], 'hidden_state': chat_response[1].tolist()}

    else:
	    response['error'] = 'no post data found'
    return HttpResponse(json.dumps(response), content_type="application/json")

@csrf_exempt
def get_many_response(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        message = data['message']

        chat_response = Summarization.predict_many(message)
        response = {'text': chat_response[0], 'hidden_state': chat_response[1].tolist()}

    else:
	    response['error'] = 'no post data found'
    return HttpResponse(json.dumps(response), content_type="application/json")