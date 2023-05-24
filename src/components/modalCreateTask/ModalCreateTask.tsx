import React from "react";
import ReactModal from "react-modal";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createTask } from "../../store/tasksSlice/tasks.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./ModalCreateTask.module.css";
import MyButton from "../button/Button";
import MyInput from "../input/Input";
import classNames from "classnames";
import MyTextarea from "../textarea/Textarea";
import MySelect from "../select/Select";
import Preloader from "../preloader/Preloader";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { getMsg } from "../../global/msg";

export interface IModalCreateTaskProps {
  isModalOpen: boolean;
  closeModal: () => void;
  idProject: string;
}
interface IFormInputs {
  title: string;
  description: string;
  responsibleId: number | undefined;
}

const ModalCreateTask: React.FC<IModalCreateTaskProps> = ({
  idProject,
  isModalOpen,
  closeModal,
}) => {
  const { users, usersFetchStatus } = useAppSelector((state) => state.users);
  const { createTaskFetchStatus } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const submitTitle = "Отправить";
  const { register, handleSubmit, watch, control, reset } =
    useForm<IFormInputs>();

  React.useEffect(() => {
    if (createTaskFetchStatus === "FULFILLED") {
      closeModal();
    }
  }, [createTaskFetchStatus]);

  const handleAddTask: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    dispatch(
      createTask({
        projectId: +idProject!,
        title: data.title,
        description: data.description,
        responsibleId: data.responsibleId,
      })
    );
    reset({
      description: "",
      title: "",
    });
  };

  const alertMsg = getMsg("createTaskErrorMsg");
  const addModalTitle = getMsg("addModalTitle");
  const responsibleMsg = getMsg("responcible");
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
    >
      <header>
        <h1 className={classNames(styles.title)}>{addModalTitle}</h1>
      </header>
      {createTaskFetchStatus === "REJECTED" && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{alertMsg}</AlertTitle>
        </Alert>
      )}
      {createTaskFetchStatus !== "PENDING" ? (
        <form onSubmit={handleSubmit(handleAddTask)} className={styles.form}>
          <Controller
            control={control}
            name="title"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <MyInput
                placeholder="Название задачи"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <MyTextarea
                placeholder="Описание задачи"
                value={value}
                onChange={onChange}
                rows={4}
              />
            )}
          />

          <label
            htmlFor="responsible"
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            {responsibleMsg}
            <Controller
              control={control}
              name="responsibleId"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <MySelect id="responsible" value={value} onChange={onChange}>
                  {users.map((u) => (
                    <option value={u.id} key={u.id}>
                      {u.name}
                    </option>
                  ))}
                </MySelect>
              )}
            />
          </label>
          <MyButton type="submit" MyTitle={submitTitle} />
        </form>
      ) : (
        <Preloader />
      )}
    </ReactModal>
  );
};

export default ModalCreateTask;
