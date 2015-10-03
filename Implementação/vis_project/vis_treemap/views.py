# coding=utf8
from django.shortcuts import render_to_response
from django.shortcuts import render
from django.http import HttpResponse
import json
import mongoQueries

keywords = []

# Create your views here.
def home(request):

    if not keywords:
        keywords.append ("Dilma")

    if request.method == "POST":
        keywordRemoved = request.POST.get('removedKeyword')

        if keywordRemoved:
            keywords.remove(keywordRemoved)

        keywordAdded = request.POST.get('keyword')
        if keywordAdded:
            keywords.append (keywordAdded)

        year = request.POST.get('data[years]')
        month = request.POST.get('data[months]')
        sources = request.POST.get('data[sources]')
        if sources:
            print year
            print month
            print sources
            mongoQueries.query(keywords, sources, month, year)


    print keywords

    context = {
    'subtitulo': "Uma ferramenta para análise de notícias",
    'keywords': keywords
    }

    return render(request, r"vis_treemap/home.html", context)
    #return render_to_response(r"vis_treemap/home.html", {'subtitulo': "Uma ferramenta para análise de dados"} )

def homep(request):

    if not keywords:
        keywords.append ("Dilma")

    if request.method == "POST":
        keywordRemoved = request.POST.get('removedKeyword')

        if keywordRemoved:
            keywords.remove(keywordRemoved)

        keywordAdded = request.POST.get('keyword')
        if keywordAdded:
            keywords.append (keywordAdded)

        year = request.POST.get('data[years]')
        month = request.POST.get('data[months]')
        sources = request.POST.get('data[sources]')
        if sources:
            print year
            print month
            print sources
            mongoQueries.queryp(keywords, sources, month, year)


    print keywords

    context = {
    'subtitulo': "Uma ferramenta para análise de notícias",
    'keywords': keywords
    }

    return render(request, r"vis_treemap/homep.html", context)

def about(request):
    return render_to_response(r"vis_treemap/about.html", {'subtitulo': "Informações Úties"} )

def docs(request):
    return render_to_response(r"vis_treemap/docs.html", {'subtitulo': "Descrevendo a Implementação"} )
