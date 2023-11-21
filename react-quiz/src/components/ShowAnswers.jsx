/* eslint-disable react/prop-types */
import { useQuiz } from "../context/QuizContext";
import AnsweredOptions from "./AnsweredOptions";
function ShowAnswers() {
  const {question, answersIndex, index} = useQuiz();
  return (
    <div className="mt-5">
      <div className="mt-10">
        <h2 className="text-4xl mt-5">{question.question}</h2>
        <AnsweredOptions
          question={question}
          answersIndex={answersIndex}
          index={index}
        />
      </div>
    </div>
  );
}

export default ShowAnswers
