import { Link } from 'react-router-dom';
import logoLight from '../../../assets/logo-light.svg';
import CreateBoardButton from './CreateBoardButton';
import BoardTab from './BoardTab';

const SideMenu = () => {
  return (
    <nav>
      {/* <Link to="/"> */}
      <img src={logoLight} alt="Kanban Logo" />
      {/* </Link> */}
      {/* insert jsx to get number of boards in the brackets */}
      <section>
        <p>All Boards ({})</p>
        <ul>
          {/* {create map to loop through date and return <li><BoardTab>...</BoardTab></li>} */}
          <li>
            <BoardTab>Perform Launch</BoardTab>
          </li>
          <li>
            <BoardTab>Marketing Plan</BoardTab>
          </li>
          <li>
            <BoardTab>Perform Launch</BoardTab>
          </li>
        </ul>
      </section>
      <CreateBoardButton />
    </nav>
  );
};

export default SideMenu;
