import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Typography from '../../../typography/Typography';

const Login = () => {
  const navigation = useNavigation();
  const errorMessage = useActionData();

  return (
    <>
      <Typography tag="h1" variant="xl">
        Sign in to your account
      </Typography>
      {errorMessage && (
        <Typography tag="p" variant="s">
          errorMessage
        </Typography>
      )}
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
        <Button>
          {navigation.state === 'submitting' ? 'Logging in...' : 'Log in'}
        </Button>
      </Form>
      <p>
        <a href="">Forgot your password?</a>
      </p>
      <p>
        Don't have an account yet?&nbsp;
        <Link to="../signup">Sign up.</Link>
      </p>
    </>
  );
};

export default Login;
