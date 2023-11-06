import PropTypes from "prop-types";
function NextAnswerButton({handleNext, index, numberQuestions}) {
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
  handleNext: PropTypes.func.isRequired,
  index: PropTypes.number,
  numberQuestions: PropTypes.number,
};


export default NextAnswerButton
