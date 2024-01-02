import Typography from '../../typography/Typography';
import Button from '../button/Button';
import VerticalEllipses from '../../../assets/icon-vertical-ellipsis.svg';
import styles from './Header.module.scss';
import { useContext, useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import DeleteBoard from '../delete-board/DeleteBoard';
import { useParams } from 'react-router';
import AddTaskModal from '../tasks/AddTaskModal';
import dropdown from '../dropdown/Dropdown.module.scss';
import btn from '../button/Button.module.scss';
import { Link } from 'react-router-dom';
import logoDark from '../../../assets/logo-light.svg';
import logoLight from '../../../assets/logo-dark.svg';
import { ThemeContext } from '../../context/ThemeContext';
import logoMobile from '../../../assets/logo-mobile.svg';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import addTaskButton from '../../../assets/icon-add-task-mobile.svg';
import SideMenu from '../../components/sidemenu/SideMenu';
import dropdownDownIcon from '../../../assets/icon-chevron-down.svg';
import sidemenuStyles from '../../components/sidemenu/SideMenu.module.scss';
import LogoutBoard from '../logout/LogoutBoard';
interface props {
  openEditModal: Function;
  className?: string;
}

const Header = ({ openEditModal }: props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { board } = useParams();
  const { state } = useAuthContext();
  const themeContext = useContext(ThemeContext);
  const [toggleDropdownMenu, setToggleDropdownMenu] = useState(false);

  let columns = state.user?.boards?.find(
    (obj: any) => obj.title === board?.split('-').join(' ')
  )
    ? state.user?.boards?.find(
        (obj) => obj.title === board?.split('-').join(' ')
      ).columns
    : state.user?.boards?.slice(0, 1)[0].columns;

  const handleEditBoard = () => {
    openEditModal(true);
    setOpenDropdown(false);
  };
  const handleDeleteBoard = () => {
    setDeleteModal(true);
    setOpenDropdown(false);
  };
  const handleLogoutBoard = () => {
    setLogoutModal(true);
    setOpenDropdown(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles['header__logo']}>
        <Link to="/dashboard">
          <picture>
            <source
              srcSet={themeContext?.theme === 'light' ? logoLight : logoDark}
              media="(min-width: 48rem)"
            />
            <img src={logoMobile} alt="Kanban Logo" />
          </picture>
        </Link>
      </div>
      <div className={styles.header__main}>
        <Typography variant="heading-xl" tag="h1">
          {board?.split('-').join(' ') ||
            state.user?.boards?.slice(0, 1)[0].title}
        </Typography>
        <div className={sidemenuStyles['sidemenu__header']}>
          <img
            className={`${sidemenuStyles['dropdownButton']}`}
            src={dropdownDownIcon}
            alt="button to expand dropdown"
            data-toggled={toggleDropdownMenu ? 'true' : 'false'}
            onClick={() => {
              setToggleDropdownMenu(!toggleDropdownMenu);
            }}
          />
          <SideMenu
            notDropdown={false}
            toggleDropdownMenu={toggleDropdownMenu}
          />
        </div>
        <div className={styles.header__btns}>
          <Button
            onClick={() => setAddTask(!addTask)}
            className={`${styles['add-task__button']} ${btn.btn} ${btn['btn__primary--l']}`}
            disabled={!(columns?.length > 0)}
          >
            <p>Add New Task</p>

            <img src={addTaskButton} alt="add task button" />
          </Button>
          <div className={dropdown.dropdown}>
            <Button
              onClick={() => setOpenDropdown(!openDropdown)}
              className={dropdown['dropdown-menu__btn']}
            >
              <img alt="Edit/Delete Board Dropdown" src={VerticalEllipses} />
            </Button>
            <Dropdown
              openDropdown={openDropdown}
              setDropdown={setOpenDropdown}
              className={dropdown['dropdown-menu']}
            >
              <Button onClick={handleEditBoard}>Edit Board</Button>
              <Button onClick={handleDeleteBoard}>Delete Board</Button>
              <Button onClick={handleLogoutBoard}>Log out</Button>
            </Dropdown>
          </div>
        </div>
        <AddTaskModal
          modal={addTask}
          closeModal={() => setAddTask(false)}
          key={addTask.toString()}
        />
        <DeleteBoard
          modal={deleteModal}
          closeModal={() => setDeleteModal(false)}
        />
        <LogoutBoard
          modal={logoutModal}
          closeModal={() => setLogoutModal(false)}
        />
      </div>
    </header>
  );
};

export default Header;
