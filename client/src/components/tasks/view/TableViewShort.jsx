import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TableViewShort extends Component {

  handleClickThead = (e) => {
    const { setSort, sorting } = this.props;
    const name = e.target.dataset.name;

    if (e.target.tagName === 'TH') {
      setSort(name, !sorting.order);
    }
  }

  handleClickTbody = (e) => {
    // console.dir(e.target.parentElement.nodeName);
    // console.dir(e.target);
  }

  render() {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    const { deleteTask, location } = this.props;
    console.log('TableViewShort ', this.props);
    return (
        <table className="table table-hover" id="tasks">
          <thead>
            <tr className="text-center"  onClick={this.handleClickThead}>
              <th scope="col" data-name="title">Title</th>
              <th scope="col" data-name="priority">Priority</th>
              <th scope="col" data-name="status">Status</th>
              <th scope="col" data-name="createdAt">Created</th>
              <th scope="col" className="text-right">Manage</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map((task) => (
              <tr key={task._id}>
                <td onClick={this.handleClickTbody} >{task.title}</td>
                <td className="text-center">{task.priority}</td>
                <td className="text-center">{task.status}</td>
                <td className="text-center">{
                  (new Date(task.createdAt)).toLocaleString("ru", options)
                }</td>
                <td className="text-right">
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
              </tr>
            ))}
          </tbody>
        </table>
    );
  }
}

TableViewShort.propTypes = {
  tasks: PropTypes.array.isRequired,
  sorting: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TableViewShort;
