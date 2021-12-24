import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../../../store/actions/errorActions';

import InputF from '../../form_input/InputF';
import RadioGroup from '../../form_input/RadioGroup';

class TaskViewEdit extends Component {
  constructor(props) {
    super(props);

    let task = {...this.props.task};
    Object.keys(task).forEach(key => {
      if ((key.includes('_date') || key.includes('atedAt')) && typeof(task[key]) === 'string') 
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
    this.props.history.push(this.props.location.state.from);
  };

  render() {
    const task = { ...this.state.task};
    console.log('TaskViewEdit ', this.props, this.state);
      
    return (
      <Fragment>
        <h1>Edit Task</h1>
        {this.state.msg ? (
          <div className="alert alert-danger" role="alert">
            {this.state.msg}
          </div>
          ) : null}
        <form className="mb-2" onSubmit={this.onSubmit}>
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
          <div className="alert alert-secondary" role="alert">
            Task created: {task.createdAt}
          </div>
          <InputF type='date' name='start_date' title='Start date of task execution'
            value={task.start_date}
            handleChange={this.handleChange} >Start</InputF>
          <InputF type='date' name='actual_date' title='Actual task completion date'
            value={task.actual_date}
            handleChange={this.handleChange} >End</InputF>
          <InputF type='date' name='planned_date' title='Planned completion date for a task'
            value={task.planned_date}
            handleChange={this.handleChange} >Planned end</InputF>
          <div className="alert alert-secondary" role="alert">
            Last updated: {task.updatedAt}
          </div>
          <RadioGroup
            name="status"
            styleInputBtn = 'btn btn-outline-secondary btn-sm'
            value={task.status}
            options={[
              {label: "Plan", value: "plan"},
              {label: "Process", value: "process"},
              {label: "Ready", value: "ready"},
            ]}
            handleChange={this.handleChange}
          >Status</RadioGroup>

          <button type="submit" className="btn btn-outline-dark">
            Save
          </button>
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
