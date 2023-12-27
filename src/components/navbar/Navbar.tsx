import "./Navbar.style.scss"
import {FC} from "react";
import {NAVBAR_ITEMS} from "../../data"
import classNames from "classnames";

export const Navbar: FC = () => {
    return (
        <aside className={'navbar'}>
            <ul className={'navbar__list'}>
                {NAVBAR_ITEMS.map(item => {
                    return (
                        <li
                            key={item.text}
                            className={classNames(`navbar__item`, {
                                    'navbar__item_active': item.isActive
                                }
                            )}
                        >
                            <img className={'navbar__img'} src='/navbarItemIcon.svg' alt=''/>
                            <span>{item.text}</span>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}