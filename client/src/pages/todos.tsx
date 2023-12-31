import { useContext, useEffect, useState } from "react";
import IPage from "../interfaces/page";
import ITodo from "../interfaces/todo";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles.css";
import UserContext from "../contexts/userContext";

const API_BASE = "http://localhost:3001";
const token = localStorage.getItem("fire_token");

if (!API_BASE) throw new Error("API_BASE is not defined!");

const Todos: React.FunctionComponent<IPage> = (props) => {
  const userContext = useContext(UserContext);
  const user = userContext.userState;
  let userid = user.user._id;

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [addingTodo, setAddingTodo] = useState<boolean>(false);

  const displayTodos = async (userid: string): Promise<void> => {
    try {
      const response = await fetch(API_BASE + `/todos/${userid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.log({ error: err });
    }
  };

  useEffect(() => {
    if (token) {
      displayTodos(userid);
    }
  }, []);

  const addNewTodo = async (): Promise<void> => {
    try {
      const response = await fetch(API_BASE + "/todos/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
          user: userid,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ITodo = await response.json();
      setNewTodo("");
      setAddingTodo(false);
      setTodos((todos) => [...todos, data]);
    } catch (err) {
      console.log({ error: err });
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      const response = await fetch(API_BASE + `/todos/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ITodo = await response.json();
      setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
    } catch (err) {
      console.log({ error: err });
    }
  };

  const checkTodo = async (id: string): Promise<void> => {
    try {
      const response = await fetch(API_BASE + `/todos/check/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ITodo = await response.json();
      setTodos((todos: ITodo[]) =>
        todos.map((todo: ITodo) => {
          if (todo._id === data._id) {
            return {
              ...todo,
              checked: data.checked,
            };
          }
          return todo;
        })
      );
    } catch (err) {
      console.log({ error: err });
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewTodo(event.target.value);
  };

  return (
    <>
      <h1>Welcome on your to-do list app</h1>
      <h4>HERE ARE YOUR TASKS</h4>

      {todos.map((todo) => {
        return (
          <div
            className={"todo" + (todo.checked ? " is-checked" : "")}
            key={todo._id}
          >
            <div className="check" onClick={() => checkTodo(todo._id)}></div>
            <p>{todo.text}</p>
            <button className="delete" onClick={() => deleteTodo(todo._id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        );
      })}

      {addingTodo && (
        <div className="Modal">
          <div className="buttonsDiv">
            <button
              className="cross"
              id="closeModal"
              onClick={() => setAddingTodo(false)}
            >
              x
            </button>
          </div>
          <input type="text" onChange={handleInputChange} />
          <button className="button addTodoButton" onClick={addNewTodo}>
            Add Todo
          </button>
        </div>
      )}

      <button id="openModalBtn" onClick={() => setAddingTodo(true)}>
        +
      </button>
    </>
  );
};

export default Todos;
