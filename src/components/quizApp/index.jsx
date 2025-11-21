import React from "react";
import questions from "./question.js";

const Quiz = () => {
  const [qNumber, setQNumber] = React.useState(0);
  const totalQ = questions.length;
  const [answerArray, setAnswerArray] = React.useState(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);
  const [score, setScore] = React.useState({
    correct: 0,
    wrong: 10,
    score: 0,
  });
  React.useEffect(() => {
    setAnswerArray(() => new Array(totalQ).fill(""));
  }, []);
  React.useEffect(() => {
    setCanPrev(() => (qNumber === 0 ? false : true));
    setCanNext(() => (qNumber === totalQ - 1 ? false : true));
  }, [qNumber]);
  React.useEffect(() => {
    let score = {};
    if (isSubmitted) {
      let counter = 0;
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].answer === answerArray[i]) counter++;
      }
      score = {
        correct: counter,
        wrong: totalQ - counter,
        score: counter * 10,
      };
    } else {
      score = {
        correct: 0,
        wrong: totalQ,
        score: 0,
      };
    }
    setScore(score);
  }, [isSubmitted]);
  return isSubmitted ? (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Quiz Results</h1>
        <p className="text-xl text-gray-600 mb-8">
          You completed the quiz! Here's your score:
        </p>

        <div className="bg-gray-50 rounded-xl p-6 w-full flex flex-col items-center gap-4">
          <div className="flex justify-between w-full text-lg font-medium text-gray-700">
            <span>Total Questions:</span>
            <span>{totalQ}</span>
          </div>
          <div className="flex justify-between w-full text-lg font-medium text-gray-700">
            <span>Correct Answers:</span>
            <span>{score.correct}</span>
          </div>
          <div className="flex justify-between w-full text-lg font-medium text-gray-700">
            <span>Wrong Answers:</span>
            <span>{score.wrong}</span>
          </div>
          <div className="flex justify-between w-full text-lg font-medium text-gray-700 border-t border-gray-200 pt-4 mt-4">
            <span>Score:</span>
            <span>{score.score}</span>
          </div>
        </div>

        <button
          className="mt-8 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md active:scale-95 transition"
          onClick={() => {
            setIsSubmitted(false);
            setQNumber(0);
            setAnswerArray(new Array(totalQ).fill(""));
          }}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-200">
      <div className="h-[90%] w-[90%] shadow-2xl rounded-2xl flex flex-col bg-white p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-600">
            Question {qNumber + 1} of {totalQ}
          </h2>
          <button
            disabled={canNext}
            className={`px-8 py-3 text-lg font-bold  rounded-xl   ${
              !canNext
                ? "bg-green-300 hover:bg-green-400 active:scale-95"
                : "bg-gray-300 hover:bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => setIsSubmitted(true)}
          >
            Submit
          </button>
        </div>

        <div className="flex-grow flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-10 leading-snug">
            {questions[qNumber].question}
          </h1>

          <div className="flex flex-col gap-4 w-full max-w-3xl mx-auto">
            {Object.entries(questions[qNumber].options).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-100 text-lg"
              >
                <input
                  type="radio"
                  name="answer"
                  value={value}
                  className="scale-125"
                  checked={answerArray && answerArray[qNumber] === value}
                  onChange={() => {
                    setAnswerArray((prev) => {
                      const array = [...prev];
                      array[qNumber] = value;
                      return array;
                    });
                  }}
                />
                <span className="font-medium">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-10">
          <button
            disabled={!canPrev}
            className={`px-8 py-3 text-lg font-bold  rounded-xl   ${
              canPrev
                ? "bg-yellow-300 hover:bg-yellow-400 active:scale-95"
                : "bg-gray-300 hover:bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              setQNumber((prev) => (prev === 0 ? 0 : prev - 1));
            }}
          >
            Prev
          </button>
          <button
            className={`px-8 py-3 text-lg font-bold  rounded-xl bg-red-400 hover:bg-red-500 active:scale-95`}
            onClick={() => {
              const array = [...answerArray];
              array[qNumber] = "";
              setAnswerArray(array);
            }}
          >
            Clear Selection
          </button>
          <button
            disabled={!canNext}
            className={`px-8 py-3 text-lg font-bold  rounded-xl   ${
              canNext
                ? "bg-yellow-300 hover:bg-yellow-400 active:scale-95"
                : "bg-gray-300 hover:bg-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              setQNumber((prev) =>
                prev === totalQ - 1 ? totalQ - 1 : prev + 1
              );
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
