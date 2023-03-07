const moment = require('moment');

const mainTopic='main';

const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ 
  kafkaHost: 'localhost:9092'
});

const producer = new kafka.Producer(client);

producer.on('ready', function () {
  console.log('Producer is ready');
});

producer.on('error', function (err) {
  console.error('Error occurred:', err);
});

let trip = {
    from:"Vienna",
    to: "Paris",
    for: 42.23,
    legs: 2,
    date: moment(),
}
async function sendObject(topic, object) {
    producer.send([{ topic: mainTopic, messages: object }], function (err, data) {
        console.log('Data sent:', data);
    });
}
sendObject("/trip", trip)

const Consumer = kafka.Consumer;

const consumer = new Consumer(
  client,
  [
    { topic: mainTopic }
  ],
  {
    autoCommit: false
  }
);

consumer.on('message', function (message) {
  console.log('Received message:', JSON.parse(message.value));
});

consumer.on('error', function (err) {
  console.error('Error occurred:', err);
});

consumer.on('offsetOutOfRange', function (err) {
  console.error('Offset out of range:', err);
});