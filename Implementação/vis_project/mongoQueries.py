from pymongo import MongoClient
import re
import json
import datetime

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DB_NAME = 'MediaCloud_Dump'

FIELDS = {'title':True, 'link':True, 'published':True}


def query(keywords, sources, month, year):
    data = {}
    data['name'] = "sources"
    data['children'] = []
    dataValue =0
    for source in sources.split(","):
          source = source.split("\"")[1]
          sourceDictionary = {}
          sourceDictionary['name'] = source
          sourceDictionary['children'] = []
          sourceValue = 0
          for keyword in keywords:
              print "Palavra-chave: " + keyword
              print  "Fonte: " + source
              keywordDictionary={}
              keywordDictionary['name'] = keyword
              value = get_data(keyword, source, month, year)
              keywordDictionary['value'] = value
              sourceValue += value
              sourceDictionary['children'].append(keywordDictionary)
          sourceDictionary['value'] = sourceValue
          dataValue += sourceValue
          data['children'].append(sourceDictionary)
    data['value'] = dataValue
    print data
    with open('static/lib/mydata.json', 'w+') as f:
        json.dump(data, f)

def queryp(keywords, sources, month, year):
    data = {}
    data['name'] = "keywords"
    data['children'] = []
    dataValue =0
    for keyword in keywords:
        print "Palavra-chave: " + keyword
        keywordDictionary={}
        keywordDictionary['name'] = keyword
        value = 0
        for source in sources.split(","):
              source = source.split("\"")[1]
              value+= get_data(keyword, source, month, year)
        keywordDictionary['value'] = value
        dataValue += value
        data['children'].append(keywordDictionary)
    data['value'] = dataValue
    print data
    with open('static/lib/mydatap.json', 'w+') as f:
        json.dump(data, f)

def query_date(month, year):
    month = month.split("\"")[1]
    print month
    year = year.split("\"")[1]
    print year
    lastDaysMonths={"01":31, "02":28, "03":31, "04":30, "05":31, "06":30, "07":31,
    "08":31, "09":30, "10":31, "11":30, "12":31}

    start = datetime.datetime(int(year),int(month),1,0,0,0,001)
    end = datetime.datetime(int(year),int(month),lastDaysMonths[month],23,59,59,999)

    return (start, end)


def get_data(keyword, source, month, year):
    (start, end) = query_date(month, year)
    COLLECTION_NAME = source
    client = MongoClient(MONGODB_HOST,MONGODB_PORT)
    articles = client[DB_NAME][COLLECTION_NAME]
    articles_titles = articles.find({'title':re.compile(keyword + '\s+'), 'published':{'$gte': start, '$lt': end}}, projection=FIELDS)

    i = 0
    if articles_titles:
        for title in articles_titles:
            i=i+1
    return i
