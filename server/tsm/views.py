from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt

from .summarization import Summarization

def index(request):
    return HttpResponse("Hello world. For testing.")

@csrf_exempt
def get_response(request):
    response = {'status': None}

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        message = data['message']

        chat_response = Summarization.summarize_one(message)
        response['message'] = {'text': chat_response[0], 'user': False, 'chat_bot': True}
        response['status'] = 'ok'

    else:
	    response['error'] = 'no post data found'
    return HttpResponse(json.dumps(response), content_type="application/json")