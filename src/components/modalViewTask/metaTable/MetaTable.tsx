import React from 'react'
import styles from './MetaTable.module.css'
import { format } from "date-fns";
import { ITaskWithComments } from '../../../types/dto.types';
import { getMsg } from '../../../global/msg';
import Avatar from '../../avatar/Avatar';


const MetaTable: React.FC<ITaskWithComments> = ({ group, responsible, creator, createdDate, priority, status, deadline }) => {
    console.log(deadline)
    const responcibleMsg = getMsg('responcible')
    const projectMsg = getMsg('project')
    return (
        <table className={styles.ModalTable}>
            <tr>
                <td>{projectMsg}:</td>
                <td>{group.name}</td>
            </tr>
            <tr>
                <td>{responcibleMsg}:</td>
                <td>
                    <div className={styles.ModalTableUser}>
                        <div>{responsible.name}</div>
                        <Avatar user={responsible} />
                    </div>
                </td>
            </tr>
            <tr>
                <td>Создатель:</td>
                <td>
                    <div className={styles.ModalTableUser}>
                        <div>{creator.name}</div>
                        <Avatar user={creator} />
                    </div>
                </td>
            </tr>
            <tr>
                <td>Дата создания:</td>
                <td>{format(new Date(createdDate), "y MMMM d")}</td>
            </tr>
            <tr>
                <td>Статус:</td>
                <td>
                    <p className={styles.status}>{status}</p>
                </td>
            </tr>
            <tr>
                <td>Приоритет:</td>
                <td>
                    <p className={styles.priority}>{priority}</p>
                </td>
            </tr>
            <tr>
                <td>Крайний срок:</td>
                <td>
                    <p className={styles.priority}>{deadline ? format(new Date(deadline), "y MMMM d") : 'Не назначено'}</p>
                </td>
            </tr>
        </table>
    )
}

export default MetaTable