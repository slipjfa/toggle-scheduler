import clientPromise from "../lib/mongodb";
import Add from "./add";
import Tabs from "../components/tabs";

export async function getServerSideProps(context) {
  const player = await clientPromise;
  const database = player.db("toggle");
  const data = await database
    .collection("entries")
    .find({})
    .limit(100)
    .toArray();
  const response = JSON.parse(JSON.stringify(data));
  return {
    props: { players: response },
  };
}

export default function Home({ players }) {
  let playersCount = {
    total: players,
    timeSlot1: [],
    timeSlot2: [],
    timeSlot3: [],
    timeSlot4: [],
  };

  players.map((player) => {
    player.timeSlots.map((timeSlot, index) => {
      if (timeSlot) {
        playersCount[`timeSlot${index + 1}`].push(player.name)
      };
    });
  });

  return (
    <div className="container">
      <Add />
      <div className="wrapper">
        { (players.length === 0) ? <p className="closedTeaser">👽👾</p> : <Tabs players={playersCount} /> }
      </div>
    </div>
  )
}