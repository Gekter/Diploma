import React from 'react'
import { Select } from '@chakra-ui/react'


type Props = {
    [key: string]: any,
    children?: React.ReactNode
};

const MySelect: React.FC<Props> = ({ children, ...props }) => {
    return (
        <Select {...props}>{children}</Select>
    )
}

export default MySelect