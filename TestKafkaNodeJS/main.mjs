import moment from 'moment';
import { Consumer, KafkaClient, Producer } from 'kafka-node';

const client = new KafkaClient({ 
  kafkaHost: 'localhost:9092'
});

const mainTopic = 'main';

const consumer = new Consumer(
  client,
  [
    { topic: mainTopic }
  ],
  {
    autoCommit: false
  }
);

consumer.on('message', message => {
  console.log('Received message:', message.value);
});

consumer.on('error', err => {
  console.error('Error occurred:', err);
});

consumer.on('offsetOutOfRange', err => {
  console.error('Offset out of range:', err);
});

async function sendObject(topic, object) {
  producer.send([{ topic, messages: JSON.stringify(object) }], (err, data) => {
    if (err) {
      console.error('Error occurred:', err);
    } else {
      console.log('Data sent:', data);
    }
  });
}

const trip = {
  from:"Vienna",
  to: "Paris",
  for: 42.23,
  legs: 2,
  date: moment()
};

const producer = new Producer(client);

producer.on('error', err => {
  console.error('Error occurred:', err);
});

producer.on('ready', () => {
  console.log('Producer is ready');
  sendObject(mainTopic, trip);
});
