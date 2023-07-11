import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

function Homepage(props) {
  // props from the getstaticprops function

  return (
    <>
      <Head>
        <title>Meetup</title>
        <meta name="description " content="react meatups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

export async function getStaticProps() {
  // fetch data from an API , executed during building
  const client = await MongoClient.connect(
    "mongodb+srv://samueldeya:m0t0m0t0@cluster0.qd7gjoz.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    // returns an object
    props: {
      // props will available on the page component
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // interval for refreshing data in secs
  };
}

// export async function getServerSideProps(context) {
//   // fetch data  RUNS on the serve the app is deployed on
//   const req = context.req;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default Homepage;
