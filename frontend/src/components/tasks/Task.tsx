import { useState } from 'react';
import Typography from '../../typography/Typography';
import styles from '../../pages/Dashboard/Dashboard.module.scss';
import TaskModal from './TaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import EditTaskModal from './EditTaskModal';

interface props {
  taskOrder?: Number;
  taskTitle: string;
  taskDesc: string;
  taskStatus: string;
  subtasks: Array<any>;
  columnID: Number;
  taskID: Number;
  handleOnDrag: (e: React.DragEvent) => void;
}

const Task = ({
  taskTitle,
  taskDesc,
  subtasks,
  columnID,
  taskID,
  handleOnDrag,
}: props) => {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  return (
    <>
      <div
        draggable="true"
        // onDragStart={(e) => handleOnDrag(e, taskOrder.toString())}
        // https://www.youtube.com/watch?v=u65Y-vqYNAk
        className={styles.task}
        onClick={() => setModal(true)}
        onDragStart={handleOnDrag}
      >
        <Typography tag="h4" variant="heading-m">
          {taskTitle}
        </Typography>
        <Typography variant="body-m" tag="p">
          {
            subtasks?.filter((subtask: any) => subtask?.complete === true)
              .length
          }{' '}
          of {subtasks?.length} subtasks
        </Typography>
      </div>
      <TaskModal
        modal={modal}
        closeModal={() => setModal(false)}
        taskTitle={taskTitle}
        taskDesc={taskDesc}
        subtasks={subtasks}
        columnID={columnID}
        taskID={taskID}
        openEditTaskModal={() => setEditModal(true)}
        openDeleteTaskModal={() => setDeleteModal(true)}
        key={'taskModal' + modal.toString()}
      />
      <DeleteTaskModal
        modal={deleteModal}
        closeModal={() => setDeleteModal(false)}
        taskTitle={taskTitle}
        taskID={taskID}
        columnID={columnID}
      />
      <EditTaskModal
        closeModal={() => setEditModal(false)}
        taskTitle={taskTitle}
        modal={editModal}
        taskID={taskID}
        subtasks={subtasks}
        columnID={columnID}
        taskDesc={taskDesc}
        key={'editModal' + editModal.toString()}
      />
    </>
  );
};

export default Task;
