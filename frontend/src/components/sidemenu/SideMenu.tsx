import styles from './SideMenu.module.scss';
import ThemeSelector from './ThemeSelector';
import Button from '../button/Button';
import CreateNewBoard from '../board/CreateNewBoard';
import { useState } from 'react';
import useAuthContext from '../../pages/Authentication/useAuthContext';
import { NavLink } from 'react-router-dom';
import btn from './../button/Button.module.scss';
import hideSidebar from '../../../assets/icon-hide-sidebar.svg';
import boardIcon from '../../../assets/icon-board.svg';
import themeSelector from './ThemeSelector.module.scss';
import Typography from '../../typography/Typography';

interface props {
  notDropdown: Boolean;
  toggleDropdownMenu?: Boolean;
}

const SideMenu = ({ notDropdown, toggleDropdownMenu }: props) => {
  const [modal, setModal] = useState(false);
  const { state } = useAuthContext();
  const [isHidden, setIsHidden] = useState(false);
  // const actionData = useActionData();
  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      <nav
        className={`${styles['sidemenu']} ${
          isHidden ? styles['sidemenu--hidden'] : ''
        } ${notDropdown ? styles['notDropdown'] : ''}`}
        data-dropdown={!notDropdown && toggleDropdownMenu ? 'true' : 'false'}
      >
        {/* insert jsx to get number of boards in the brackets */}
        <div className={`${styles['sidemenu__nav']} `}>
          <section>
            <Typography
              className={`${styles['title']} sidemenu__title`}
              tag="p"
              variant="body-l"
            >
              All Boards ({state.user?.boards?.length})
            </Typography>
            <ul className={styles.sidemenu__ul}>
              {state.user?.boards?.map((board) => (
                <li key={board.title}>
                  <NavLink
                    to={`/dashboard/${board.title.split(' ').join('-')}`}
                    className={({ isActive }) =>
                      isActive ? `${styles['active-link']} active-link` : ''
                    }
                  >
                    <Button
                      className={`${btn.btn} ${btn['btn__primary--l']} ${styles['sidemenu__btn']}`}
                    >
                      <img src={boardIcon} alt="board icon" />
                      {board.title}
                    </Button>
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button
              onClick={() => openModal()}
              className={`${btn.btn} ${btn['btn__primary--l']} ${styles['sidemenu__create-board']} ${styles['sidemenu__btn']}`}
            >
              <img src={boardIcon} alt="board icon" />+ Create New Board
            </Button>
            <CreateNewBoard
              closeModal={closeModal}
              modal={modal}
              key={closeModal.toString()}
            />
          </section>
          <div>
            <ThemeSelector
              className={themeSelector['theme-selector']}
              dataDropdown={toggleDropdownMenu ? 'true' : 'false'}
            />
            <Button
              className={`${btn.btn} ${btn['btn__primary--l']} ${styles['sidemenu__tabs']} ${styles['sidemenu__btn']} ${styles['toggle-menu-btn']}`}
              onClick={() => setIsHidden(!isHidden)}
              data-dropdown={toggleDropdownMenu ? 'true' : 'false'}
            >
              <img src={hideSidebar} alt="click to expand side-menu" />
              Hide Sidebar
            </Button>
          </div>
        </div>
      </nav>
      <Button
        className={`${styles['show-menu-btn']} ${btn['btn__primary']} ${
          isHidden ? '' : styles['sidemenu--hidden']
        }`}
        data-dropdown={toggleDropdownMenu ? 'true' : 'false'}
        onClick={() => setIsHidden(!isHidden)}
      ></Button>
    </>
  );
};

export default SideMenu;
