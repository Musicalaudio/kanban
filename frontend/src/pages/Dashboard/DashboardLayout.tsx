import styles from './Dashboard.module.scss';
import DashboardEmpty from './DashboardEmpty';
import useAuthContext from '../Authentication/useAuthContext';
import Dashboard from './Dashboard';
import { useParams } from 'react-router-dom';

interface props {
  openEditModal?: Function;
  className?: string;
}

const DashboardLayout = (props: props) => {
  const { state } = useAuthContext();
  const { board } = useParams();

  let columns = state.user?.boards?.find(
    (obj: any) => obj.title === board?.split('-').join(' ')
  )
    ? state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      ).columns
    : state.user?.boards?.slice(0, 1)[0].columns;
  return (
    <section
      className={`${styles.dashboard}`}
      data-columns={
        state.user?.boards?.length !== undefined && columns.length > 0
          ? 'columns'
          : 'empty'
      }
    >
      {state.user?.boards?.length !== undefined && columns.length > 0 ? (
        <Dashboard openEditModal={props.openEditModal} />
      ) : (
        <DashboardEmpty openEditModal={props.openEditModal} />
      )}
    </section>
  );
};

export default DashboardLayout;
