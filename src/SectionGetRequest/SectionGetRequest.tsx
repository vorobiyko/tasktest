import React, {useState} from "react";
import s from './SectionGetRequest.module.css'
import CreaterCards from "./CreaterCards";

const SectionGetRequest: any = () => {
    const [countClick,setCountClick]:any = useState(6)
    const [totalUsers,setTotalUsers]:any = useState(0)

    return(
        <section className={s.mainContainer} id='Users'>
            <h1 className={s.title}>
                Working with GET request
            </h1>
            <CreaterCards countClick={countClick} setTotalUsers={setTotalUsers} />
            <button className={(countClick > totalUsers) ? s.disabled : ''} onClick={()=>setCountClick(countClick+6)}>
                <h2>Show more</h2>
            </button>
        </section>
    )
}

export default SectionGetRequest;