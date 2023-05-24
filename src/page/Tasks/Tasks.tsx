import React from "react";
import classNames from "classnames";
import Board, { IColumn } from "../../components/board/Board";

import styles from "./Tasks.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchUsers } from "../../store/userSlice/user.slice";
import { useParams } from "react-router-dom";
import ModalCreateTask from "../../components/modalCreateTask/ModalCreateTask";
import MyButton from "../../components/button/Button";
import { ReactComponent as PlusIcon } from "../../global/assets/icons/plusIcon.svg";
import { fetchProjectById } from "../../store/projectsSlice/projects.slice";
import { socket } from "../../api/api";
import { ITaskWithComments } from "../../types/dto.types";
import { STATUSES } from "../../types/api.types";
import {
  addOrReplaceTask,
  updateColumns,
  updateCurrentTask,
} from "../../store/tasksSlice/tasks.slice";
import HeaderPage from "../../components/headerPage/HeaderPage";

const Tasks = () => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { users, usersFetchStatus } = useAppSelector((state) => state.users);
  const { projects, currentProject } = useAppSelector(
    (state) => state.projects
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchProjectById(+id!));

    socket.emit("join", id);

    socket.on("TASK", (newTask: ITaskWithComments) => {
      if (+newTask.group.id !== +id!) return;
      console.log(1);

      dispatch(updateCurrentTask(newTask));
      dispatch(addOrReplaceTask(newTask));
    });
  }, []);

  React.useEffect(() => {
    if (isModalOpen) {
      dispatch(fetchUsers());
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowAddTaskModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  //TODO поправить title undefined | string
  return (
    <>
      <HeaderPage title={currentProject?.NAME || ""} />
      <MyButton
        MyTitle="Add task"
        SVGElement={PlusIcon}
        onClick={handleShowAddTaskModal}
      />
      <Board />
      <ModalCreateTask
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        idProject={id!}
      />
    </>
  );
};

export default Tasks;
