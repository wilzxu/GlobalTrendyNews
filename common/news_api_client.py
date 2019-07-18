import requests

from json import loads

NEWS_API_ENDPOINT = 'http://newsapi.org/v1/'
NEWS_API_KEY = '1476d850d6494e0b8b422f69403d0553'

ARTICALS_API = 'articles'

CNN = 'cnn'

DEFAULT_SOURCES  = [CNN]
SORT_BY_TOP = 'top'


def _build_url(endPoint=NEWS_API_ENDPOINT, apiName=ARTICALS_API):
  return endPoint + apiName


def get_news_from_sources(sources=DEFAULT_SOURCES, sortBy=SORT_BY_TOP):
  articles = []

  for source in sources:
    payload = {
       'apiKey': NEWS_API_KEY,
       'source': source,
       'sortBy': sortBy
    }

    response = requests.get(_build_url(), params=payload)
    res_json = loads(response.content.decode('utf-8'))

    # Extract news from response
    if (res_json is not None and
        res_json['status'] == 'ok' and
        res_json['source'] is not None):
          # Populate news source in each article
          for news in res_json['articles']:
            news['source'] = res_json['source']

          articles.extend(res_json['articles'])

  return articles
