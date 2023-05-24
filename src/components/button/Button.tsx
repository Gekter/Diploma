import { Button } from '@chakra-ui/react';
import classNames from 'classnames'
import React from 'react'
import styles from './Button.module.css'

export interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    MyTitle: string
    SVGElement?: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>,
}


const MyButton: React.FC<IButtonProps> = ({ MyTitle, SVGElement, ...props }) => {
    return (
        <Button  {...props} className={classNames(styles.Button)} >
            {SVGElement && <SVGElement />}
            {MyTitle}</Button>
    )
}

export default MyButton