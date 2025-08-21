
import amqp from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();

const RABBITMQ_URL = process.env.RABBIT_URL;

let connection, channel;

export async function connectRabbitMQ() {
  if (channel) return channel; // Reuse if already connected
  connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  console.log('✅ Connected to RabbitMQ');
  return channel;
}

export async function publishToQueue(queue, data) {
  const ch = await connectRabbitMQ();
  await ch.assertQueue(queue, { durable: true });
  ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
}

export async function subscribeToQueue(queue, callback) {
  const ch = await connectRabbitMQ();
  await ch.assertQueue(queue, { durable: true });
  ch.consume(queue, (msg) => {
    if (!msg) return;
    const data = JSON.parse(msg.content.toString());
    callback(data, msg);
    ch.ack(msg);
  });
}

export async function sendRpcMessage(queue, data, timeout = 5000) {
  const ch = await connectRabbitMQ();
  const { queue: replyQueue } = await ch.assertQueue('', { exclusive: true });
  const correlationId = `${Date.now()}-${Math.random()}`;

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('⏳ RPC request timed out'));
    }, timeout);

    ch.consume(
      replyQueue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          clearTimeout(timer);
          const response = JSON.parse(msg.content.toString());
          resolve(response);
        }
      },
      { noAck: true }
    );

    ch.sendToQueue(queue, Buffer.from(JSON.stringify(data)), {
      correlationId,
      replyTo: replyQueue,
    });
  });
}
