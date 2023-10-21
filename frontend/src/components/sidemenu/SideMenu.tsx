import { Link } from 'react-router-dom';
import logoLight from '../../../assets/logo-dark.svg';
import styles from './SideMenu.module.scss';
import ThemeSelector from './ThemeSelector';
import Button from '../button/Button';
import { NavLink } from 'react-router-dom';

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
            {/* can we use isActive with a data-attribute instead if we want to? */}
            {/* <NavLink to="/:dashboard" className={({isActive}) => isActive? "active-dashboard" : null}> */}
            <Button>Perform Launch</Button>
            {/* </NavLink> */}
          </li>
          <li>
            {/* <NavLink> */}
            <Button>Marketing Plan</Button>
            {/* </NavLink> */}
          </li>
          <li>
            {/* <NavLink> */}
            <Button>Perform Launch</Button>
            {/* </NavLink> */}
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
