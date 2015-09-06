# coding=utf8
from django.shortcuts import render_to_response

# Create your views here.
def home(request):
    return render_to_response(r"vis_treemap/home.html", {'subtitulo': "Uma ferramenta para análise de dados"} )

def about(request):
    return render_to_response(r"vis_treemap/about.html", {'subtitulo': "Informações Úties"} )

def docs(request):
    return render_to_response(r"vis_treemap/docs.html", {'subtitulo': "Descrevendo a Implementação"} )
