import clientPromise from "../../lib/mongodb";

async function handler(req, res) {
  let db = await clientPromise;
  const body = req.body;
  const player = await clientPromise;
  const database = player.db("toggle");
  const result = await database.collection("entries").update(
    {
      name: body.name,
    },
    {
      $setOnInsert: {
        name: body.name,
        timeSlots: body.timeSlots,
      },
    },
    { upsert: true }
  );
  res.status(200).json(result);
}

export default handler;
