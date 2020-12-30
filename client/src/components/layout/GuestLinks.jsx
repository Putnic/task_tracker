import React, { Fragment } from 'react';

import { NavItem } from 'reactstrap';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';

const GuestLinks = (props) => {
  return (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal onExit={console.log('onExit')} onEnter={console.log('onEnter')} />
      </NavItem>
    </Fragment>
  );
}

export default GuestLinks;