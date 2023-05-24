import classNames from "classnames";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import HeaderPage from "../../components/headerPage/HeaderPage";
import Preloader from "../../components/preloader/Preloader";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { getMsg } from "../../global/msg";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchProjects, setNullCurrentProject } from "../../store/projectsSlice/projects.slice";
import styles from "./Projects.module.css";
const Projects = () => {
  const dispatch = useAppDispatch();
  const { projects, projectsFetchStatus } = useAppSelector((state) => state.projects);

  React.useEffect(() => {
    dispatch(fetchProjects());
    dispatch(setNullCurrentProject());
  }, []);

  return (
    <>
      <HeaderPage title={getMsg('projectsSideMenuItem')}></HeaderPage>

      <h1 className={classNames(styles.title)}></h1>

      {
        projectsFetchStatus !== 'PENDING' ? (
          <Scrollbars
            autoHide
            autoHeight
            autoHeightMin={"100%"}
            autoHeightMax={"100%"}
            style={{ height: "calc(100vh - 64px)" }}
          >
            <div className={classNames(styles.cardsWrapper)}>
              {projects.length > 0 &&
                projects.map((p) => (
                  <div key={p.ID} className={classNames(styles.cardProjectWrapper)}>
                    <ProjectCard {...p}></ProjectCard>
                  </div>
                ))}
            </div>
          </Scrollbars>
        ) : (
          <Preloader />

        )
      }

    </>
  );
};

export default Projects;
