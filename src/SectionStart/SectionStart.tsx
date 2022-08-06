import React from "react";
import s from './SectionStart.module.css'

const SectionStart = () => {
    return(
        <section className={s.mainContainer}>
            <div className={s.contentContainer}>
                <h1 className={s.title}>
                    Test assignment for front-end developer
                </h1>
                <h2 className={s.description}>
                    What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </h2>
                <a href='#SingUp'>
                    <h2>Sign up</h2>
                </a>
            </div>
        </section>
    )
}

export default SectionStart;