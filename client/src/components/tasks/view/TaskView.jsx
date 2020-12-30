import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../../store/actions/errorActions';

import InputF from '../../form_input/InputF';

class TaskViewEdit extends Component {
  constructor(props) {
    super(props);

    let task = {...this.props.task};
    Object.keys(task).forEach(key => {
      if (key.includes('_date') && typeof(task[key]) === 'string') 
        task[key] = task[key].slice(0,10);
    });

    this.state = {
      task,
      msg: ''
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for add error
      if (error.id === 'EDIT_TASK_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  handleChange = e => {
    this.setState({ task: {...this.state.task, [e.target.name]: e.target.value} });
  };

  onSubmit = e => {
    e.preventDefault();
    let updateTask = {...this.state.task };
    delete updateTask.updatedAt;
    // Save Edit task via EditTask action
    this.props.editTask(updateTask._id, updateTask);
  };

  render() {
    const task = { ...this.state.task};
    // const plan_d = task.planned_date ? task.planned_date.slice(0,10) : '';
    console.log('TaskView ', this.props, this.state);
      
    return (
      <Fragment>
        {this.state.msg ? (
          <div className="alert alert-danger" role="alert">
            {this.state.msg}
          </div>
          ) : null}
        <form onSubmit={this.onSubmit}>
          <InputF type='text' name='title' 
            // defaultValue={this.props.task.title}
            value={task.title} 
            handleChange={this.handleChange} >Title</InputF>
          <InputF type='textarea' name='body' 
            value={task.body}
            handleChange={this.handleChange}
            rows='3' >Task</InputF>
          <InputF type='select' name='priority' 
            value={task.priority}
            handleChange={this.handleChange}
            options={[1, 2, 3, 4, 5]} >Priority</InputF>
          <InputF type='date' name='planned_date' title='Task completion date'
            value={task.planned_date}
            handleChange={this.handleChange} >Planned</InputF>
          <InputF type='date' name='start_date' title='Start date of task execution'
            value={task.start_date}
            handleChange={this.handleChange} >Start</InputF>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-outline-dark" >
                Save
              </button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }
}

TaskViewEdit.propTypes = {
  task: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.number
  ]),
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  // const task = tasks.find(task => task._id === props.match.params.id);
  return {
    // task: state.task.tasks.find(task => task._id === ownProps.match.params.id),
    error: state.error,
  };
};

const mapDispatchToProps = {clearErrors}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskViewEdit);
