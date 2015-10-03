#from pymongo import MongoClient
#import pxssh

#s = pxssh.pxssh()
# if not s.login ('200.20.164.141', 'kizzyterra', 'emap2015@mestrado'):
#     print "SSH session failed on login."
#     print str(s)
# else:
#     print "SSH session login successful"
#     s.sendline ('ls -l')
#     s.prompt()         # match the prompt
#     print s.before     # print everything before the prompt.
#     s.logout()

# MONGODB_HOST = 'localhost'
# MONGODB_PORT = 27017
# DBS_NAME = 'MediaCLoud'
# COLLECTION_NAME = 'articles

from pymongo import MongoClient
import re
from elasticsearch.helpers import bulk, streaming_bulk
from datetime import datetime
from dateutil import tz
paristimezone = tz.gettz('Europe/Paris')
#connect to our cluster
from elasticsearch import Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

#Setting Mongo
MONGODB_HOST = '127.0.0.1'
MONGODB_PORT = 27017
DB_NAME = 'MediaCloud_Dump'
COLLECTION_NAME = 'oglobo'
FIELDS = {'title':True, 'link':True, 'published':True}

def index_collection():
    es.indices.create(index=DB_NAME.lower(), ignore=400)
    conn = MongoClient(MONGODB_HOST, MONGODB_PORT)
    coll = conn[DB_NAME][COLLECTION_NAME]
    cursor = coll.find({}, fields=FIELDS, timeout=False)
    print "Starting Bulk index of {} documents".format(cursor.count())

    def action_gen():
        """
        Generator to use for bulk inserts
        """
        for n, doc in enumerate(cursor):
            # print fields
            did = doc.pop('_id')
            if doc == {}:
                print "Empty document, skipping"
                continue
            op_dict = {
                '_index': DB_NAME.lower(),
                '_type': COLLECTION_NAME,
                '_id': int('0x' + str(did), 16),
                '_source': doc
            }
            #op_dict['doc'] = doc
            yield op_dict

    # for doc in cursor:
    # did = int('0x' + str(doc.pop('_id')), 16)
    #     res = es.index(index=db.lower(), doc_type=collection, body=doc, id=did)
    #     #print res

    res = bulk(es, action_gen(), stats_only=True, chunk_size=1000)
    print res

if __name__ == "__main__":
#    index_collection()
    res=es.search(index='mediacloud_dump', doc_type='oglobo', body={
   "query": {
     "bool": {
       "should": [

         {
           "match": {
             "title": "Lula"
           }
         }
       ]
     }
   }})
    print("%d documents found" % res['hits']['total'])
    for doc in res['hits']['hits']:
        print("(%s) \n  %s \n %s" % (doc['_id'], doc['_source']['link'],doc['_source']['title']))
    #print data['title']
    #es.search(index="mediacloud_dump", body={"query": {"prefix" : { "title" : "Os" }}})

    #es.get(index='mediacloud_dump', doc_type='articles', id="25740125896697681799633738747")


# DBS_NAME = 'MediaCloud_Dump'
# COLLECTION_NAME = 'articles'
# FIELDS = {'title':True, 'link':True, 'published':True}
# client = MongoClient(MONGODB_HOST,MONGODB_PORT)
# articles = client[DBS_NAME][COLLECTION_NAME]
#
# def get_data(keyword):
#
#      number_of_articles_titles = articles.find({'title':{'$in':[re.compile(keyword+ '$')]}}, projection=FIELDS)
#      i=0;
#      for a in number_of_articles_titles:
#          i = i+1
#
#      print i
#      print "funcionou"
