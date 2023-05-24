import classNames from 'classnames'
import React from 'react'
import styles from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={classNames(styles.preloader)}></div>
    )
}

export default Preloader