import { Link } from 'react-router-dom';
import logoLight from '../../../assets/logo-dark.svg';
import CreateBoardButton from './CreateBoardButton';
import BoardTab from './BoardTab';
import styles from './SideMenu.module.scss';
import ThemeSelector from './ThemeSelector';
import Button from '../button/Button';

const SideMenu = () => {
  return (
    <nav className={styles.sidemenu}>
      {/* <Link to="/"> */}
      <img src={logoLight} alt="Kanban Logo" />
      {/* </Link> */}
      {/* insert jsx to get number of boards in the brackets */}
      <section className={styles.sidemenu__nav}>
        <p>All Boards ({})</p>
        <ul className={styles.sidemenu__ul}>
          {/* {create map to loop through date and return <li><BoardTab>...</BoardTab></li>} */}
          {/* should we instead pass the button to boardtab like <BoardTab button={<Button>Perform Launch</Button>} */}
          <li>
            <Button>Perform Launch</Button>
          </li>
          <li>
            <Button>Marketing Plan</Button>
          </li>
          <li>
            <Button>Perform Launch</Button>
          </li>
        </ul>
        <Button>+ Create New Board</Button>
      </section>
      <div>
        <ThemeSelector />
        <Button>Hide Sidebar</Button>
      </div>
    </nav>
  );
};

export default SideMenu;
