import classNames from 'classnames'
import React from 'react'
import { ITaskUser } from '../../types/dto.types'
import styles from './Avatar.module.css'
export interface IAvatarProps {
    user: ITaskUser
    size?: number
}

const Avatar: React.FC<IAvatarProps> = ({ user, size = 24 }) => {
    return (
        <img title={user.name} alt={user.name} style={{ width: `${size}px`, height: `${size}px` }} className={classNames(styles.user)} src={user.icon.startsWith('/bitrix') ? 'https://truecode.bitrix24.ru/bitrix/js/ui/icons/b24/images/ui-user.svg?v2' : user.icon}></img>

    )
}

export default Avatar