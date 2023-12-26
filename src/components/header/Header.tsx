import * as React from 'react';
import Box from '@mui/material/Box';
import "./styles.scss"
import {FC} from "react";

const  Header: FC = () =>  {
    return (
            <header className={"header"}>
                <div className={"header__toolbar"}>
                    <img src={"/menuIcon.svg"} alt={""}/>
                    <img src={"/iconArrow.svg"} alt={""}/>
                    <div className={"header__button header__button_active"}>
                         Просмотр
                    </div>
                    <button className={"header__button"}>
                         Управление
                    </button>
                </div>

                <div className={"header__toolbar"}>
                    <div className={"navbar-button"}>
                        <div className="navbar-button__text-list">
                            <div className="navbar-button__text navbar-button__text_main">Название проекта</div>
                            <div className="navbar-button__text navbar-button__text_secondary">Аббревиатура</div>
                        </div>
                        <img className="navbar-button__icon" src="/navButtonIcon.svg" alt=""/>
                    </div>
                    <div className={"project-marker"}>
                        Строительно-монтажные работы
                    </div>
                </div>
            </header>
    );
}

export default Header
