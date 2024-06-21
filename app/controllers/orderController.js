import { Order } from "../models/Order.js";

export const getOrders = async (req, res) => {
  const allOrders = await Order.findAll();
  res.status(200).json(allOrders);
};

export const addOrder = async (channel) => {
  channel.consume("billing_queue", async (message) => {
    const { user_id, number_of_items, total_amount } = JSON.parse(
      message.content.toString()
    );

    console.log("Json parse done for billing info");

    await Order.create({
      user_id: user_id,
      number_of_items: number_of_items,
      total_amount: total_amount,
    });

    channel.ack(message);
  });
};
