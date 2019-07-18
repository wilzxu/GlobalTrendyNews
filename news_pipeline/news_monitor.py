import datetime
import hashlib
import logging
import redis
import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

import news_api_client
from cloudAMQP_client import CloudAMQPClient

SLEEP_TIME_IN_SECONDS = 600
NEWS_TIME_OUT_IN_SECONDS = 3600 * 24 * 3

REDIS_HOST = 'localhost'
REDIS_PORT = 6379

SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://sqoxsajr:bSy1GirK02Pxuv_Jj4r_3RTsnNGEjzrc@caterpillar.rmq.cloudamqp.com/sqoxsajr"
SCRAPE_NEWS_TASK_QUEUE_NAME = "scrape-news-task-queue"

NEWS_SOURCES = [
    'bbc-news',
    'bbc-sport',
    'bloomberg',
    'cnn',
    'entertainment-weekly',
    'espn',
    'ign',
    'techcrunch',
    'the-new-york-times',
    'the-wall-street-journal',
    'the-washington-post'
]

logger_format = '%(asctime)s - %(message)s'
logging.basicConfig(format=logger_format)
logger = logging.getLogger('news_monitor')
logger.setLevel(logging.DEBUG)

redis_client = redis.StrictRedis(REDIS_HOST, REDIS_PORT)
cloudAMQP_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)


def run():
    while True:
        news_list = news_api_client.get_news_from_sources(NEWS_SOURCES)

        num_of_new_news = 0
        
        # remove duplicates
        for news in news_list:
            news_digest = hashlib.md5(news['title'].encode('utf-8')).hexdigest()

            if redis_client.get(news_digest) is None:
                num_of_new_news += 1
                news['digest'] = news_digest
                
                # TODO: set 'digest' and 'publishedAt' field.
                if news['publishedAt'] is None:
                    news['publishedAt'] = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
                

                # TODO: update redis with this news, news_digest as key, with expiretime for 3 days
                redis_client.set(news_digest, 'True')
                redis_client.expire(news_digest, NEWS_TIME_OUT_IN_SECONDS)

                cloudAMQP_client.sendMessage(news)

        logger.info("Fetched %d news. ", num_of_new_news)
        
        # to maintain heartbeat, use cloudAMQP sleep, not default python sleep
        cloudAMQP_client.sleep(SLEEP_TIME_IN_SECONDS)

if __name__ == '__main__':
    run()