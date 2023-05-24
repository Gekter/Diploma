import classNames from "classnames";
import { format } from "date-fns";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import ReactModal from "react-modal";
import { imagesExtensions } from "../../const/images";
import { useAppDispatch } from "../../hooks/hooks";
import { addComment } from "../../store/tasksSlice/tasks.slice";
import { ITask, ITaskWithComments } from "../../types/dto.types";
import parseBBCode from "../../utils/parse-bb-code";
import Avatar from "../avatar/Avatar";
import Preloader from "../preloader/Preloader";
import styles from "./ModalViewTask.module.css";
import { ReactComponent as CommentsIcon } from "../../global/assets/icons/commentsIcon.svg";
import MetaTable from "./metaTable/MetaTable";
import AddComment from "./addComment/AddComment";

export interface IModalViewTaskProps {
  isModalOpen: boolean;
  closeModal: () => void;
  task: ITaskWithComments | null;
}

const ModalViewTask: React.FC<IModalViewTaskProps> = ({
  isModalOpen,
  closeModal,
  task,
}) => {
  let content = (
    <div className={classNames(styles.preloaderWrapper)}>
      <Preloader />
    </div>
  );

  if (task) {
    const { comments, description, id, title, files } = task;

    const images = files.filter((file) =>
      imagesExtensions.includes(file.NAME.split(".").at(-1)!)
    );

    const otherFiles = files.filter(
      (file) => !imagesExtensions.includes(file.NAME.split(".").at(-1)!)
    );

    content = (
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={"100%"}
        autoHeightMax={"100%"}
        style={{ height: "100%" }}
      >
        <div className={styles.ModalContent}>
          <main>
            <header>
              <h1 className={styles.title}>{title}</h1>
            </header>
            <div className={classNames(styles.descriptionWrapper)}>
              {/* Описание: */}
              <p
                className={classNames(styles.description)}
                dangerouslySetInnerHTML={parseBBCode(
                  description.length === 0 ? "Описания нет" : description
                )}
              ></p>
            </div>

            {files.length > 0 && (
              <div className={classNames(styles.files)}>
                Приложенные файлы:
                {
                  images.length > 0 &&
                    // <div style={{ display: "flex", gap: "8px" }}>
                    images.map((image) => (
                      <a
                        key={image.FILE_ID}
                        href={
                          "https://truecode.bitrix24.ru" + image.DOWNLOAD_URL
                        }
                        target="_blank"
                      >
                        <img
                          src={"https://truecode.bitrix24.ru" + image.VIEW_URL}
                          alt={image.NAME}
                        />
                      </a>
                    ))
                  // </div>
                }
                {otherFiles.map((file) => (
                  <a
                    key={file.FILE_ID}
                    href={"https://truecode.bitrix24.ru" + file.DOWNLOAD_URL}
                    target="_blank"
                  >
                    {file.NAME}
                  </a>
                ))}
              </div>
            )}

            <footer className={classNames(styles.footer)}>
              <h3 className={classNames(styles.commentsTitle)}>
                <CommentsIcon></CommentsIcon>
                Комментарии:
              </h3>
              <ul className={classNames(styles.commentItemsWrapper)}>
                {comments.map((comment) => (
                  <li
                    key={comment.ID}
                    className={classNames(styles.commentItem)}
                  >
                    <aside>
                      <Avatar size={48} user={comment.AUTHOR} />
                    </aside>
                    <main className={classNames(styles.commentMain)}>
                      <header>
                        <span className={styles.commentAuthor}>
                          {comment.AUTHOR.name}
                        </span>
                        <span className={styles.commentDate}>
                          {format(new Date(comment.POST_DATE), "y MMMM d")}
                        </span>
                      </header>
                      <p
                        dangerouslySetInnerHTML={parseBBCode(
                          comment.POST_MESSAGE
                        )}
                      ></p>
                    </main>
                  </li>
                ))}
              </ul>
              <AddComment {...task}></AddComment>
            </footer>
          </main>

          <aside className={styles.ModalMeta}>
            <div className={styles.ModalTableWrapper}>
              <MetaTable {...task}></MetaTable>
            </div>
          </aside>
        </div>
      </Scrollbars>
    );
  }

  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{ content: { padding: "0" } }}
    >
      {content}
    </ReactModal>
  );
};

export default ModalViewTask;
