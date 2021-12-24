import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'reactstrap';
import TopNavbar from './components/layout/TopNavbar';
import Dashboard from './components/Dashboard.jsx';
import Greeting from './components/Greeting';

const App = ({isAuthenticated}) => {
  return (
    <div className="App">
      <TopNavbar />
      <Container>
        <Switch>
          <Route path='/'component={isAuthenticated ? Dashboard : Greeting} />
        </Switch>
        {/* {isAuthenticated ? <Dashboard /> : <Greeting />} */}
      </Container>
    </div>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
