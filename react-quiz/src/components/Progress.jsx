import PropTypes from "prop-types";
import { useQuiz } from "../context/QuizContext";

Progress.propTypes = {
  numberQuestions: PropTypes.number,
  score: PropTypes.number,
  index: PropTypes.number,
  maxPossibleScore: PropTypes.number,
  answer: PropTypes.number
};

function Progress() {
  const { numberQuestions, score, index, maxPossibleScore, answer } = useQuiz()
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
