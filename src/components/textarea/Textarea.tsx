import classNames from 'classnames'
import React from 'react'
import styles from './Textarea.module.css'
import { Textarea } from '@chakra-ui/react'

const MyTextarea: React.FC<any> = (props) => {
    return (
        <Textarea {...props} />
    )
}

export default MyTextarea