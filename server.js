import amqp from "amqplib";
import cors from "cors";
import express from "express";
import { addOrder } from "./app/controllers/orderController.js";
import { router } from "./app/routes/routes.js";

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

const connectToRabbitMQ = async () => {
  const connection = await amqp.connect(
    `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASS}@${process.env.RABBITMQ_SERVER_DNS}:5672/`
  );
  const channel = await connection.createChannel();
  const result = await channel.assertQueue("billing_queue");

  console.log("Got response from amqp server");

  // Controller
  await addOrder(channel);

  console.log("Waiting for messages...");
};

app.use("/api/orders", router);

app.listen(PORT, async () => {
  console.log("listening on port: " + PORT);
  await connectToRabbitMQ();
});
