import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavLinkItem.module.css'

export interface INavLinkItemProps {
    SVGElement: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>,
    title: string,
    to: string,
}

const NavLinkItem: React.FC<INavLinkItemProps> = ({ SVGElement, title, to }) => {
    return (
        <li>
            <NavLink
                className={({ isActive }) =>
                    classNames(styles.Item, { [styles.ItemActive]: isActive })
                }
                to={to}
            >
                <div className={classNames(styles.ItemContent)}>
                    <>
                        <SVGElement />
                        {title}
                    </>
                </div>
            </NavLink>
        </li>
    )
}

export default NavLinkItem