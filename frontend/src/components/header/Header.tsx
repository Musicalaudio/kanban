import Typography from '../../typography/Typography';
import Button from '../button/Button';
import VerticalEllipses from '../../../assets/icon-vertical-ellipsis.svg';
import styles from './Header.module.scss';
import { useState } from 'react';
import Dropdown from '../dropdown/Dropdown';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <header className={styles.header}>
      <Typography variant="xl" tag="h1">
        Platform Launch
      </Typography>
      <div className={styles.header__btns}>
        <Button>Add New Task</Button>
        <button onClick={() => setOpenDropdown(!openDropdown)}>
          <img alt="Edit/Delete Board Dropdown" src={VerticalEllipses} />
        </button>
        <Dropdown openDropdown={openDropdown} className="header__dropdown">
          <Button>Edit Board</Button>
          <Button>Delete Board</Button>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
