import PropTypes from "prop-types";
import { useQuiz } from "../context/QuizContext";
function NextAnswerButton() {
  const {handleNext, index, numberQuestions} = useQuiz();
  return (
    <div>
      <button
        onClick={handleNext}
        title="Choose answer first"
        className="btn btn-ui"
      >
        {index !== numberQuestions - 1 ? "Next" : "Finish"} 
      </button>
    </div>
  );
}

NextAnswerButton.propTypes = {
  answer: PropTypes.number || PropTypes.null,
  handleNext: PropTypes.func.isRequired || PropTypes.null,
  index: PropTypes.number,
  numberQuestions: PropTypes.number,
};


export default NextAnswerButton
