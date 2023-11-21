import PropTypes from "prop-types";
import { useQuiz } from "../context/QuizContext";
function NextButton() {
  const {answer, handleNext, index, numberQuestions} = useQuiz();
  return (
    <div>
      {answer !== null && (
        <button
          onClick={handleNext}
          title="Choose answer first"
          className="btn btn-ui"
        >
          {index !== numberQuestions - 1 ? "Next" : "Finish"} 
        </button>
      )}
    </div>
  );
}

NextButton.propTypes = {
  answer: PropTypes.number || PropTypes.null,
  handleNext: PropTypes.func || PropTypes.null,
  index: PropTypes.number,
  numberQuestions: PropTypes.number,
};


export default NextButton
