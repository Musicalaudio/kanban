import { Form, Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Typography from '../../../typography/Typography';

const Signup = () => {
  return (
    <>
      <Typography tag="h1" variant="xl">
        Create an account
      </Typography>
      <Form method="post" className="signup__form" replace>
        <input
          type="username"
          name="username"
          placeholder="Username"
          required
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button>Sign Up</Button>
      </Form>
      <p>
        Already have an account?&nbsp;
        <Link to="../login">Sign up</Link>
      </p>
    </>
  );
};

export default Signup;
