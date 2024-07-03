from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("summarize", views.get_response, name="not_index")
]