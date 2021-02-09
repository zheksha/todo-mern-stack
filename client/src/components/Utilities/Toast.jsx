import React from "react";

export const ToastWarning = (props) => {
  return (
    <div className="alert alert-dismissible alert-danger">
      <button
        onClick={props.onClick}
        type="button"
        className="close"
        data-dismiss="alert"
      >
        &times;
      </button>
      <strong>
        <i className="fas fa-frown-open mr-1" />
        Oh snap!
      </strong>{" "}
      {props.text}.
    </div>
  );
};

export const ToastSuccess = (props) => {
  return (
    <div className="alert alert-dismissible alert-success">
      <button
        onClick={props.onClick}
        type="button"
        className="close"
        data-dismiss="alert"
      >
        &times;
      </button>
      <strong>
        <i className="mr-1 fas fa-thumbs-up" />
        Well done!
      </strong>{" "}
      {props.text}.
    </div>
  );
};
