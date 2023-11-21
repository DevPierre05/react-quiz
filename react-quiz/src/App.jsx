/* eslint-disable no-unused-vars */
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import QuestionDisplay from "./components/QuestionDisplay";
import Progress from "./components/Progress";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import NextButton from "./components/NextButton";
import FinishedScreen from "./components/FinishedScreen";
import ShowAnswers from "./components/ShowAnswers";
import NextAnswerButton from "./components/NextAnswerButton";
import ResultsLoader from "./components/ResultsLoader";
import { useQuiz } from "./context/QuizContext";



function App() {
  const {status, errorMsg} =useQuiz();

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-8 flex flex-col justify-center md:px-8">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen /> }
        {status === "active" && (
          <>
            <Progress />
            <QuestionDisplay  />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "resultsLoading" && <ResultsLoader />}
        {status === "finished" && <FinishedScreen />}
        {status === "answersDisplay" && (
          <>
            <ShowAnswers />
            <Footer>
              <NextAnswerButton />
            </Footer>
          </>
        )}
        <p>{errorMsg}</p>
      </Main>
    </div>
  );
}

export default App;
