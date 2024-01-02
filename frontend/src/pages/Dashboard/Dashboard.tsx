import Typography from '../../typography/Typography';
import Column from './Column';
import Task from '../../components/tasks/Task';
import styles from './Dashboard.module.scss';
import { useParams } from 'react-router-dom';
import useAuthContext from '../Authentication/useAuthContext';
import axios from 'axios';

interface props {
  openEditModal: Function;
}

const Dashboard = ({ openEditModal }: props) => {
  const { board } = useParams();
  const { state, dispatch } = useAuthContext();

  const existingBoard = state.user?.boards?.find(
    (obj) => obj.title === board?.split('-').join(' ')
  )
    ? state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      )
    : state.user?.boards?.slice(0, 1)[0];

  const handleOnDrag = (
    e: React.DragEvent,
    boardID: string,
    oldColumnID: string,
    taskID: string
  ) => {
    e.dataTransfer.setData('board', boardID);
    e.dataTransfer.setData('task', taskID);
    e.dataTransfer.setData('oldColumn', oldColumnID);
  };

  const handleOnDrop = async (e: React.DragEvent, newColumnID: string) => {
    const taskID = e.dataTransfer.getData('task') as string;
    const oldColumnID = e.dataTransfer.getData('oldColumn') as string;
    const boardID = e.dataTransfer.getData('board') as string;

    let id = taskID;
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER}/boards/move-task/${id}`,
      {
        taskID: taskID,
        oldColumnID: oldColumnID,
        newColumnID: newColumnID,
        boardID: boardID,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    // make api call to server to change columns
    console.log(res);

    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(JSON.stringify(res.data) || '{}'),
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {existingBoard &&
        existingBoard.columns.map((column: any, index: number) => {
          return (
            <Column
              key={`column-${index}`}
              title={column.title}
              handleOnDrop={(e: React.DragEvent) => {
                handleOnDrop(e, column._id.toString());
              }}
              handleOnDragOver={handleDragOver}
              className={styles['column']}
            >
              {column.tasks.map((task: any, index: number) => {
                return (
                  <Task
                    key={`task-${index}`}
                    taskTitle={task?.title}
                    taskDesc={task?.description}
                    subtasks={task?.subtasks}
                    columnID={column._id}
                    taskID={task?._id}
                    taskStatus={column.title}
                    handleOnDrag={(e: React.DragEvent) =>
                      handleOnDrag(
                        e,
                        existingBoard._id.toString(),
                        column._id.toString(),
                        task._id.toString()
                      )
                    }
                  />
                );
              })}
            </Column>
          );
        })}
      <section
        onClick={() => openEditModal(true)}
        className={`${styles['new-column']} new-column`}
        key={'dashboard-new-column' + openEditModal.toString()}
      >
        <Typography
          tag="h3"
          variant="heading-l"
          className={styles['new-column']}
        >
          + New Column
        </Typography>
      </section>
    </>
  );
};

export default Dashboard;
