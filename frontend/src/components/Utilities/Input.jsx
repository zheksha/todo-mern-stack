import React from "react";

export const Input = (props) => {
  return (
    <div>
      <form autoComplete="off">
        <div className="form-group">
          <label className="col-form-label " htmlFor={props.id}>
            <small>{props.label}</small>
          </label>
          <input
            type={props.type}
            className="form-control"
            placeholder={props.placeholder}
            id={props.id}
            onChange={props.onChange}
            name={props.name}
            value={props.value}
            required={props.required}
          />
        </div>
      </form>
    </div>
  );
};
