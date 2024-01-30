import Button from '../../components/button/Button';
import Typography from '../../typography/Typography';

const Guest = () => {
  return (
    <>
      <Typography tag="h2" variant="heading-xl">
        Want to just try it out?
      </Typography>
      <Typography tag="p" variant="heading-s">
        If you just want to play around and see what's possible without the
        hassle of creating an account, you can continue without logging in.
      </Typography>
      <Typography tag="p" variant="heading-s">
        <span>Warning:</span> if you this, we will use local storage in your
        browser to save, so if this is cleared then your progress will be
        deleted.
      </Typography>
      <Button>Continue as Guest</Button>
    </>
  );
};

export default Guest;
