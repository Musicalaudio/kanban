import { redirect } from 'react-router';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useIsAuthenticated from './useIsAuthenticated';
export default async function authLoader() {
  const loggedIn = useIsAuthenticated();

  if (!loggedIn) {
    // console.log(loggedIn);
    throw redirect('/login');
  }

  return null;
}
