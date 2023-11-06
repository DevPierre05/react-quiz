/* eslint-disable react/prop-types */
function AnsweredOptions({ question, answersIndex, index}) {
  // const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${answersIndex[index] === i ? "answer" : ""} ${
           i === question.correctOption ? "correct" : "wrong"}`}
          key={option}
          disabled={true}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default AnsweredOptions;
