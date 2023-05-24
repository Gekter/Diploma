import classNames from 'classnames'
import React from 'react'
import styles from './HeaderPage.module.css'


export interface IHeaderPageProps {
    title: string
}
const HeaderPage: React.FC<IHeaderPageProps> = ({ title }) => {
    return (
        <header className={classNames(styles.header)}>
            <h1 className={classNames(styles.title)}>{title} </h1>
        </header>
    )
}

export default HeaderPage