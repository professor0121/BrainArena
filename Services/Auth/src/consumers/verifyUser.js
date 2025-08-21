import jwt from 'jsonwebtoken';
import { connectRabbitMQ, subscribeToQueue } from '../services/rabbitmq.service.js';
import User from '../model/user.model.js';

let channel;

export async function startAuthUserConsumer() {
  channel = await connectRabbitMQ();

  await subscribeToQueue('verify_user_token', async (data, msg) => {
    const { token } = data;
    let response = { success: false };

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
    //   console.log("Decoded JWT:", decoded);
        response = { success: true, user: { id: user.id, name: user.name } };
    } catch (err) {
      response = { success: false, message: 'Invalid or expired token' };
    }

    // Use the channel we stored earlier to reply
    channel.sendToQueue(
      msg.properties.replyTo,
      Buffer.from(JSON.stringify(response)),
      { correlationId: msg.properties.correlationId }
    );
  });
}
