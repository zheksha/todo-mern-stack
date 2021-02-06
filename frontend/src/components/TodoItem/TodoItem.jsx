import axios from "axios";
import React, { useState, useEffect } from "react";
import Moment from "react-moment";

import { Input } from "../Utilities/Input";
import { Select } from "../Utilities/Select";
import { ToastSuccess, ToastWarning } from "../Utilities/Toast";
import "./todoItem.style.scss";

export const TodoItem = (props) => {
  const [currentTodo, setCurrentTodo] = useState({
    todo_description: "",
    todo_priority: "",
    todo_completed: "",
    todo_created_at: "",
  });

  const [showToastWarning, setShowToastWarning] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  //get todo by id from mongo and assign to state

  useEffect(() => {
    const id = props.match.params.id;
    const fetchCurrentTodo = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/todos/${id}`, {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        setCurrentTodo({ ...result.data.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentTodo();
  }, [props.match.params.id]);

  const onInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e) => {
    if (e.target.value === "Choose priority")
      e.target.value = "No priority given";
    setCurrentTodo({ ...currentTodo, todo_priority: e.target.value });
  };

  const onCheckClick = (e) => {
    setCurrentTodo({
      ...currentTodo,
      todo_completed: !currentTodo.todo_completed,
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!currentTodo.todo_description || !currentTodo.todo_priority)
      return setShowToastWarning(true);
    axios.patch(
      `http://localhost:4000/todos/${props.match.params.id}`,
      currentTodo,
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    setShowToastSuccess(true);
    setTimeout(() => {
      props.history.push("/todos");
    }, 1000);
  };

  const alertBlock = (
    <div>
      {showToastWarning ? (
        <ToastWarning onClick={() => setShowToastWarning(false)} />
      ) : null}
      {showToastSuccess ? (
        <ToastSuccess onClick={() => setShowToastSuccess(false)} />
      ) : (
        ""
      )}
    </div>
  );

  const deleteTask = () => {
    axios.delete(`http://localhost:4000/todos/${props.match.params.id}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    setTimeout(() => {
      props.history.push("/todos");
    }, 200);
  };

  return (
    <div>
      {alertBlock}
      <small className="text-dark">
        Date created:
        <br />
        <strong>
          <Moment format="YYYY/MM/DD h:mm a">
            {currentTodo.todo_created_at}
          </Moment>
        </strong>
      </small>
      <hr />
      <Input
        name="todo_description"
        label="Description"
        onChange={onInputChange}
        value={currentTodo.todo_description}
      />

      <Select
        value={currentTodo.todo_priority}
        name="todo_priority"
        label="Choose priority"
        onChange={onSelectChange}
      />

      <div className="my-4">
        <div className="form-check d-flex align-items-center">
          <input
            checked={currentTodo.todo_completed}
            onChange={onCheckClick}
            className="form-check-input input-box mt-0 "
            type="checkbox"
            id="flexCheckDefault"
          />
          <label
            className="form-check-label ml-3 p-0 lead text-dark"
            htmlFor="flexCheckDefault"
          >
            <strong>Completed</strong>
          </label>
        </div>
      </div>

      <button onClick={onFormSubmit} className="btn btn-success">
        Update task
      </button>

      <button onClick={onCheckClick} className="btn btn-info ml-3">
        {currentTodo.todo_completed
          ? "Mark as uncompleted"
          : "Mark as completed"}
      </button>

      <button onClick={deleteTask} className="ml-3 btn btn-danger">
        <i className="fas fa-toilet mr-1"></i> Flush task
      </button>
    </div>
  );
};

export default TodoItem;
