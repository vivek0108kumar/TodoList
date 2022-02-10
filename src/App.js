import React, { useState } from "react";
import "./App.css";
import ToDoForm from "./Components/ToDoForm";
import ToDoList from "./Components/ToDoList";

function App() {
  const [itemsList, setItemList] = useState([
    { id: 1, name: "Feed dog", favorite: true },
    { id: 2, name: "Call Parents", favorite: false },
    { id: 3, name: "Buy a new gaming laptop", favorite: false },
  ]);
  const [name, setName] = React.useState("");

  const handleChange = (event) => {
    setName(event.currentTarget.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = new Date().getTime();
    handleAdd({ id: id, name: name, favorite: false });
    setName("");
  };

  const handleAdd = (item) => {
    let items = itemsList.slice();
    items = [item, ...items];
    setItemList(items);
  };

  const handleDelete = (id) => {
    const items = itemsList.filter((item) => item.id !== id);
    setItemList(items);
  };

  const addRemoveStar = (id) => {
    const markers = [...itemsList];
    const index = markers.findIndex((el) => el.id === id);
    markers[index] = { ...markers[index], favorite: !markers[index].favorite };
    setItemList(markers);
  };

  return (
    <div className="App">
      <h1>Todo list</h1>
      <ToDoForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        name={name}
      />
      <ToDoList
        itemsList={itemsList}
        onDelete={handleDelete}
        addRemoveStar={addRemoveStar}
        name={name}
      />
    </div>
  );
}

export default App;
