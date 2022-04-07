import React, { useState } from "react"
export default function QusetionPanel(props) {
    const { questions, item } = props
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleChoiceClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions?.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    return <div className='question-panel'>
        {showScore ? (
            <div className='score-section'>
                You scored {score} out of {questions?.length}
            </div>
        ) : (
            <>
                <div className='question-section'>
                    <div className='question-count'>
                        <span>คำถามข้อที่ {currentQuestion + 1}/{questions?.length}</span>
                    </div>
                    <div className='question-text'>{questions && questions[currentQuestion]?.questionstitle}</div>
                </div>
                <div className='answer-section'>
                    {questions && questions[currentQuestion]?.choices.map((choice) => (
                        <button onClick={() => handleChoiceClick(choice.isCorrect)} >{choice.choiceTitle}</button>
                    ))}
                </div>
            </>
        )}
    </div>


}