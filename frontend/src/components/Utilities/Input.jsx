import React from "react";

export const Input = (props) => {
  return (
    <div>
      <div className="form-group">
        <form autoComplete="off">
          <label className="col-form-label " htmlFor="inputDefault">
            <small>{props.label}</small>
          </label>
          <input
            type={props.type}
            className="form-control"
            placeholder={props.placeholder}
            id="inputDefault"
            onChange={props.onChange}
            name={props.name}
            value={props.value}
          />
        </form>
      </div>
    </div>
  );
};
