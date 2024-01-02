import { Form, useActionData, useParams } from 'react-router-dom';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import { useEffect, useState } from 'react';
import Modal from '../modal/Modal';
import Typography from '../../typography/Typography';
import { v4 as uuidv4 } from 'uuid';
import Button from '../button/Button';
import CancellableInput from '../cancellable-input/CancellableInput';
import btn from './../button/Button.module.scss';
import taskModal from './TaskModal.module.scss';

interface props {
  modal: Boolean;
  closeModal: () => void;
  taskID: Number;
  columnID: Number;
  taskTitle: string;
  taskDesc: string;
  subtasks: Array<any>;
}
const EditTaskModal = ({
  closeModal,
  modal,
  taskTitle,
  taskDesc,
  subtasks,
  taskID,
  columnID,
}: props) => {
  const [localSubtasks, setLocalSubtasks] = useState<Array<any>>(
    subtasks ? [...subtasks] : []
  );
  const { state } = useAuthContext();
  const { board } = useParams();
  const taskActionData = useActionData();
  let existingBoard = state.user?.boards?.find(
    (obj) => obj.title === board?.split('-').join(' ')
  )
    ? state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      )
    : state.user?.boards?.slice(0, 1)[0];

  useEffect(() => {
    if (taskActionData && taskActionData instanceof Object) {
      closeModal();
    }
  }, [taskActionData]);

  useEffect(() => {
    existingBoard = state.user?.boards?.find(
      (obj) => obj.title === board?.split('-').join(' ')
    )
      ? state.user?.boards?.find(
          (obj) => obj.title === board?.split('-').join(' ')
        )
      : state.user?.boards?.slice(0, 1)[0];
  }, []);

  const addSubtask = () => {
    setLocalSubtasks((state: any) => [
      ...state,
      { name: '', clientID: uuidv4() },
    ]);
  };

  return (
    <Modal
      className={taskModal['edit-task']}
      closeModal={closeModal}
      modal={modal}
    >
      <Form className="" method="put">
        <Typography tag="h2" variant="heading-l">
          Edit Task
        </Typography>
        <input hidden name="formID" defaultValue="edit-task" />
        <input hidden name="taskID" defaultValue={taskID?.toString()} />
        <input hidden name="columnID" defaultValue={columnID?.toString()} />
        <input
          hidden
          name="boardID"
          defaultValue={existingBoard ? existingBoard._id : undefined}
        />
        <fieldset>
          <label>
            <Typography variant="body-m" tag="p">
              Title
            </Typography>
          </label>
          <input
            name="task-title"
            placeholder="e.g. Take coffee break"
            type="text"
            defaultValue={taskTitle}
            required
          />
        </fieldset>
        <fieldset>
          <label>
            <Typography variant="body-m" tag="p">
              Description
            </Typography>
          </label>
          <textarea
            name="task-description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            required
            defaultValue={taskDesc}
          />
        </fieldset>
        <fieldset className={taskModal['subtasks']}>
          <label htmlFor="cancellable-input">
            <Typography variant="body-m" tag="p">
              Subtasks
            </Typography>
          </label>
          {localSubtasks.map((el, index) => {
            return (
              <CancellableInput
                key={el.clientID}
                type="text"
                index={index}
                name={`subtask-${index}`}
                inputList={localSubtasks}
                setInputList={setLocalSubtasks}
                required
                columnID={el.clientID}
                // why is columnID the clientID?
                defaultValue={el.title}
              />
            );
          })}
          <Button
            type="button"
            onClick={addSubtask}
            className={`${btn.btn} ${btn['btn__secondary']}`}
          >
            + Add New Subtasks
          </Button>
        </fieldset>
        <fieldset>
          <label>
            <Typography variant="body-m" tag="p">
              Status
            </Typography>
          </label>
          <select
            title="column-status"
            name="status"
            defaultValue={columnID.toString()}
          >
            {existingBoard?.columns?.map((column: any, index: number) => {
              return (
                <option
                  key={`option-${index}`}
                  title={`option-${index}`}
                  value={column._id}
                >
                  {column.title}
                </option>
              );
            })}
          </select>
        </fieldset>
        <Button type="submit" className={`${btn.btn} ${btn['btn__primary']}`}>
          Save Changes
        </Button>
      </Form>
    </Modal>
  );
};

export default EditTaskModal;
