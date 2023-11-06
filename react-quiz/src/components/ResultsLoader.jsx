import { useEffect } from "react";
import PropTypes from "prop-types";

export default function ResultsLoader({dispatch}) {
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
  dispatch: PropTypes.func.isRequired,
};