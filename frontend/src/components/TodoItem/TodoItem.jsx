import axios from "axios";
import React, { useState, useEffect } from "react";

import { Input } from "../Utilities/Input";
import { Select } from "../Utilities/Select";
import { ToastSuccess, ToastWarning } from "../Utilities/Toast";
import "./todoItem.style.scss";

export const TodoItem = (props) => {
  const [currentTodo, setCurrentTodo] = useState({
    todo_description: "",
    todo_priority: "",
    todo_completed: "",
  });

  const [showToastWarning, setShowToastWarning] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  //get todo by id from mongo and assign to state
  useEffect(() => {
    const fetchCurrentTodo = async () => {
      const result = await axios(
        `http://localhost:4000/todos/${props.match.params.id}`
      );
      setCurrentTodo({ ...currentTodo, ...result.data });
    };
    fetchCurrentTodo();
  }, []);

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
    axios
      .post(
        `http://localhost:4000/todos/update/${props.match.params.id}`,
        currentTodo
      )
      .then((res) => console.log(res.data));
    setShowToastSuccess(true);
    setTimeout(() => {
      props.history.push("/");
    }, 1200);
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
    axios.delete(`http://localhost:4000/todos/delete/${props.match.params.id}`);
    setTimeout(() => {
      props.history.push("/");
    }, 200);
  };

  return (
    <div>
      {alertBlock}
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