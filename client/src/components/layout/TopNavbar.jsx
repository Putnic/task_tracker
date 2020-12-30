import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Container
} from 'reactstrap';
import GuestLinks from './GuestLinks';
import AuthLinks from './AuthLinks';

class TopNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    // console.log('TopNavBar render');

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-2'>
          <Container>
            <NavbarBrand href='/'>TaskList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(TopNavbar);