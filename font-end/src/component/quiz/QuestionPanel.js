import React, { useEffect, useState } from "react"
import {
    useParams
} from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext';
export default function QusetionPanel(props) {
    const { user } = useAuthContext();
    const { questions, item } = props
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [didMount, setDidMount] = useState(false)
    let { soqId } = useParams();

    useEffect(() => { setDidMount(true) }, [])

    useEffect(() => {
        if (didMount) {
            onSubmitQuizHandler()
        }
    }, [showScore])
    const onSubmitQuizHandler = async () => {
        await fetch("http://localhost:7050/admin/PatchScore", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                soqIdScore: soqId,
                userScore: score,
                user: user
            })
        })
        // .then(result => {
        //     return result.json()
        // })
        // .then(res => {
        //     console.log(res)
        //     return setQuestionList(res.Question.questions)
        // })

    }

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
                    <div className='question-text'>
                        {questions && questions[currentQuestion]?.questionstitle}
                        {questions && <img src={`http://localhost:7050/` + questions[currentQuestion]?.imgUrl} />}

                    </div>
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