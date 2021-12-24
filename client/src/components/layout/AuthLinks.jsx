import React, { Fragment } from 'react';
import {connect} from 'react-redux';

import { NavItem } from 'reactstrap';
import Logout from '../auth/Logout';
import TaskModal from '../tasks/TaskModal';

const AuthLinks = ({user}) => {
  return (
    <Fragment>
      <NavItem>
        <span className='navbar-text mr-1'>
          <strong>{user ? `${user.name}` : null}</strong>
        </span>
      </NavItem>
      <NavItem><TaskModal/></NavItem>
      <NavItem className='mr-2'>
        <Logout />
      </NavItem>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AuthLinks);