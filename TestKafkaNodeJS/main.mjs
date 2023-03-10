import moment from 'moment';
import pkg from 'kafkajs';
const { Kafka, Partitioners } = pkg;

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const mainTopic = 'trips';

async function sendObject(topic, object) {
  const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

  await producer.connect();

  await producer.send({
    topic,
    messages: [
      { value: JSON.stringify(object) }
    ]
  });

  await producer.disconnect();
}
async function main() {
  const consumer = kafka.consumer({ groupId: 'test-group' });
  await consumer.connect();
  
  await consumer.subscribe({ topic: mainTopic });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let jsonString = message.value.toString()
      let object = JSON.parse(jsonString)
      console.log(`Received message: ${jsonString}`);
    },
  });

  const trip = {
    from:"Vienna",
    to: "Paris",
    for: 42.23,
    legs: 2,
    date: moment()
  };
  
  sendObject(mainTopic, trip)
    .then(() => {
      console.log('Data sent');
    })
    .catch((err) => {
      console.error('Error occurred:', err);
    });
}
main();