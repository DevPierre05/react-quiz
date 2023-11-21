import PropTypes from "prop-types";
import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { seconds, dispatch } = useQuiz();
  
  useEffect(() => {
    const timer =
      seconds > 0 && setInterval(() => dispatch({ type: "setTimer" }), 1000);

    return () => clearInterval(timer);
  }, [seconds, dispatch]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  
  return (
    <div>
      <div className="timer">{formatTime(seconds)}</div>
    </div>
  );
}

Timer.propTypes = {
  seconds: PropTypes.number,
  dispatch: PropTypes.func || PropTypes.null,
};

export default Timer;
