import React, { Component } from 'react';
import {
  Button,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTask } from '../../store/actions/taskActions';
import { clearErrors } from '../../store/actions/errorActions';

class TaskModal extends Component {
  state = {
    modal: false,
    title: '',
    body: '',
    priority: '1',
    msg: ''
  };

  // componentWillReceiveProps(newProps){
  //   const { task } = this.props;
    // if(!newprops.loading && newprops.success){
    //    this.setState({
    //        open: false,
    //    });
    // }
  // }

  componentDidUpdate(prevProps) {
    const { error, task } = this.props;

    if (error !== prevProps.error) {
      // Check for add error
      if (error.id === 'ADD_TASK_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If task added successfully, close modal
    if (this.state.modal) {
      if (task.tasks.length !== prevProps.task.tasks.length) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newTask = {
      userId: this.props.userId,
      title: this.state.title,
      body: this.state.body,
      priority: this.state.priority
    };
    // Add task via addTask action
    this.props.addTask(newTask);
  };

  render() {
    return (
      <div>
        <NavLink color='dark' onClick={this.toggle} href='#' >
          Add Task
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Task List</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='title'>Title</Label>
                <Input
                  type='text'
                  name='title'
                  id='title'
                  placeholder='Add title'
                  onChange={this.handleChange}
                />

                <Label for='title'>Task</Label>
                <Input
                  type='textarea'
                  name='body'
                  id='body'
                  placeholder='Add task'
                  onChange={this.handleChange}
                />

                <Label for='priority'>Select Priority</Label>
                <Input type="select" name="priority" value={this.state.priority} id="priority" onChange={this.handleChange}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
              <Button color='dark' block>
                Add Task
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

TaskModal.propTypes = {
  task: PropTypes.object,
  error: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  task: state.task,
  error: state.error,
  userId: state.auth.user.id,
});

const mapDispatchToProps = {addTask, clearErrors}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModal);
