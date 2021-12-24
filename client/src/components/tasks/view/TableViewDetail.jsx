import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TableViewDetail extends Component {

  handleClick = (e) => {
    const { setSort, sorting } = this.props;
    const name = e.target.dataset.name;

    if (e.target.tagName === 'TH') {
      setSort(name, !sorting.order);
    }
  }

  formatDate = d => {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    return (d === null) ? ('----') : (new Date(d)).toLocaleString("ru", options);
  }

  render() {
    const { deleteTask, location } = this.props;
    console.log('TableViewDetail ', this.props);
    return (
        <table className="table table-hover" id="tasks">
          <thead>
            <tr className="text-center"  onClick={this.handleClick}>
              <th  scope="col" className="text-right">Manage</th>
              <th  scope="col" data-name="title">Title</th>
              <th  scope="col" data-name="body">Task</th>
              <th  scope="col" data-name="priority">Priority</th>
              <th  scope="col" data-name="status">Status</th>
              <th  scope="col" data-name="createdAt">Created</th>
              <th  scope="col" data-name="start_date">Start</th>
              <th  scope="col" data-name="actual_date">End</th>
              <th  scope="col" data-name="planned_date">Planned end</th>
              <th  scope="col" data-name="updatedAt">Last updated</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map((task) => (
              <tr key={task._id}>
                <td className="text-left">
                  <div className="btn-group" size='sm' >
                    <Link className="btn btn-outline-dark btn-sm"
                      title="edit"
                      to={{
                        pathname: `/tasks/${task._id}`,
                        state: { from: location.pathname }
                      }}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className="btn btn-outline-danger btn-sm" 
                      title="delete"
                      onClick={() => deleteTask(task._id)}>
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </td>
                <td>{task.title}</td>
                <td>{task.body}</td>
                <td className="text-center">{task.priority}</td>
                <td className="text-center">{task.status}</td>
                <td className="text-center">{
                  this.formatDate(task.createdAt)
                }</td>
                <td className="text-center">{
                  this.formatDate(task.start_date)
                }</td>
                <td className="text-center">{
                  this.formatDate(task.actual_date)
                }</td>
                <td className="text-center">{
                  this.formatDate(task.planned_date)
                }</td>
                <td className="text-center">{
                  this.formatDate(task.updatedAt)
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
    );
  }
}

TableViewDetail.propTypes = {
  tasks: PropTypes.array.isRequired,
  sorting: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TableViewDetail;
