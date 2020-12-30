import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Greeting = (props) => {
  const {errorMsg, errorId} = props;
  return (
    <Fragment>
      {errorMsg && errorId !== 'LOGIN_FAIL' && errorId !== 'REGISTER_FAIL' ? (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>          
      ) : null}
      <div className="alert alert-secondary" role="alert">
        <p>To get started with the Task Manager, You need to register.</p>
        <p>If You are already registered, then log in by entering Your email and password.</p>
        <p>Good luck.</p>
      </div>
    </Fragment>
  );
}

Greeting.propTypes = {
  errorMsg: PropTypes.string,
  errorId: PropTypes.string,
};

const mapStateToProps = state => ({
  errorMsg: state.error.msg.msg,
  errorId: state.error.id,
});

export default connect(mapStateToProps)(Greeting);
