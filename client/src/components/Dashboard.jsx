import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import { getTasks, deleteTask, editTask, setSort } from '../store/actions/taskActions';
import { VisibilityFilters } from '../store/actions/types.js';

import { ScrumView, TableViewDetail, TableViewShort, TaskViewEdit } from './tasks/view';
import FilterLink from './tasks/FilterLink';

class Dashboard extends Component {
  // Auto-update the list every n minutes
  componentDidMount() {
    this.props.getTasks();
    // this.interval = setInterval(() => this.props.getTasks(), 5*60*60);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  
  render() {
    const { tasks, sorting, setSort, deleteTask, editTask, match, location } = this.props;
    console.log('Dashboard', this.props);
    const tableViewProps = {tasks, setSort, sorting, deleteTask};
    const styleNavLink = 'btn btn-outline-dark btn-sm';
    const styleFilterLink = 'btn btn-outline-secondary btn-sm';

    if (!tasks && !tasks.length > 0) {
      return (
        <h1>Tasks loading</h1>
      );
    } 
    
    return (
      <Fragment>
        <div className="btn-toolbar mb-1">
          <div className="btn-group mr-1">
            <NavLink to={`${match.url}short`} className={styleNavLink}>Short</NavLink>
            <NavLink to={`${match.url}detail`} className={styleNavLink}>Detailed</NavLink>
            <NavLink to={`${match.url}scrum`} className={styleNavLink}>Scrum</NavLink>
          </div>
          {(location.pathname === '/short' || location.pathname === '/detail') ? 
            (<div className="btn-group mr-1">
              <FilterLink styleFilterLink={styleFilterLink} test={'test'} />
            </div>)
          : null }
        </div>

        <Switch>
          <Route exact path="/">
            <Redirect to={`${match.url}short`} />
          </Route>
          <Route 
            path={`${match.path}short`} 
            render={(props) => <TableViewShort {...props} {...tableViewProps}/>} />
          <Route 
            path={`${match.path}detail`} 
            render={(props) => <TableViewDetail {...props} {...tableViewProps}/>} />
          <Route 
            path={`${match.path}scrum`} 
            render={(props) => <ScrumView {...props} tasks={tasks} setSort={setSort} sorting={sorting}/>} />
          <Route 
            path={`${match.path}tasks/:id`} 
            render={(props) => {
              const task = tasks.find(task => task._id === props.match.params.id) || {_id: 1};
              return <TaskViewEdit {...props} key={task._id} task={task} editTask={editTask}/>;
            }} />
        </Switch>
      </Fragment>
    );
  }
}

const getFilteredTasks = (tasks, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return tasks;
    case VisibilityFilters.SHOW_PLAN:
    return tasks.filter(t => t.status === 'plan')
    case VisibilityFilters.SHOW_ACTIVE:
      return tasks.filter(t => t.status === 'process')
    case VisibilityFilters.SHOW_READY:
      return tasks.filter(t => t.status === 'ready')
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const getSortTasks = (tasks, sorting) => {
  const tasksCopy = tasks.slice();
  const { order, name } = sorting;

  tasksCopy.sort((a, b) => {
    if (name === 'createdAt') {
      [a, b] = order ? [(new Date(a[name])), (new Date(b[name]))] : 
                [(new Date(b[name])), (new Date(a[name]))];
    } else
    {
      [a, b] = order ? [a[name], b[name]] : [b[name], a[name]];
    }
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
      return 0;
  });
  return tasksCopy;
}

Dashboard.propTypes = {
  // isAuthenticated: PropTypes.bool,
  tasks: PropTypes.array.isRequired,
  sorting: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { tasks, filter, sorting } = state.task;
  const filterTasks = getFilteredTasks(tasks, filter);
  const sortTasks = getSortTasks(filterTasks, sorting);
  return {
    // isAuthenticated: state.auth.isAuthenticated,
    tasks: sortTasks,
    sorting
  };
};

export default connect(mapStateToProps, { getTasks, deleteTask, editTask, setSort })(Dashboard);
