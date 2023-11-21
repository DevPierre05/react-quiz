/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import data from "../../data/questions.json";
import { createContext, useContext, useEffect, useReducer } from "react";

//create context
const QuizContext = createContext();

function QuizProvider({ children }) {
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
    errorMsg: "",
    difficulty: "all",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setData":
        return {
          ...state,
          questionData: action.payload,
          filterQuestions: action.payload,
          status: "ready",
        };
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
        return {
          ...state,
          answer: action.payload,
          answersIndex: [...state.answersIndex, action.payload],
        };
      case "setScore":
        return { ...state, score: state.score + action.payload };
      case "resultsLoad":
        return { ...state, status: "finished" };
      case "restart":
        return {
          ...state,
          status: "ready",
          score: 0,
          index: 0,
          answersIndex: [],
        };
      case "setTimer":
        return {
          ...state,
          seconds: state.seconds - 1,
          status: state.seconds === 1 ? "resultsLoading" : state.status,
          highScore:
            state.index === state.filterQuestions.length - 1 ||
            state.seconds === 1
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
        return { ...state, status: "answersDisplay", index: 0 };
      default:
        throw new Error("Action unknown");
    }
  }

  const [
    {
      filterQuestions,
      status,
      index,
      errorMsg,
      score,
      answer,
      seconds,
      highScore,
      difficulty,
      answersIndex,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const question = filterQuestions.at(index);
  const numberQuestions = filterQuestions.length;
  const maxPossibleScore = filterQuestions
    .map((question) => question.points)
    .reduce((acc, cur) => acc + cur, 0);

  useEffect(() => {
    dispatch({ type: "setData", payload: data.questions });
  }, []);

  //Saving High score in local Storage
  useEffect(() => {
    localStorage.setItem("highScore", highScore);
  }, [highScore]);

  function handleStart() {
    dispatch({ type: "start" });
  }

  function handleNext() {
    dispatch({ type: "setIndex" });
  }

  function handleScore(index, arr) {
    const score = index === arr.correctOption ? arr.points : 0;
    dispatch({
      type: "setScore",
      payload: score,
    });
    dispatch({
      type: "setAnswer",
      payload: index,
    });
  }

  return (
    <QuizContext.Provider
      value={{
        filterQuestions,
        status,
        index,
        errorMsg,
        score,
        answer,
        seconds,
        highScore,
        difficulty,
        answersIndex,
        dispatch,
        handleScore,
        handleNext,
        handleStart,
        maxPossibleScore,
        numberQuestions,
        question,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
