/* eslint-disable no-unused-vars */
import data from "../data/questions.json"
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import QuestionDisplay from "./components/QuestionDisplay";
import Progress from "./components/Progress";
import Timer from "./components/Timer";
import "./App.css";
import { useEffect, useReducer } from "react";
import Footer from "./components/Footer";
import NextButton from "./components/NextButton";
import FinishedScreen from "./components/FinishedScreen";
import ShowAnswers from "./components/ShowAnswers";
import NextAnswerButton from "./components/NextAnswerButton";
import ResultsLoader from "./components/ResultsLoader";

const SECS_PER_QUESTIONS = 30;

const initialState = {
  questionData: [],
  filterQuestions: [],
  answersIndex: [],

  //'loading', 'error', 'ready', 'active', 'resultsLoading', 'finished','showAnswers'
  status: "loading",
  index: 0,
  answer: null,
  score: 0,
  highScore: JSON.parse(localStorage.getItem("highScore")) ?? 0,
  seconds: null,
  // errorMsg: "",
  difficulty: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "setData":
      return { ...state, questionData: action.payload, filterQuestions: action.payload, status: "ready" };
    // case "dataFailed":
    //   return { ...state, status: "error", errorMsg: action.payload };
    case "start":
      return {
        ...state,
        status: "active",
        answer: null,
        seconds: state.filterQuestions.length * SECS_PER_QUESTIONS,
      };
    case "setIndex":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status:
          state.index === state.filterQuestions.length - 1
            ? "resultsLoading"
            : state.status,
        seconds: state.status === "finished" ? 0 : state.seconds,
      };
    case "setAnswer":
      return { ...state, answer: action.payload, answersIndex: [...state.answersIndex, action.payload]};
    case "setScore":
      return { ...state, score: state.score + action.payload };
    case "resultsLoad":
      return {...state, status: "finished"}
    case "restart":
      return { ...state, status: "ready", score: 0, index: 0, answersIndex: [] };
    case "setTimer":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 1 ? "resultsLoading" : state.status,
        highScore:
          state.index === state.filterQuestions.length - 1 || state.seconds === 1
            ? state.score >= state.highScore
              ? state.score
              : state.highScore
            : state.highScore,
      };
    case "setDifficulty":
      return {
        ...state,
        difficulty: action.payload,
        filterQuestions:
          action.payload === "all"
            ? state.questionData
            : state.questionData.filter(
                (question) => question.difficulty === action.payload
              ),
      };
      case "answersDisplay":
        return {...state, status: "answersDisplay", index: 0}
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { filterQuestions, status, index, errorMsg, score, answer, seconds, highScore, difficulty, answersIndex,  },
    dispatch
  ] = useReducer(reducer, initialState);

  // const {filterQuestions, status, errorMsg} = state;
  const numberQuestions = filterQuestions.length;
  const maxPossibleScore = filterQuestions
    .map(question => question.points)
    .reduce((acc, cur) => acc + cur, 0);

  // useEffect(() => {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "setData", payload: data }))
  //     .catch((err) => dispatch({ type: "dataFailed", payload: err.message }));
  // }, []);

  useEffect(() => {
    dispatch({ type: "setData", payload: data.questions });
  }, []);

  //Saving High score in local Storage
  useEffect(() => {
    localStorage.setItem("highScore", highScore)
  },[highScore])

  function handleStart() {
    dispatch({ type: "start" });
  }

  function handleNext() {
    dispatch({ type: "setIndex" });
  }

  function handleScore(index, arr) {
    const score = index === arr.correctOption ? arr.points : 0;
    dispatch({ 
      type: "setScore", payload: score,
    })
    dispatch({ 
      type: "setAnswer", payload: index,
    });
  }

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-8 flex flex-col justify-center md:px-8">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            handleStart={handleStart}
            numberQuestions={numberQuestions}
            highScore={highScore}
            difficulty={difficulty}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numberQuestions={numberQuestions}
              maxPossibleScore={maxPossibleScore}
              score={score}
              index={index}
              answer={answer}
            />
            <QuestionDisplay
              question={filterQuestions[index]}
              answer={answer}
              handleScore={handleScore}
            />
            <Footer>
              <Timer seconds={seconds} dispatch={dispatch} />
              <NextButton
                answer={answer}
                handleNext={handleNext}
                index={index}
                numberQuestions={numberQuestions}
              />
            </Footer>
          </>
        )}
        {status === "resultsLoading" && <ResultsLoader dispatch={dispatch}/>}
        {status === "finished" && (
          <FinishedScreen
            score={score}
            maxPossibleScore={maxPossibleScore}
            dispatch={dispatch}
            highScore={highScore}
            seconds={seconds}
          />
        )}
        {status === "answersDisplay" && (
          <>
            <ShowAnswers
              answersIndex={answersIndex}
              question={filterQuestions[index]}
              index={index}
            />
            <Footer>
              <NextAnswerButton
                handleNext={handleNext}
                index={index}
                numberQuestions={numberQuestions}
              />
            </Footer>
          </>
        )}
        <p>{errorMsg}</p>
      </Main>
    </div>
  );
}

export default App;
