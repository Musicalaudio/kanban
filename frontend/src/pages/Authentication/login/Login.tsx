import { Form, Link } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Typography from '../../../typography/Typography';

const Login = () => {
  return (
    <>
      <Typography tag="h1" variant="xl">
        Sign in to your account
      </Typography>
      <Form method="post" className="login__form" replace>
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
        ></input>
        <Button>Log in</Button>
      </Form>
      <p>
        Don't have an account yet?&nbsp;
        <Link to="../signup">Sign up.</Link>
      </p>
    </>
  );
};

export default Login;
