import { useState } from "react";

function App() {
  const [questionText, setQuestionText] = useState("");

  const [options, setOptions] = useState({
    A: "",
    B: "",
    C: "",
    D: ""
  });

  const [correctOption, setCorrectOption] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      option: {
        A: "",
        B: "",
        C: "",
        D: ""
      },
      Correct: ""
    }
  ]);

  const [startQuiz, setStartQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);

  const OptionChange = (key, value) => {
    setOptions({
      ...options,
      [key]: value
    });
  };

  const addQuestion = () => {
    const newQuestion = {
      question: questionText,
      option: { ...options },
      Correct: correctOption
    };
    setQuestions([...questions, newQuestion]);

  };

  const startQuizs = () => {
    setStartQuiz(true);
    setCurrentQuestion(1); // start after dummy object
    setScore(0);
    setSelectedOption("");
  };

const nextQuestionHandler = () => {
  let updatedScore = score;

  if (selectedOption === questions[currentQuestion].Correct) {
    updatedScore = score + 1;
    setScore(updatedScore);
  }
  setSelectedOption("");
  if (currentQuestion + 1 < questions.length) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    alert(
      `Quiz Finished! Score: ${updatedScore}/${questions.length - 1}`
    );
    setStartQuiz(false);
  }
};


  return (
    <div style={{ padding: "20px", width: "400px" }}>
      <h2>Quiz Application</h2>

      {!startQuiz ? (
        <>
          <h3>Add Question</h3>

          <input type="text" placeholder="Enter question" value={questionText} onChange={(e) => setQuestionText(e.target.value)}
          />

          <input  type="text" placeholder="Option A" value={options.A}  onChange={(e) => OptionChange("A", e.target.value)  }/>

          <input type="text" placeholder="Option B" value={options.B} onChange={(e) =>  OptionChange("B", e.target.value) } />

          <input type="text" placeholder="Option C" value={options.C} onChange={(e) => OptionChange("C", e.target.value)  }/>

          <input type="text" placeholder="Option D" value={options.D} onChange={(e) => OptionChange("D", e.target.value) }/>

          <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
            <option value="">Select Correct Option</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

          <br /><br />
          <button onClick={addQuestion}>Add Question</button>

          <br /><br />
          <button onClick={startQuizs}>
            Start Quiz
          </button>
        </>
      ) : (
        <>
          <h3>
            Question {currentQuestion} of {questions.length - 1}
          </h3>

          <p>{questions[currentQuestion].question}</p>

          {Object.keys(questions[currentQuestion].option).map(
            (key) => (
              <label key={key}>
               <input type="radio" value={key} checked={selectedOption === key} onChange={() => setSelectedOption(key)} /> {key}: {questions[currentQuestion].option[key]}  <br /> </label>
            )
          )}

          <button disabled={selectedOption === ""} onClick={nextQuestionHandler} >  Next</button>
        </>
      )}
    </div>
  );
}

export default App;
