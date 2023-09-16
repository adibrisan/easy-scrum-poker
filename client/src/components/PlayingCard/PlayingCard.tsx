import styles from "./PlayingCard.module.css";
import PokerBacked from "../../assets/poker-backed.svg";
import PokerFaced from "../../assets/poker-faced.svg";

interface IPlayingCard {
  points: string | number;
  isRevealed: boolean;
}

const PlayingCard = ({ points, isRevealed }: IPlayingCard) => {
  return (
    <div className={styles.imageContainer}>
      <img
        src={!isRevealed ? PokerBacked : PokerFaced}
        alt="Your Poker card backed"
        className={styles.centeredImage}
      />
      {isRevealed && <div className={styles.centeredLetter}>{points}</div>}
      {!isRevealed && typeof points === "number" && (
        <div className={styles.centeredLetter}>Ready</div>
      )}
    </div>
  );
};

export default PlayingCard;
