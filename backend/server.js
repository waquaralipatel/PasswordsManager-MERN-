import express from 'express'
import { MongoClient } from 'mongodb'  
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PasswordManager';
const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(cors());
client.connect();

//get request to fetch all documents from 'documents' collection
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const docs = await collection.find({}).toArray();
  res.json(docs);
})
//post request to add a document to 'documents' collection
app.post('/', async (req, res) => {
  const passwords=req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(passwords);
  res.send({success : true, result: findResult});
})

//delete request to delete a document from 'documents' collection
app.delete('/', async (req, res) => {
  const passwords=req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(passwords);
  res.send({success : true, result: findResult});
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})