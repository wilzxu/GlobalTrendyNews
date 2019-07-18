import os
import random
import requests

from lxml import html

GET_CNN_NEWS_XPATH = """//p[contains(@class, 'zn-body__paragraph')]//text() | //div[contains(@class, 'zn-body__paragraph')]//text()"""

# Load user agents list, randomly choose one for each request
USER_AGENTS_FILE = os.path.join(os.path.dirname(__file__), 'user_agents.txt')

USER_AGENTS = []

with open(USER_AGENTS_FILE, 'rb') as uaf:
	for ua in uaf.readlines():
		if ua:
			USER_AGENTS.append(ua.strip()[1:-1]) # remove quotes

random.shuffle(USER_AGENTS)


def _get_headers():
	ua = random.choice(USER_AGENTS)
	headers = {
		"User-Agent" : ua
	}
	return headers


def extract_news(news_url):
    # pretend to be a browser
	session_request = requests.session()
	response = session_request.get(news_url, headers=_get_headers())

	news = None

	try:
		tree = html.fromstring(response.content) # convert from dom to tree
		news = tree.xpath(GET_CNN_NEWS_XPATH)
		news = '\n'.join(news) # merge list into one string
	except Exception:
		return None

	return news
