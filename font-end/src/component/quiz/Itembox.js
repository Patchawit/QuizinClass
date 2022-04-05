import React, { useEffect, useState } from 'react'
import {
        useParams,
        useNavigate,
        useLocation,
        createSearchParams
} from "react-router-dom";
import { useQuery } from "../../hook/useQuery"
import './quizstyle.css';

export default function Itembox() {
    const query = useQuery()
    const [EditQuestion, setEditQuestion] = useState()
    const [totalOfQuestion, setTotalOfQuestion] = useState()
    let { soqId } = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [itemKw, setItemKw] = useState(query?.get("item") ?? "");
    useEffect(async () => {

            // console.log(soqId)
            await fetch(`http://localhost:7050/admin/Editque/${soqId}`)
                    .then(res => {
                            return res.json()
                    })
                    .then(result => {
                            setEditQuestion(result.setOfQuestion)
                            // console.log(result)
                            console.log(result.setOfQuestion.questions.length)
                            setTotalOfQuestion(result.setOfQuestion.questions.length)
                    })
    }, []) 
    const onChangeItem = (e) => {
        console.log(e.target.value)
        navigate({
            pathname: pathname,
            search:`?${createSearchParams({
                item: e.target.value
            })}`
        });
    }

    const items = []
    for (let i = 1; i < totalOfQuestion+1; i++) {
        items.push(<button value={i} onClick={onChangeItem}>{i}</button>)
      }

    return <div>
        
        <div className="boxx">
            {items}
        </div>
    </div>
}