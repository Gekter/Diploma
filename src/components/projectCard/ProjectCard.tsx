import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { IProject } from "../../types/dto.types";
import styles from "./ProjectCard.module.css";
import { ReactComponent as MembersIcon } from '../../global/assets/icons/membersIcon.svg'

const ProjectCard: React.FC<IProject> = ({ NAME, ID, NUMBER_OF_MEMBERS, ACTIVE, CLOSED, OPENED, DESCRIPTION, VISIBLE, PROJECT }) => {
  return (
    <NavLink to={`/projects/${ID}/tasks`} className={classNames(styles.Card)}>
      <header className={classNames(styles.header)}>
        <h1 className={classNames(styles.title)}>{NAME}</h1>

      </header>
      <footer>
        <div className={classNames(styles.meta)}>
          <div className={classNames(styles.members)} data-tip="Количество участнико на проекте" data-for='test'>
            <div
              className={classNames(styles.memberIcon)}

            ><MembersIcon

            >

              </MembersIcon>

            </div>
            <span>{NUMBER_OF_MEMBERS}</span>
          </div>

        </div>
      </footer>

    </NavLink>
  );
};

export default ProjectCard;
