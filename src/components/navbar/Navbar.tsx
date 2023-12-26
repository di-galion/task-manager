import "./style.scss"
import {FC} from "react";
import {NAVBAR_ITEMS} from "./data.ts"
import * as cn from "classnames";

const Navbar: FC = () => {
    return (
        <aside className={"navbar"}>
            <ul className={"navbar__list"}>
                {NAVBAR_ITEMS.map(item => {
                    return (
                        <li
                            key={item.text}
                            className={cn(`navbar__item`, {
                                    "navbar__item_active": item.isActive
                                }
                            )}
                        >
                            <img className={"navbar__img"} src="/navbarItemIcon.svg" alt=""/>
                            <span>{item.text}</span>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}

export default Navbar