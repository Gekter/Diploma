import classNames from 'classnames'
import React from 'react'
import Avatar from '../../../components/avatar/Avatar'
import { ITaskUser } from '../../../types/dto.types'
import styles from './MemberCard.module.css'

const MemberCard: React.FC<ITaskUser> = (user) => {
    return (
        <div className={classNames(styles.MemberCard)}><Avatar user={user}></Avatar><h1>{user.name}</h1> </div>
    )
}

export default MemberCard