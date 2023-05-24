import classNames from "classnames";
import React from "react";
import MyButton from "../button/Button";
import NavLinkItem, { INavLinkItemProps } from "./navLinkItem/NavLinkItem";
import styles from "./SideMenu.module.css";
import { ReactComponent as RighArrowtIcon } from "../../global/assets/icons/rightArrow.svg";
import { ReactComponent as LeftArrowIcon } from "../../global/assets/icons/leftArrow.svg";
import { IconButton, Tooltip } from "@chakra-ui/react";


export interface ISideMenuProps {
  headerTitle: string
  mainLinks: INavLinkItemProps[],
  footerLinks: INavLinkItemProps[]
}


const SideMenu: React.FC<ISideMenuProps> = ({ mainLinks, footerLinks, headerTitle }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const handleToggleCollapse = () => {
    setIsCollapsed(isCollapsed => !isCollapsed)
    console.log(isCollapsed)
  }
  return (
    <aside className={classNames({
      [styles.SideMenu]: true,
      [styles.SideMenuCollapsed]: isCollapsed
    })}>
      <div className={classNames(styles.SideMenuContent)}>
        <div className={classNames(styles.collapseBtn)} onClick={() => handleToggleCollapse()} >
          <IconButton aria-label='collapse' icon={isCollapsed ? <RighArrowtIcon /> : <LeftArrowIcon />} />


        </div>


        <header className={classNames(styles.Header, styles.Item)}>
          {headerTitle}
        </header>

        <ul>
          {
            mainLinks.map(link => (
              <Tooltip
                placement="right"

                key={link.to}
                isDisabled={!isCollapsed}
                label={link.title}>
                <div>
                  <NavLinkItem
                    SVGElement={link.SVGElement}
                    title={link.title}
                    to={link.to}
                  ></NavLinkItem>

                </div>
              </Tooltip>
            ))
          }
        </ul>
      </div>
      <footer>
        <ul>
          {
            footerLinks.map(link => (
              <Tooltip
                key={link.to}
                placement="right"
                isDisabled={!isCollapsed} label={link.title}>
                <div>
                  <NavLinkItem
                    SVGElement={link.SVGElement}
                    title={link.title}
                    to={link.to}
                  ></NavLinkItem>

                </div>
              </Tooltip>
            ))
          }
        </ul>
      </footer>
    </aside>
  );
};

export default SideMenu;
