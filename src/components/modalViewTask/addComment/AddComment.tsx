import classNames from "classnames";
import React from "react";
import MyButton from "../../button/Button";
import MyTextarea from "../../textarea/Textarea";
import styles from "./AddComment.module.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { addComment } from "../../../store/tasksSlice/tasks.slice";
import { ITaskWithComments } from "../../../types/dto.types";
import Preloader from "../../preloader/Preloader";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface IFormInputs {
  commentText: string;
}

const AddComment: React.FC<ITaskWithComments> = ({ id }) => {
  const { register, handleSubmit, watch, reset, control } =
    useForm<IFormInputs>();
  const dispatch = useAppDispatch();
  const { addCommentFetchStatus } = useAppSelector((state) => state.tasks);

  const handleAddComment: SubmitHandler<IFormInputs> = (data) => {
    dispatch(
      addComment({
        POST_MESSAGE: data.commentText,
        taskId: id,
      })
    );
    reset({ commentText: "" });
  };
  return (
    <form
      className={styles.addComment}
      onSubmit={handleSubmit(handleAddComment)}
    >
      <h3 className={classNames(styles.title)}>Добавить комментарий</h3>
      {addCommentFetchStatus === "REJECTED" && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Не удалось создать комментарий</AlertTitle>
        </Alert>
      )}
      {addCommentFetchStatus !== "PENDING" ? (
        <>
          <Controller
            control={control}
            name="commentText"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <MyTextarea
                placeholder="Текст комментария"
                rows={5}
                value={value}
                onChange={onChange}
              />
            )}
          />

          <MyButton type="submit" MyTitle="Добавить"></MyButton>
        </>
      ) : (
        <Preloader></Preloader>
      )}
    </form>
  );
};

export default AddComment;
