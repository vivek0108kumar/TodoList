import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar, AiFillDelete } from "react-icons/ai";

function ToDoList({ itemsList, onDelete, addRemoveStar, name }) {
  const [sortList, setSortList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (itemsList.length > 0) {
      const sorter = (a, b) => {
        if (!a["favorite"] && b["favorite"]) {
          return 1;
        }
        if (a["favorite"] && !b["favorite"]) {
          return -1;
        }
        return a["favorite"] - b["favorite"];
      };
      setSortList(itemsList.sort(sorter));
    }
  }, [itemsList]);

  useEffect(() => {
    const test = itemsList.filter((x) =>
      x["name"].toLowerCase().includes(name.toLowerCase())
    );
    setSortList(test);
  }, [name]);

  const renderToDoList = () => {
    const indexOfLastTodo = currentPage * 4;
    const indexOfFirstTodo = indexOfLastTodo - 4;
    const currentTodos = sortList.slice(indexOfFirstTodo, indexOfLastTodo);
    return currentTodos.map((item) => (
      <div key={item.id} style={{ borderBottom: "1px solid" }} className="itemLists">
        <span className="itemName">{item.name}</span>
        {item.favorite ? (
          <span className="icon">
            <AiFillStar size={20} onClick={() => addRemoveStar(item.id)} />
          </span>
        ) : (
          <span className="icon">
            <AiOutlineStar size={20} onClick={() => addRemoveStar(item.id)} />
          </span>
        )}
        <span className="icon">
          <AiFillDelete size={20} onClick={() => onDelete(item.id)} />
        </span>
      </div>
    ));
  };

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumber = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(itemsList.length / 4); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li key={number} id={number} onClick={handleClick}>
        {number}
      </li>
    ));
  };

  return (
    <div>
      {renderToDoList()}
      <ul id="page-numbers">{renderPageNumber()}</ul>
    </div>
  );
}

export default ToDoList;
