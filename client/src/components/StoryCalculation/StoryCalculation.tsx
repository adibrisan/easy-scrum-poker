import styles from "./StoryCalculation.module.css";

interface IStoryCalculation {
  storyData: number[];
}

const StoryCalculation = ({ storyData }: IStoryCalculation) => {
  const storyPointsAverage =
    storyData.reduce((acc, current) => {
      if (current === -1) {
        return acc + 0;
      }
      return acc + current;
    }, 0) / storyData.length;
  const maxValue = Math.max(...storyData);
  const minValue = Math.min(...storyData);

  const options = [
    { Min: minValue === -1 ? 0 : minValue },
    { Max: maxValue === -1 ? 0 : maxValue },
    { Average: storyPointsAverage },
  ];

  return (
    <div className={styles.container}>
      {options.map((elem) => (
        <div className={styles.element}>
          <div>{Object.keys(elem)[0]}</div>
          <div>{elem[`${Object.keys(elem)[0]}`]}</div>
        </div>
      ))}
    </div>
  );
};

export default StoryCalculation;
