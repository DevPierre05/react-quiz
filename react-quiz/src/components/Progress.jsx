import PropTypes from "prop-types";

Progress.propTypes = {
  numberQuestions: PropTypes.number,
  score: PropTypes.number,
  index: PropTypes.number,
  maxPossibleScore: PropTypes.number,
  answer: PropTypes.number
};

function Progress({ numberQuestions, score, index, maxPossibleScore, answer }) {
  // const progressLevel = (index  * 100) / numberQuestions;
  return (
    <div className="w-full">
      <progress value={index + Number(answer !== null)} max={numberQuestions}></progress>
      <div className="progress mt-5">
        <p className="text-xl">
          Question <strong>{index + 1}</strong>/{numberQuestions}
        </p>
        <p className="text-xl">{score}/{maxPossibleScore} points</p>
      </div>
    </div>
  );
}

export default Progress;
