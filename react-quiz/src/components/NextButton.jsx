import PropTypes from "prop-types";
function NextButton({answer, handleNext, index, numberQuestions}) {
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
  handleNext: PropTypes.func.isRequired,
  index: PropTypes.number,
  numberQuestions: PropTypes.number,
};


export default NextButton
