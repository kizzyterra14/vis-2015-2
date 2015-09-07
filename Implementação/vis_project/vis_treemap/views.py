# coding=utf8
from django.shortcuts import render_to_response
from django.shortcuts import render
#import mongoConnection

keywords = []

# Create your views here.
def home(request):

    if request.method == "POST":
        keywordToBeRemoved = request.POST.get('remove_keyword')
        if keywordToBeRemoved:
            keywords.remove(keywordToBeRemoved)
        keywordToBeAdded = request.POST.get('keyword')
        if keywordToBeAdded:
            keywords.append (keywordToBeAdded)

        for keyword in keywords:
            print keyword
        print request.POST
        #mongoConnection.get_data(keyword)

    context = {
    'subtitulo': "Uma ferramenta para análise de notícias",
    'keywords': keywords
    }

    return render(request, r"vis_treemap/home.html", context)
    #return render_to_response(r"vis_treemap/home.html", {'subtitulo': "Uma ferramenta para análise de dados"} )

def about(request):
    return render_to_response(r"vis_treemap/about.html", {'subtitulo': "Informações Úties"} )

def docs(request):
    return render_to_response(r"vis_treemap/docs.html", {'subtitulo': "Descrevendo a Implementação"} )
