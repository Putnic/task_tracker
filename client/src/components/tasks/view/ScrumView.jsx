import React, { Component } from 'react';
import { Table, Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';

// TODO:
class ScrumView extends Component {

  handleClick = (e) => {
    const { setSort, sorting } = this.props;
    const name = e.target.dataset.name;

    if (e.target.tagName === 'TH') {
      setSort(name, !sorting.order);
    }
  }

  render() {
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    // console.log('TableView: ', this.props.tasks);

    return (
      <h1>Srum View</h1>
        // <Table striped id="tasks">
        //   <thead>
        //     <tr className="text-center"  onClick={this.handleClick}>
        //       <th data-name="title">Title</th>
        //       <th data-name="body">Task</th>
        //       <th data-name="priority">Priority</th>
        //       <th data-name="status">Status</th>
        //       <th data-name="createdAt">Created</th>
        //       <th>Manage</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {this.props.tasks.map((task) => (
        //       <tr key={task._id}>
        //         <td>{task.title}</td>
        //         <td>{task.body}</td>
        //         <td className="text-center">{task.priority}</td>
        //         <td className="text-center">{task.status}</td>
        //         <td className="text-center">{
        //           (new Date(task.createdAt)).toLocaleString("ru", options)
        //         }</td>
        //         <td className="text-right">
        //           <ButtonGroup size='sm' >
        //             <Button title="edit" color="dark" outline>
        //               <i className="fas fa-edit"></i>
        //             </Button>
        //             <Button 
        //               title="delete"
        //               color='danger'
        //               outline
        //               // onClick={this.onDeleteClick.bind(this, task._id)}>
        //               >
        //               <i className="fas fa-times"></i>
        //             </Button>
        //           </ButtonGroup>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </Table>
    );
  }
}

ScrumView.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default ScrumView;
