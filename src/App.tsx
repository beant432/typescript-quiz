import React,{useState}from 'react'
import QuestionCard from './components/QuestionCard'
import { Difficulty, Fetch_Questions, QuestionState } from './Api';
import {GlobalStyle, Wrapper} from './App.styles';

const Total_Question = 10;

export type AnswersObj = {
  question: string,
  answer: string,
  correct: boolean,
  correct_answer: string,

}
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNum, setQuestionNum] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswersObj[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await Fetch_Questions(Total_Question, Difficulty.Easy);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNum(0);
    setLoading(false);
  }
  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[questionNum].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[questionNum].question,
        answer,
        correct,
        correct_answer: questions[questionNum].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = questionNum + 1;

    if (nextQ === Total_Question) {
      setGameOver(true);
    } else {
      setQuestionNum(nextQ);
    }
  };  
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === Total_Question ? (
          <button className='start' onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNu={questionNum + 1}
            totalQuestion={Total_Question}
            question={questions[questionNum].question}
            answers={questions[questionNum].answers}
            userAnswer={userAnswers ? userAnswers[questionNum] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === questionNum + 1 && questionNum !== Total_Question - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  )
}

export default App