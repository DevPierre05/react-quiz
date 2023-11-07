import PropTypes from "prop-types";

function FinishedScreen({score, maxPossibleScore, dispatch, highScore, seconds}) {
  const percentage = score * 100 / maxPossibleScore;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😃";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦🏾‍♂️";

  return (
    <>
      {seconds === 0 && (
        <p className="text-[2rem] text-center mt-10">🛑 Time Out</p>
      )}
      <p className="result mt-10 p-4">
        You had {score} out of {maxPossibleScore}points score (
        {Math.ceil(percentage)}%) {emoji}
      </p>
      <p className="highscore">
        Highest Score: <strong>{highScore} points</strong>
      </p>
      <button
        onClick={() => dispatch({ type: "answersDisplay" })}
        className="mt-5 btn-left btn"
      >
        Show Answers
      </button>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="mt-5 btn btn-ui "
      >
        Restart Quiz
      </button>
    </>
  );
}


FinishedScreen.propTypes = {
  score: PropTypes.number,
  maxPossibleScore: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  emoji: PropTypes.string,
  highScore: PropTypes.number.isRequired,
  seconds: PropTypes.number
};

export default FinishedScreen;
