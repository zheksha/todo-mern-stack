import React from "react";

export const Select = (props) => {
  return (
    <div className="form-group">
      <select id={props.id} className="custom-select" onChange={props.onChange}>
        <option defaultChecked="{props.value}">{props.label}</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};
