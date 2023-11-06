/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
function StartScreen({numberQuestions, handleStart, highScore, difficulty, dispatch}) {
  return (
    <div className="start">
      <div className="bg-teal-700 p-5 px-8 rounded-2xl text-[2rem] font-medium mb-3">
        Highscore: {highScore}
      </div>
      <h2 className="text-[4rem] mt-10 font-bold text-center">
        Welcome to React Quiz
      </h2>
      <h3 className="text-center">
        Test your knowledge on the popular JS library
      </h3>
      <h4 className="text-center">
        {numberQuestions} questions to test your react mastery
      </h4>
      <div className="flex gap-5">
        <p className="text-[1.5rem] text-teal-300 sm:text-[2rem]">
          Choose Difficulty Level:
        </p>
        <select
          className="text-white text-[1.3rem] bg-[#343a40] border rounded-2xl px-2 sm:text-[1.5rem] sm:px-5"
          value={difficulty}
          onChange={(e) => {
            dispatch({ type: "setDifficulty", payload: e.target.value });
          }}
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={handleStart} className="btn btn-ui mt-10">
        Let's start
      </button>
    </div>
  );
}

export default StartScreen
