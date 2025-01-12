import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { database } from '../appwrite/config';

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise =database.createDocument("65abf1f6ab18fc1967f8","6780b46c00350c756688", uuidv4(),  {todo} )

    promise.then(
      function (response) {
        console.log(response);
        setTodos([...todos, response]);
        setTodo("");
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (id) => {
    database.deleteDocument("65abf1f6ab18fc1967f8","6780b46c00350c756688", id).then(
      function () {
        setTodos(todos.filter((item) => item.$id !== id));
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const handleUpdate = (id) => {
    database.updateDocument("65abf1f6ab18fc1967f8","6780b46c00350c756688", id, { todo }).then(
      function (response) {
        setTodos(todos.map((item) => (item.$id === id ? response : item)));
        setTodo("");
      },
      function (error) {
        console.log(error);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900">Todo App</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={todo}
            onChange={handleChange}
            placeholder="Add a new todo"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Todo
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((item) => (
            <li
              key={item.$id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
            >
              <span>{item.todo}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdate(item.$id)}
                  className="px-2 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(item.$id)}
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoForm;
