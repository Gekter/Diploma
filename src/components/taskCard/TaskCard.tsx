import { Tooltip } from '@chakra-ui/react';
import classNames from 'classnames';
import { format } from 'date-fns';
import { ITask } from '../../types/dto.types';
import parseBBCode from '../../utils/parse-bb-code';
import Avatar from '../avatar/Avatar';
import styles from './TaskCard.module.css'
import { ReactComponent as CommentsIcon } from '../../global/assets/icons/commentsIcon.svg';

const TaskCard: React.FC<ITask> = ({ title, creator, createdDate, description, responsible, commentsCount }) => {
    return <div className={styles.Card}>
        <span>{title}</span>
        <div className={classNames(styles.meta, styles.text)}>
            <span className={styles.date}>
                {format(new Date(createdDate), 'dMMM')}
            </span>
            <div className={styles.circle}></div>
            <div className={styles.createdBy}>Created by
                <span className={styles.createdByAuthor} title={creator.name}> {creator.name}</span>
            </div>
        </div>
        <div className={classNames(styles.text, styles.description)} dangerouslySetInnerHTML={parseBBCode(description.length === 0 ? "Описания нет" : description)}>

        </div>
        <footer className={classNames(styles.footer)}>
            <Tooltip label='Количество комментариев'>
                <div className={classNames(styles.comments)}>
                    <CommentsIcon></CommentsIcon>

                    <span className={classNames(styles.text, styles.commentCount)}>
                        {+commentsCount}

                    </span>
                </div>
            </Tooltip>
            <Avatar user={responsible}></Avatar>
        </footer>
    </div>
}
export default TaskCard