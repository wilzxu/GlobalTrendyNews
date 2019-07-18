import json
import logging
import pika

logger_format = '%(asctime)s - %(message)s'
logging.basicConfig(format = logger_format)
logger = logging.getLogger('cloud_amqp_client')
logger.setLevel(logging.DEBUG)

# define a message queue class
class CloudAMQPClient:
	def __init__(self, cloud_amqp_url, queue_name):
		self.cloud_amqp_url = cloud_amqp_url
		self.queue_name = queue_name
		self.params = pika.URLParameters(cloud_amqp_url)
		self.params.socket_timeout = 3
		self.connection = pika.BlockingConnection(self.params)
		self.channel = self.connection.channel()
		self.channel.queue_declare(queue=queue_name)


	def sendMessage(self, message):
		# TODO: send the given message to rabbitmq through channel.basic_publish
		self.channel.basic_publish(exchange = '', routing_key = self.queue_name, body = json.dumps(message))
		logger.debug("[x] Sent message to %s:%s", self.queue_name, message)
		

	def getMessage(self):
		method_frame, header_frame, body = self.channel.basic_get(self.queue_name)
		if method_frame is not None:
			logger.debug("[x] Received message from %s: %s", self.queue_name, body)
			self.channel.basic_ack(method_frame.delivery_tag) ## to prove you got the message
			return json.loads(body.decode('utf-8'))
		else:
			logger.debug("[x] No message returned.")
			return None
	
	
	# BlockingConnection.sleep is a safer way to sleep than time.sleep(). This
	# will repond to server's heartbeat.
	def sleep(self, seconds):
		self.connection.sleep(seconds)