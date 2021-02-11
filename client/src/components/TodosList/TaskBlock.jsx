import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TaskBlock = ({ todo, index }) => {
  const markAsCompleted = () => {
    if (todo.todo_completed) {
      todo = { ...todo, todo_completed: false };
    } else if (!todo.todo_completed) {
      todo = { ...todo, todo_completed: true };
    }

    const updateDB = (todo) =>
      axios.patch(`http://localhost:4000/todos/${todo._id}`, todo, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

    updateDB(todo);
    window.location.reload();
  };

  return (
    <div
      key={todo._id}
      className={`row  py-2 my-1 d-flex align-items-center  bg-secondary ${
        todo.todo_completed ? "completed" : "bg-secondary"
      }`}
    >
      <div className="col-md-8 lead d-flex align-items-center  ">
        {todo.todo_description}
      </div>
      <div className="col-md-2">
        <span className={`badge mr-2 ${todo.todo_priority.toLowerCase()} `}>
          {todo.todo_priority}
        </span>
        <span className="completed-button" onClick={markAsCompleted}>
          {todo.todo_completed ? (
            <span className={`badge bg-success`}>Completed</span>
          ) : (
            <span className={`badge bg-warning`}>Complete!</span>
          )}
        </span>
      </div>
      <div className="col-md-2 ">
        <Link className="nav-link my-0 py-0" to={`/edit/${todo._id}`}>
          <i className="fas fa-edit mr-2"></i>Edit
        </Link>
      </div>
    </div>
  );
};

export default TaskBlock;
