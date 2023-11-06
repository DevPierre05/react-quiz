/* eslint-disable react/prop-types */
import Options from "./Options";

function QuestionDisplay({answer, question, handleScore}) {

  return (
    <div className="mt-5 w-full">
      <div className="mt-10">
        <h2 className="text-3xl leading-loose mt-5 sm:text-4xl">
          {question.question}
        </h2>
        <Options
          question={question}
          answer={answer}
          handleScore={handleScore}
        />
      </div>
    </div>
  );
}

export default QuestionDisplay
