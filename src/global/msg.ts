export const allLanguages = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
] as const;

export type ILanguage = typeof allLanguages[number]['value'];

export type IMsgNames =
  | 'createTaskErrorMsg'
  | 'addModalTitle'
  | 'responcible'
  | 'project'
  | 'projectsSideMenuItem'
  | 'notificationsSideMenuItem'
  | 'analyticsSideMenuItem'
  | 'membersSideMenuItem'
  | 'settingsSideMenuItem'
  | 'tasksSideMenuItem'
  | 'headerTitlePlaceholder';

const msgs: Record<ILanguage, Record<IMsgNames, string>> = {
  en: {
    createTaskErrorMsg: 'task not created error',
    addModalTitle: 'Add task',
    responcible: 'responcible',
    project: 'project',
    projectsSideMenuItem: 'projects',
    notificationsSideMenuItem: 'Notifications',
    analyticsSideMenuItem: 'Analytics',
    membersSideMenuItem: 'Members',
    settingsSideMenuItem: 'Settings',
    tasksSideMenuItem: 'Tasks',
    headerTitlePlaceholder: 'Choose project',
  },
  ru: {
    createTaskErrorMsg: 'Не удалось создать задачу',
    addModalTitle: 'Добавление задачи',
    responcible: 'Ответственнный',
    project: 'Проект',
    projectsSideMenuItem: 'Проекты',
    notificationsSideMenuItem: 'Нотификации',
    analyticsSideMenuItem: 'Аналитика',
    membersSideMenuItem: 'Участники',
    settingsSideMenuItem: 'Настройки',
    tasksSideMenuItem: 'Задачи',
    headerTitlePlaceholder: 'Выберите проект',
  },
};

export const setLanguage = (language: ILanguage) => {
  localStorage.setItem('language', language);
};
export const getLanguage = (): ILanguage => {
  return (localStorage.getItem('language') as ILanguage) || 'ru';
};

export const getMsg = (msgName: IMsgNames) => {
  const language: ILanguage = getLanguage();

  switch (language) {
    case 'en':
      return msgs['en'][msgName];

    default:
      return msgs['ru'][msgName];
  }
};

export default msgs;
