import styles from "./Board.module.css";
import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { ITask } from "../../types/dto.types";
import {
  fetchTaskById,
  fetchTasksByProjectId,
  resetColumns,
  updateColumns,
  updateTask,
} from "../../store/tasksSlice/tasks.slice";
import TaskCard from "../taskCard/TaskCard";
import ReactModal from "react-modal";
import Modal from "react-modal";
import CustomScroll from "react-custom-scroll";
import Scrollbars from "react-custom-scrollbars-2";
import classNames from "classnames";
import { STATUSES, TaskStatus } from "../../types/api.types";
import { useParams } from "react-router-dom";
import ModalViewTask from "../modalViewTask/ModalViewTask";
import move, { IMoveResult } from "../../utils/move-from-list-to-another-list";
import moveElInList from "../../utils/move-el-in-list";
import Preloader from "../preloader/Preloader";

Modal.setAppElement("#root");

export interface IColumn {
  title: TaskStatus;
  tasks: ITask[];
}

export interface IBoardProps { }

const Board: React.FC<IBoardProps> = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { columns, currentTask, columnsFetchStatus } = useAppSelector(
    (state) => state.tasks
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickCard = (id: number) => {
    setIsModalOpen(true);
    dispatch(fetchTaskById(id));
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    dispatch(fetchTasksByProjectId({ projectId: +id!, status: "2" }));
    dispatch(fetchTasksByProjectId({ projectId: +id!, status: "3" }));
    dispatch(fetchTasksByProjectId({ projectId: +id!, status: "4" }));
    dispatch(fetchTasksByProjectId({ projectId: +id!, status: "5" }));
    dispatch(fetchTasksByProjectId({ projectId: +id!, status: "6" }));

    return () => {
      dispatch(resetColumns());
    };
  }, []);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = moveElInList(
        columns[sInd].tasks,
        source.index,
        destination.index
      );
      const newState: IColumn[] = JSON.parse(JSON.stringify(columns)); // TODO :) решить проблему производительности с JSON.parse???
      newState[sInd].tasks = items;
      dispatch(updateColumns(newState));
    } else {
      const taskToUpdate = columns[sInd].tasks[source.index];

      dispatch(
        updateTask({
          id: taskToUpdate.id,
          dto: { ...taskToUpdate, status: columns[dInd].title },
        })
      );

      // TODO По-хорошему, надо бы дожидаться ответа от сервера перед тем, как переместить задачу в другую колонку
      const result: IMoveResult = move(
        columns[sInd].tasks,
        columns[dInd].tasks,
        source,
        destination
      );
      const newState: IColumn[] = JSON.parse(JSON.stringify(columns)); // TODO :) решить проблему производительности с JSON.parse???
      newState[sInd].tasks = result[sInd];
      newState[dInd].tasks = result[dInd];
      dispatch(updateColumns(newState));
    }
  }

  const [dragOverPepe, setDragOverPepe] = React.useState(false);

  return (

    <div className={styles.Board}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, ind) => (
          <React.Fragment key={ind}>
            <div className={classNames(styles.Column)}>
              <span className={styles.ColumnTitle}>
                {STATUSES[column.title]}
              </span>
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <Scrollbars
                    autoHide
                    autoHeight
                    autoHeightMin={"100%"}
                    autoHeightMax={"100%"}
                  >
                    <div
                      className={styles.columnContent}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {column.tasks.length === 0 &&
                        columnsFetchStatus === "PENDING" ? (
                        <Preloader />
                      ) : column.tasks.length === 0 ? (
                        <div
                          style={{ opacity: dragOverPepe ? 1 : 0.5 }}
                          onDragEnter={() => {
                            console.log(123);
                            setDragOverPepe(true);
                          }}
                          onDragLeave={() => setDragOverPepe(false)}
                        >
                          <p>в этой колонке ещё нет задач</p>
                          <img
                            src={
                              dragOverPepe
                                ? "https://assets.stickpng.com/images/5845cd430b2a3b54fdbaecf8.png"
                                : "data:image/jpeg;base64,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"
                            }
                            alt="pepe"
                          />
                        </div>
                      ) : (
                        column.tasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={"" + task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                onClick={() => handleClickCard(task.id)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskCard {...task}></TaskCard>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                    </div>

                    {provided.placeholder}
                  </Scrollbars>
                )}
              </Droppable>
            </div>
            {ind !== columns.length - 1 && (
              <div className={classNames(styles.Devider)}></div>
            )}
          </React.Fragment>
        ))}
      </DragDropContext>

      <ModalViewTask
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        task={currentTask}
      />
    </div>

  );
};

export default Board;
