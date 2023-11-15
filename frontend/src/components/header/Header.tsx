import Typography from '../../typography/Typography';
import Button from '../button/Button';
import VerticalEllipses from '../../../assets/icon-vertical-ellipsis.svg';
import styles from './Header.module.scss';
import { useState } from 'react';
import Dropdown from '../dropdown/Dropdown';
import DeleteBoard from '../delete-board/DeleteBoard';
import EditBoard from '../edit-board/EditBoard';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

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
          <Button onClick={() => setEditModal(true)}>Edit Board</Button>
          <Button onClick={() => setDeleteModal(true)}>Delete Board</Button>
        </Dropdown>
        <EditBoard modal={editModal} closeModal={() => setEditModal(false)} />
        <DeleteBoard
          modal={deleteModal}
          closeModal={() => setDeleteModal(false)}
        />
      </div>
    </header>
  );
};

export default Header;
