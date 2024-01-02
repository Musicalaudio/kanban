import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import SideMenu from '../../components/sidemenu/SideMenu';
import { useActionData, useLoaderData, useParams } from 'react-router';
import useAuthContext from '../Authentication/useAuthContext';
import DashboardLayout from '../Dashboard/DashboardLayout';
import EditBoard from '../../components/edit-board/EditBoard';
import styles from './Layout.module.scss';

const Layout = () => {
  const user: any = useLoaderData();
  const [editModal, setEditModal] = useState(false);
  const { state, dispatch } = useAuthContext();
  const { board } = useParams();
  const actionData = useActionData();
  const columns = state.user?.boards?.find(
    (obj) => obj.title === board?.split('-').join(' ')
  )
    ? state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      ).columns
    : state.user?.boards?.slice(0, 1)[0].columns;

  useEffect(() => {}, [actionData]);

  // On mount, set global user state to the value we have stored in local storage for users
  useEffect(() => {
    console.log(`THIS IS THE USER ${user}`);
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(JSON.stringify(user) || '{}'),
    });
  }, []);

  // console.log('COLUMNS: ', columns);

  return (
    <div className={styles.layout}>
      <Header openEditModal={setEditModal} className={styles.header} />
      <main className={styles.main}>
        <SideMenu notDropdown={true} />
        <DashboardLayout openEditModal={setEditModal} />
      </main>
      <EditBoard
        modal={editModal}
        closeModal={() => setEditModal(false)}
        columns={columns}
      />
    </div>
  );
};

export default Layout;
