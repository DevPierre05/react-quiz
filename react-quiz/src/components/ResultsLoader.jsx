import { useEffect } from "react";
import PropTypes from "prop-types";
import { useQuiz } from "../context/QuizContext";

export default function ResultsLoader() {
  const {dispatch} = useQuiz();
  const TIMEOUT = 3000;

  useEffect(() => {
    setTimeout(() => {
      dispatch({type:"resultsLoad"})
    }, TIMEOUT)
  })

  return (
    <div className="w-full h-[calc(100vh/2)] mt-20 flex justify-center items-center">
      <div className="finishScreenLoader"></div>
    </div>
  );
}

ResultsLoader.propTypes = {
  dispatch: PropTypes.func,
};