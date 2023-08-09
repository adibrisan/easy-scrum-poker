import styles from "./PlayingCard.module.css";
import PokerBacked from "../../assets/poker-backed.svg";
import PokerFaced from "../../assets/poker-faced.svg";

interface IPlayingCard {
  points: string | number;
}

const PlayingCard = ({ points }: IPlayingCard) => {
  return (
    <div className={styles.imageContainer}>
      <img
        src={points === "?" ? PokerBacked : PokerFaced}
        alt="Your Poker card backed"
        className={styles.centeredImage}
      />
      <div className={styles.centeredLetter}>{points}</div>
    </div>
  );
};

export default PlayingCard;
