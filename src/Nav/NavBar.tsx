import React from "react";
import s from './NavBar.module.css'
import logo from './../photos/Logo.svg'

const NavBar = () => {

    return(
        <nav className={s.navContainer}>
            <div className={s.logo}>
                <img src={logo}/>
            </div>
            <div className={s.buttons}>
                <a href='#Users'>
                    <h2>Users</h2>
                </a>
                <a href='#SingUp' >
                    <h2>Sign up</h2>
                </a>
            </div>
        </nav>
    )
}

export default NavBar;