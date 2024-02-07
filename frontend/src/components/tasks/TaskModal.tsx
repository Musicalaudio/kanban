import { Form, useActionData, useParams } from 'react-router-dom';
import Typography from '../../typography/Typography';
import Modal from '../modal/Modal';
import { ChangeEvent, useEffect, useState } from 'react';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import Dropdown from '../dropdown/Dropdown';
import Button from '../button/Button';
import VerticalEllipses from '../../../assets/icon-vertical-ellipsis.svg';
import styles from '../modal/Modal.module.scss';
import dropdown from '../dropdown/Dropdown.module.scss';
import taskmodal from '../tasks/TaskModal.module.scss';
import btn from '../button/Button.module.scss';
interface props {
  closeModal: () => void;
  openDeleteTaskModal: () => void;
  openEditTaskModal: () => void;
  modal: Boolean;
  taskTitle: string;
  taskDesc: string;
  subtasks: Array<any>;
  columnID: Number;
  taskID: Number;
}

const TaskModal = ({
  closeModal,
  modal,
  taskTitle,
  taskDesc,
  subtasks,
  columnID,
  taskID,
  openDeleteTaskModal,
  openEditTaskModal,
}: props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { state } = useAuthContext();
  const { board } = useParams();
  const actionData = useActionData();
  const [localSubtasks, setLocalSubtasks] = useState(
    subtasks ? [...subtasks] : []
  );

  let existingBoard = state.user?.boards?.find(
    (obj) => obj.title === board?.split('-').join(' ')
  )
    ? state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      )
    : state.user?.boards?.slice(0, 1)[0];

  useEffect(() => {
    existingBoard = state.user?.boards?.find(
      (obj) => obj.title === board?.split('-').join(' ')
    )
      ? state.user?.boards?.find(
          (obj) => obj.title === board?.split('-').join(' ')
        )
      : state.user?.boards?.slice(0, 1)[0];
  }, [board]);

  const handleDelete = () => {
    openDeleteTaskModal();
    closeModal();
    setOpenDropdown(false);
  };
  const handleEdit = () => {
    openEditTaskModal();
    closeModal();
    setOpenDropdown(false);
  };

  useEffect(() => {
    if (actionData && actionData instanceof Object) {
      closeModal();
    }
  }, [actionData]);

  const handleChecked = (e: ChangeEvent<HTMLInputElement>, el: any) => {
    e.preventDefault;
    let copySubtasks = [...subtasks];

    copySubtasks.forEach((subtasks: any) => {
      if (subtasks._id === el._id) {
        e.target.value = subtasks._id;
        subtasks.complete = !subtasks.complete;
      }
    });
    setLocalSubtasks(copySubtasks);
    console.log(localSubtasks);
  };
  return (
    <Modal closeModal={closeModal} modal={modal}>
      <Form method="post">
        <div className={styles['modal__header-section']}>
          <Typography tag="h2" variant="heading-l">
            {taskTitle}
          </Typography>
          <div className={dropdown.dropdown}>
            <Button
              onClick={() => setOpenDropdown(!openDropdown)}
              type="button"
              className={dropdown['dropdown-menu__btn']}
            >
              <img alt="Edit/Delete Board Dropdown" src={VerticalEllipses} />
            </Button>
            <Dropdown openDropdown={openDropdown} setDropdown={setOpenDropdown}>
              <Button type="button" onClick={handleEdit}>
                Edit Task
              </Button>
              <Button type="button" onClick={handleDelete} className="red-text">
                Delete Task
              </Button>
            </Dropdown>
          </div>
        </div>

        <input hidden name="formID" defaultValue="save-task-modal" />
        <input
          hidden
          name="boardID"
          defaultValue={existingBoard ? existingBoard._id : undefined}
        />
        <input
          hidden
          name="columnID"
          defaultValue={columnID ? columnID.toString() : undefined}
        />
        <input
          hidden
          name="taskID"
          defaultValue={taskID ? taskID.toString() : undefined}
        />
        <Typography tag="p" variant="body-l">
          {taskDesc}
        </Typography>
        <fieldset className={taskmodal['subtasks']}>
          <label htmlFor="cancellable-input" title="subtask-label">
            <Typography variant="body-m" tag="p">
              Subtasks (
              {
                localSubtasks?.filter(
                  (subtask: any) => subtask.complete === true
                ).length
              }{' '}
              out of {subtasks?.length})
            </Typography>
          </label>
          {subtasks?.map((el: any, index: number) => {
            return (
              <div key={index} className={styles['checkbox']}>
                <input
                  onChange={(e) => handleChecked(e, el)}
                  type="checkbox"
                  name={`subtask-${index}`}
                  defaultChecked={el.complete}
                  className={styles['checkbox__input']}
                />
                <label
                  htmlFor="subtask"
                  className={styles['checkbox__label']}
                  title={`checkbox__label--${index}`}
                >
                  <Typography tag="p" variant="body-m">
                    {el.title}
                  </Typography>
                </label>
              </div>
            );
          })}
        </fieldset>
        <fieldset>
          <label
            htmlFor="column-status"
            className="select-label"
            title="select-label"
          >
            <Typography variant="body-m" tag="p">
              Current Status
            </Typography>
          </label>
          <select
            title="column-status"
            id="column-status"
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
        <button
          type="submit"
          // onClick={closeModal}
          className={`${btn.btn} ${btn['btn__primary']}`}
        >
          Save and Close
        </button>
      </Form>
    </Modal>
  );
};

export default TaskModal;
