from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("summarize", views.get_response),
    path("summarizes", views.get_many_response),
    path("nlu", views.get_encoder_response),
    path("data", views.get_samples),
    path("relate", views.get_relate)
]