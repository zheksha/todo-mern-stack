import React, { useState } from "react";
import { Input } from "../Utilities/Input";
import { Select } from "../Utilities/Select";
import { ToastWarning, ToastSuccess } from "../Utilities/Toast";
import jwt_decode from "jwt-decode";
import axios from "axios";

const CreateTodo = (props) => {
  const { user } = jwt_decode(localStorage.getItem("token"));
  console.log(user.id);

  const [todo, setTodo] = useState({
    todo_user: user.id,
    todo_description: "",
    todo_priority: "",
    todo_completed: false,
  });

  const [showToastWarning, setShowToastWarning] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  const onInputChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSelectChange = (e) => {
    if (e.target.value === "Choose priority")
      e.target.value = "No priority given";
    setTodo({ ...todo, todo_priority: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!todo.todo_description || !todo.todo_priority) {
      setShowToastWarning(true);
      setShowToastSuccess(false);
      return;
    }

    axios
      .post("http://localhost:4000/todos/create", todo, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res.data));
    setTodo({
      ...todo,
      todo_description: "",
      todo_priority: "",
      todo_completed: false,
    });
    setShowToastSuccess(true);
    setShowToastWarning(false);
  };

  const alertText = {
    warning: "Something went wrong, please make sure all fields filled up",
    success: "Successfully created new task.",
  };

  const alertBlock = (
    <div>
      {showToastWarning ? (
        <ToastWarning
          text={alertText.warning}
          onClick={() => setShowToastWarning(false)}
        />
      ) : null}
      {showToastSuccess ? (
        <ToastSuccess
          text={alertText.success}
          onClick={() => setShowToastSuccess(false)}
        />
      ) : (
        ""
      )}
    </div>
  );

  return (
    <div>
      <h3 className="mb-4">Create new task</h3>
      {alertBlock}
      <Input
        name="todo_description"
        label="Description"
        placeholder="Please enter task here"
        onChange={onInputChange}
        value={todo.todo_description}
      />
      <Select
        value={todo.todo_priority}
        name="todo_priority"
        label="Choose priority"
        onChange={onSelectChange}
      />
      <button onClick={onSubmit} className="btn btn-success">
        <i className="fas fa-plus mr-1"></i>Add Task
      </button>
    </div>
  );
};

export default CreateTodo;
