import React from "react";

import HeaderPage from "../../components/headerPage/HeaderPage"
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { allLanguages, getLanguage, getMsg, ILanguage, setLanguage as saveLanguage } from "../../global/msg"
const Settings = () => {

    const [language, setLanguage] = React.useState(getLanguage())

    React.useEffect(() => {
        saveLanguage(language)
    }, [language])
    return <div>
        <HeaderPage title={getMsg('settingsSideMenuItem')}></HeaderPage>

        <RadioGroup onChange={(lang: ILanguage) => setLanguage(lang)} value={language}>
            <Stack direction='row'>
                {
                    allLanguages.map(lang => <Radio key={lang.value} value={lang.value}>{lang.label}</Radio>)
                }

            </Stack>
        </RadioGroup>
    </div>
}

export default Settings