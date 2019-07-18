import logging
import os
import sys

from newspaper import Article

# import common package in parent directory
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'common'))

from cloudAMQP_client import CloudAMQPClient

DEDUPE_NEWS_TASK_QUEUE_URL = "amqp://iupbzvpb:4Yx1qNmD_KX-dTgZTI9_3cuO0H2cFTCE@caterpillar.rmq.cloudamqp.com/iupbzvpb"
DEDUPE_NEWS_TASK_QUEUE_NAME = "dedupe-news-task-queue"
SCRAPE_NEWS_TASK_QUEUE_URL = "amqp://sqoxsajr:bSy1GirK02Pxuv_Jj4r_3RTsnNGEjzrc@caterpillar.rmq.cloudamqp.com/sqoxsajr"
SCRAPE_NEWS_TASK_QUEUE_NAME = "scrape-news-task-queue"

SLEEP_TIME_IN_SECONDS = 5

logger_format = '%(asctime)s - %(message)s'
logging.basicConfig(format=logger_format)
logger = logging.getLogger('news_fetcher')
logger.setLevel(logging.DEBUG)

dedupe_news_queue_client = CloudAMQPClient(DEDUPE_NEWS_TASK_QUEUE_URL, DEDUPE_NEWS_TASK_QUEUE_NAME)
scrape_news_queue_client = CloudAMQPClient(SCRAPE_NEWS_TASK_QUEUE_URL, SCRAPE_NEWS_TASK_QUEUE_NAME)


def handle_message(msg):
	if msg is None or not isinstance(msg, dict):
		logger.warning('message is broken')
		return

	# TODO: Fetch news text using scraper or NewsPaper3K
	article = Article(msg)
	article.download()
	article.parse()
	    
	msg['text'] = article.text

	dedupe_news_queue_client.sendMessage(msg)



def run():
	while True:
		if scrape_news_queue_client is not None:
			msg = scrape_news_queue_client.getMessage()
			if msg is not None:
				try:
					handle_message(msg)
				except Exception as e:
					logger.warning(e)
					pass
			scrape_news_queue_client.sleep(SLEEP_TIME_IN_SECONDS)


if __name__ == "__main__":
    run()