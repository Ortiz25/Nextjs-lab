import { MongoClient } from "mongodb";
// request sent to :  /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);

    // mongodb+srv://samueldeya:<password>@cluster0.qd7gjoz.mongodb.net/
    const client = await MongoClient.connect(
      "mongodb+srv://samueldeya:m0t0m0t0@cluster0.qd7gjoz.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
