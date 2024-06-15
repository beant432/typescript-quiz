import React from 'react'
import { ButtonWrapper, Wrapper } from './QuestionCard.style';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: any;
    questionNu: number;
    totalQuestion: number;
}
const QuestionCard :React.FC<Props> = ({question,answers,callback, userAnswer,questionNu,totalQuestion}) => {
    return (
      <Wrapper>
          <p className='questionNum'>
              Question: {questionNu} / {totalQuestion}
          </p>
          <p dangerouslySetInnerHTML={{__html:question}}></p>
          {answers.map((answer) =>
                    <ButtonWrapper key={answer}
                        correct={userAnswer?.correct_answer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >
                  <button disabled={userAnswer} onClick={callback} value={answer}>
                      
                      <span dangerouslySetInnerHTML={{__html:answer}}/>
                  </button>
              </ButtonWrapper>)}
          </Wrapper>
  )
}

export default QuestionCard