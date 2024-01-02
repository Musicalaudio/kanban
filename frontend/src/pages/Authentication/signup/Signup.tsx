import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../../components/button/Button';
import Typography from '../../../typography/Typography';
import styles from '../Authentication.module.scss';
import { useEffect, useState } from 'react';
import typography from '../../../typography/typography.module.scss';
import btn from '../../../components/button/Button.module.scss';
const Signup = () => {
  const navigation = useNavigation();
  const [usernameError, setUsernameError] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();
  const actionData: any = useActionData();
  useEffect(() => {
    console.log('TESTING');
    if (actionData && actionData instanceof Object) {
      return;
    } else {
      let newError = actionData ? JSON.parse(actionData?.slice(7).trim()) : '';
      if (newError['usernameError']) {
        setUsernameError(newError['usernameError']);
        setEmailError(undefined);
        setPasswordError(undefined);
      } else if (newError['emailError']) {
        setEmailError(newError['emailError']);
        setUsernameError(undefined);
        setPasswordError(undefined);
      } else if (newError['passwordError']) {
        setPasswordError(newError['passwordError']);
        setUsernameError(undefined);
        setEmailError(undefined);
      }
    }
  }, [actionData]);
  return (
    <>
      <Typography tag="h1" variant="heading-xl">
        Create an account
      </Typography>

      <Form method="post" className={`${styles.signup__form}`} replace>
        <fieldset>
          <label className={typography['body-m']}>
            <Typography tag="p" variant="body-m">
              Username{' '}
            </Typography>
            <span className={`${styles['label-error']}`}>
              {usernameError ? `${usernameError}` : ''}
            </span>
          </label>
          <input
            type="username"
            name="username"
            placeholder="Username"
            required
          />
        </fieldset>
        <fieldset>
          <label className={typography['body-m']}>
            <Typography tag="p" variant="body-m">
              Email{' '}
            </Typography>
            <span className={`${styles['label-error']}`}>
              {emailError ? `${emailError}` : ''}
            </span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
          ></input>
        </fieldset>
        <fieldset>
          <label className={typography['body-m']}>
            <Typography tag="p" variant="body-m">
              Password{' '}
            </Typography>
            <span className={`${styles['label-error']}`}>
              {passwordError ? `${passwordError}` : ''}
            </span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </fieldset>
        <Button className={`${btn['btn']} ${btn['btn__primary']}`}>
          {navigation.state === 'submitting' ? 'Processing' : 'Sign Up'}
        </Button>
      </Form>
      <p>
        Already have an account?&nbsp;
        <Link to="../login">Sign in</Link>
      </p>
    </>
  );
};

export default Signup;
