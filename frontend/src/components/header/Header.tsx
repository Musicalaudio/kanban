import Typography from '../../typography/Typography';
import Button from '../button/Button';
import VerticalEllipses from '../../../assets/icon-vertical-ellipsis.svg';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={`flex ${styles.header}`}>
      <Typography variant="xl" tag="h1">
        Platform Launch
      </Typography>
      <div className={styles.header__btns}>
        <Button>Add New Task</Button>
        <button>
          <img alt="Edit/Delete Board Dropdown" src={VerticalEllipses} />
        </button>
      </div>
    </header>
  );
};

export default Header;
