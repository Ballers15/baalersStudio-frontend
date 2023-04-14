import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import NavigationRouter from './Routes';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { buildAbilityFor } from '../src/Components/rolesBasedAccessControl/ability';
import { AbilityContext } from '../src/Components/rolesBasedAccessControl/Can';

function App() {
  const user = useSelector(state => state.user.user);
  const _u = JSON.parse(user)
  const ability = buildAbilityFor(_u?.user?.role);

return (
    <React.Fragment>
      <ToastContainer autoClose={2500} theme="colored" />
    <AbilityContext.Provider value={ability}>
    <NavigationRouter />
    </AbilityContext.Provider>


 </React.Fragment>
  );
}

export default App;
