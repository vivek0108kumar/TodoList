import React from "react";

function ToDoForm({ handleChange, handleSubmit, name }) {
  return (
    <div className="toDoForm">
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          placeholder="Enter your todo task"
        />
      </form>
    </div>
  );
}

export default ToDoForm;
