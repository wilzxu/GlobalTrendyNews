""" Backend service """
import datetime
import json
import logging
import os
import sys

from bson.json_util import dumps
from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

from cloudAMQP_client import CloudAMQPClient

LOG_CLICKS_TASK_QUEUE_URL = "amqp://jwgvlkzk:PD6lFVF2Eld-M-vfdDG5zPOepzn4omQV@caterpillar.rmq.cloudamqp.com/jwgvlkzk"
LOG_CLICKS_TASK_QUEUE_NAME = "tap-news-log-clicks-task-queue"

cloudAMQP_client = CloudAMQPClient(LOG_CLICKS_TASK_QUEUE_URL, LOG_CLICKS_TASK_QUEUE_NAME)





import mongodb_client


SERVER_HOST = 'localhost'
SERVER_PORT = 4040

logger_format = '%(asctime)s - %(message)s'
logging.basicConfig(format = logger_format)
logger = logging.getLogger('backend_service')
logger.setLevel(logging.DEBUG)

def add(num1, num2):
    """ Test method """
    logger.debug('add is called with %d and %d', num1, num2)
    return num1 + num2
    

def get_one_news():
    """ Test method to get one news """
    logger.debug("get_one_news is called.")
    res = mongodb_client.get_db()['news'].find_one()
    return json.loads(dumps(res))


def log_news_click_for_user(user_id, news_id):
    """ Log news click for a user with a news id. """
    logger.debug("log_news_click_for_user is called with %s and %s", user_id, news_id);

    cloudAMQP_client.sendMessage({
        'userId': user_id,
        'newsId': news_id,
        'timestamp': str(datetime.datetime.utcnow())
    });
    


# def get_news(source_news_id, top_n=10):
    # """ Fetch news and relations """
    # logger.debug("get_news is called with %s", source_news_id)

    # Read relation table to get top k related news
    # related_news_id, similarity = #TODO

    # Get news content for source and related news
    # source_news = #TODO
    # related_news = #TODO

    # Construct the response
    #     "news": [{
    #     			"source": "business-insider",
    #     			"author": "Matthew DeBord",
    #     			"title": "Elon Musk has no problem selling Tesla cars — but strong demand could become a problem",
    #     		},
    #     		...

    # 	    ],
    # 	"graph": {
    # 		"center": "3RjuEomJo2adf6OadyZbU7OHA==\n",
    # 		"links": [{
    # 				"from": "3RjuEomJo2adf6OadyZbU7OHA==\n",
    # 				"to": "3RjduEomJozf6OadyZbU7OHA==\n"
    # 			},
    # 			...
    # 		]
    # 	},
    # 	"focused_news": {
    # 		"source": "The Wall Street Journal",
    # 		"title": "Berkshire Hathaway Benefits From US Tax Plan",
    # 		...
    # 	}

    # response = #TODO

    # return response
    
    

def start(host = SERVER_HOST, port = SERVER_PORT):
    RPC_SERVER = SimpleJSONRPCServer((host, port))
    RPC_SERVER.register_function(add, "add")
    RPC_SERVER.register_function(get_one_news, 'get_one_news')
    RPC_SERVER.register_function(log_news_click_for_user, 'logNewsClickForUser')
    
    logger.info("Starting RPC server on %s: %d", host, port)
    RPC_SERVER.serve_forever()
    

if __name__ == "__main__":
    start(SERVER_HOST, SERVER_PORT)
    
    