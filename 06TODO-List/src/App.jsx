import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import Modal from "./component/Modal";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinsihed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [todoToDelete, setTodoToDelete] = useState(null); // Todo ID for deletion

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = (e) => {
    setshowFinsihed(!showFinished);
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  };
  //   const handleDelete = (e, id) => {
  //       let newTodos = todos.filter((item) => {
  //         return item.id !== id;
  //       });
  //       setTodos(newTodos);
  //       saveToLS(newTodos);
  //   };
  const handleAdd = () => {
    const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(updatedTodos);
    setTodo("");
    saveToLS(updatedTodos);
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    const id = e.target.name;
    console.log(id);
    const index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // Open Modal for delete confirmation
  const openDeleteModal = (id) => {
    setIsModalOpen(true);
    setTodoToDelete(id);
  };

  // Confirm delete action
  const confirmDelete = () => {
    const updatedTodos = todos.filter((item) => item.id !== todoToDelete);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[60%]">
        <h1 className="font-bold text-center text-2xl">
          iTask - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
            <input
              type="text"
              onChange={handleChange}
              value={todo}
              className="w-full rounded-full px-5 py-1"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinished}
          />
          <label className="mx-2" htmlFor="show">
            Show Finished
          </label>
        </div>
        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="">No todos to display.</div>}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between my-4">
                  <div className="flex gap-5 ">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => openDeleteModal(item.id)}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this todo?"
      />
    </>
  );
}

export default App;
