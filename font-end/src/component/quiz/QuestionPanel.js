import React, { useEffect, useState } from "react"
import {
    useParams
} from "react-router-dom";
import { useAuthContext } from '../../context/AuthContext';
export default function QusetionPanel(props) {

    const { user } = useAuthContext();
    const { questions, item, handleUpdateQuestion } = props
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [didMount, setDidMount] = useState(false)
    const [studentAns, setStudentAns] = useState([]);
    let { soqId } = useParams();

    useEffect(() => { setDidMount(true) }, [])

    useEffect(() => {
        if (didMount) {
            onSubmitQuizHandler()
        }
    }, [showScore])
    const onSubmitQuizHandler = async () => {
        // console.log(studentAns)
        await fetch("http://localhost:7050/admin/PatchScore", {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                soqIdScore: soqId,
                userScore: score,
                user: user,
                studentAns: studentAns
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

 

    const handleChoiceClick = (isCorrect, ans) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        let item = currentQuestion
        let studentAnsTemp = { item, ans }
        setStudentAns((prevstate) => {
            return [...prevstate, studentAnsTemp]
        })
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions?.length) {
            setCurrentQuestion(nextQuestion);
            // handleUpdateQuestion(nextQuestion)
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
                <div className="container">
                    <div className="row">
                        <div className='question-section col-6'>
                            <div className='question-count row'>
                                <span>คำถามข้อที่ {currentQuestion + 1}/{questions?.length}</span>
                            </div>
                            <div className='question-text row'>
                                <div className="col-12">
                                    {questions && questions[currentQuestion]?.questionstitle}
                                </div>
                            </div>
                            <div className='question-img row'>
                                {questions && (questions[currentQuestion]?.imgUrl === "images/1x1.png" ? <div></div> : <img src={`http://localhost:7050/` + questions[currentQuestion]?.imgUrl} />)}
                                {/* {questions && <img src={`http://localhost:7050/` + questions[currentQuestion]?.imgUrl} />} */}
                            </div>
                        </div>
                        <div className='answer-section col-6'>
                            {questions && questions[currentQuestion]?.choices?.map((choice) => {
                            
                                return <button onClick={() => handleChoiceClick(choice?.isCorrect, choice)} >{choice?.choiceTitle}</button>

                            }
                            )}

                        </div>
                    </div>
                </div>
            </>
        )}
    </div>


}