import { MongoClient } from 'mongodb';

// Replace with your MongoDB instance URL
const url = `${process.env.MONGODB_URI}`;
const dbName = 'Blog'; // Replace with your database name

let client0: any;
const options = {
  connectTimeoutMS: 60000,
  maxPoolSize: 150
}

async function connect() {

  client0 = await MongoClient.connect(url, options);

  

  // client0.on('TopologyChange', (err: any, topology: any) => {
  //   if (err) {
  //     console.error('Connection lost:', err);
  //   } else {
  //     console.log('Reconnected:', topology);
  //   }
  // });

  return client0.db(dbName);

}

async function disconnect() {
  if (client0)
    await client0.close();
}

export { connect, disconnect };