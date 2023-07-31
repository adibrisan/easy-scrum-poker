import styles from "./App.module.css";
import RoomCard from "./components/RoomCard/RoomCard";

function App() {
  return (
    <>
      <div className={styles.center}>
        <div className={styles.cardContainer}>
          <RoomCard
            title="Create a room"
            inputText="Enter your name"
            buttonTitle="Let's create the room"
          />
          <RoomCard
            title="or join a room"
            inputText="Enter the room id"
            buttonTitle="Join this room"
            mode="join"
          />
        </div>
      </div>
    </>
  );
}

export default App;
