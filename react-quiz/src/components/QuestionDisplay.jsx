/* eslint-disable react/prop-types */
import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

function QuestionDisplay() {
  const { question } = useQuiz();
  
  return (
    <div className="mt-5 w-full">
      <div className="mt-10">
        <h2 className="text-3xl leading-loose mt-5 sm:text-4xl">
          {question.question}
        </h2>
        <Options
          question={question}
        />
      </div>
    </div>
  );
}

export default QuestionDisplay;
