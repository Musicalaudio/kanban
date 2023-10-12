import Typography from '../../typography/Typography';
import Button from '../button/Button';
import VerticalEllipses from '../../../assets/icon-vertical-ellipsis.svg';

const Header = () => {
  return (
    <header>
      <Typography variant="xl" tag="h1">
        Platform Launch
      </Typography>
      <div>
        <Button>Add New Task</Button>
        <button>
          <img alt="Edit/Delete Board Dropdown" src={VerticalEllipses} />
        </button>
      </div>
    </header>
  );
};

export default Header;
