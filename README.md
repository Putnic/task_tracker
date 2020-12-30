<!-- task_tracker -->

# Task tracker

- Source code: [GitHub](https://github.com/Putnic/task_tracker.git)
- Demonstration: [Heroku](https://pure-plains-24385.herokuapp.com/)

## Applied technology

- Node.js
  - Express.js
- MongoDB
- React.js
  - Redux.js
  - React router
- JSON Web Token
- Bootstrap v. 4

## Main features of the application

- The application is a Single Page Application on the front part. Server - Express.js.
- Interaction with the server using the REST API architecture.
  - JSON data format.
  - AJAX request.
- Login to the application, authorization.
  - Only the data entry page (login, password) is available to the unauthorized user.
  - After authentication, the user gets access to their task list.
- Task list.
  - List of tasks in table form, with the ability to sort the list, filter (by status) and change the view.
  - Detailed view
  - Short view
  - Scrum Board (in the development).
- The task page. Page with detailed information abiut the task.
  - Title
  - Description
  - Date creation
  - Priority
  - Planned and actual time to complete the task
  - Task execution status
    - plan process ready
- Adding a task (ability to add a new task)
- Deleting a task
- Edit task
