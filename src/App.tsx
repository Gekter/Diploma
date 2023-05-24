import styles from "./App.module.css";
import SideMenu from "./components/sideMenu/SideMenu";

import { Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";
import { INavLinkItemProps } from "./components/sideMenu/navLinkItem/NavLinkItem";
import { ReactComponent as ProjectIcon } from "./global/assets/icons/projectsIcon.svg";
import { ReactComponent as AnalyticsIcon } from "./global/assets/icons/analyticsIcon.svg";
import { ReactComponent as MembersIcon } from "./global/assets/icons/membersIcon.svg";
import { ReactComponent as NotificationsIcon } from "./global/assets/icons/notificationsIcon.svg";
import { ReactComponent as SettingsIcon } from "./global/assets/icons/settigsIcon.svg";
import { ReactComponent as TasksIcon } from "./global/assets/icons/tasksIcon.svg";
import { getMsg } from "./global/msg";
import { useAppSelector } from "./hooks/hooks";

export function App() {
  const location = useLocation();
  const { currentProject } = useAppSelector((state) => state.projects);
  let mainLinks: INavLinkItemProps[] = [
    {
      SVGElement: ProjectIcon,
      title: getMsg("projectsSideMenuItem"),
      to: "/",
    },
  ];

  if (currentProject) {
    mainLinks = mainLinks.concat([
      {
        SVGElement: TasksIcon,
        title: getMsg("tasksSideMenuItem"),
        to: `/projects/${currentProject.ID}/tasks`,
      },
      {
        SVGElement: NotificationsIcon,
        title: getMsg("notificationsSideMenuItem"),
        to: "notifications",
      },
      {
        SVGElement: AnalyticsIcon,
        title: getMsg("analyticsSideMenuItem"),
        to: "analytics",
      },
      {
        SVGElement: MembersIcon,
        title: getMsg("membersSideMenuItem"),
        to: `/projects/${currentProject.ID}/members`,
      },
    ]);
  }
  const footerLinks: INavLinkItemProps[] = [
    {
      SVGElement: SettingsIcon,
      title: getMsg("settingsSideMenuItem"),
      to: "settings",
    },
  ];

  return (
    <div className={classNames(styles.App)}>
      <div className={classNames(styles.Side)}>
        <SideMenu
          headerTitle={currentProject?.NAME || getMsg("headerTitlePlaceholder")}
          mainLinks={mainLinks}
          footerLinks={footerLinks}
        />
      </div>
      <main className={classNames(styles.Main)}>
        <Outlet />
      </main>
    </div>
  );
}
