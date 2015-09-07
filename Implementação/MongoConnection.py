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


MONGODB_HOST = '172.16.4.51'
MONGODB_PORT = 27017
DBS_NAME = 'MCDB'
COLLECTION_NAME = 'articles'
FIELDS = {'title':True}
client = MongoClient(MONGODB_HOST,MONGODB_PORT)
articles = client[DBS_NAME][COLLECTION_NAME]



def get_data(keyword):

    number_of_articles_titles = articles.find({'title':{'$in':[re.compile(keyword+ '$')]}}, projection=FIELDS)
    i=0;
    for a in number_of_articles_titles:
        i = i+1

    print i
    print "funcionou"
