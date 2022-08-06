import React, {useEffect, useState} from "react";
import s from "./SectionGetRequest.module.css";
import axios from "axios";

const CreaterCards:any = ({countClick,setTotalUsers}: { countClick: number,setTotalUsers: any }) => {
    const [response, setResponse]: any = useState([])
    let arrCards: JSX.Element[] = []

    const makeGetRequest = () => {
        const promise: any = axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${countClick}`)
            .then((data)=>setResponse(data.data))
    }

    const toolTip = (id:string) => {
        let element: HTMLElement | null = document.getElementById(id)
        if (element!==null){
            element.style.display = 'block'
        }
    }
    const toolTipReset = (id: string) => {
        let element: HTMLElement | null = document.getElementById(id)
        if (element!==null){
            element.style.display = 'none'
        }
    }

    const createCard = () => {
        if (response.length!==0){
            setTotalUsers(response.total_users)
            for (let i:number = 0; i < response.users.length; i++) {
                arrCards[i] =
                <div className={s.cardContainer}>
                    <img className={s.userAvatar} src={response.users[i].photo}/>
                    <h2 className={s.userName} onMouseEnter={()=>toolTip(`toolTipName${i}`)} onMouseLeave={()=>toolTipReset(`toolTipName${i}`)} >{response.users[i].name}</h2>
                    <div id={`toolTipName${i}`} className={s.toolTipName}><h2>{response.users[i].name}</h2></div>
                    <h2 className={s.userPosition}>{response.users[i].position}</h2>
                    <h2 className={s.userEmail} onMouseEnter={()=>toolTip(`toolTipEmail${i}`)} onMouseLeave={()=>toolTipReset(`toolTipEmail${i}`)}>{response.users[i].email}</h2>
                    <div id={`toolTipEmail${i}`} className={s.toolTipEmail}><h2>{response.users[i].email}</h2></div>
                    <h2 className={s.userPhone}>{response.users[i].phone}</h2>
                </div>
            }
        }
        return arrCards;
    }

    useEffect(()=>{
        makeGetRequest()
    },[countClick])


    return(
        <div className={s.contentContainer} id='card-container' >
            {createCard()}
        </div>
    )

}
export default CreaterCards;