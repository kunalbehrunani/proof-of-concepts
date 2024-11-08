const amqp = require("amqplib");

// const queue = "service-1-events";

// (async () => {
//   try {
//     const connection = await amqp.connect("amqp://localhost");
//     const channel = await connection.createChannel();

//     process.once("SIGINT", async () => {
//       await channel.close();
//       await connection.close();
//     });

//     await channel.assertQueue(queue, { durable: false });
//     await channel.consume(
//       queue,
//       (message) => {
//         if (message) {
//           console.log(
//             " [x] Received '%s'",
//             message.content.toString()
//           );
//         }
//       },
//       { noAck: true }
//     );

//     console.log(" [*] Waiting for messages. To exit press CTRL+C");
//   } catch (err) {
//     console.warn(err);
//   }
// })();

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  // await channel.close();
  // await connection.close();

  

  await channel.assertExchange('test-exchange', 'fanout', { durable: true });
  await channel.assertQueue('test-queue-2', { exclusive: true });
  channel.bindQueue('test-queue-2', 'test-exchange', '');

  channel.consume('test-queue-2', (msg) => {
    console.log(" [x] Received '%s'", msg.content.toString());
  }, { noAck: true });

})();