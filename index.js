require('dotenv').config();
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

console.log(process.env.MONGO_URI)

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {

      

  
  try {
    await client.connect();
      const database = client.db("petadoption");
      const petsCollection = database.collection("petadoption");

      app.post('/petadoption', async (req, res) => {
        const pet = req.body;
        const result = await petsCollection.insertOne(pet);
        res.json(result);
        console.log(result);
      })






    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
