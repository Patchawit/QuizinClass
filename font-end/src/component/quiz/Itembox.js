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
    // const [itemKw, setItemKw] = useState(query?.get("item"));
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
        navigate({
            pathname: pathname,
            search: `?${createSearchParams({
                item: "1"
            })}`
        });
    }, [])
    const onChangeItem = (e) => {
        // console.log(e.target.value)
        // console.log(itemKw)

        navigate({
            pathname: pathname,
            search: `?${createSearchParams({
                item: e.target.value
            })}`
        });
    }

    const onChickNextHandler = () => {
        const curItem = query.get("item")
        navigate({
            pathname: pathname,
            search: `?${createSearchParams({
                item: parseInt(curItem) + 1
            })}`
        });
    }

    const items = []
    for (let i = 1; i < totalOfQuestion + 1; i++) {
        items.push(<button value={i} onClick={onChangeItem}>{i}</button>)
    }

    return <div>

        <div className="boxx">
            {items}
            <button onClick={onChickNextHandler}>next</button>
        </div>
    </div>
}