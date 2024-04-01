import React, { useState } from 'react';
import { TiEdit } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';

const TodoList = ({ todos, delete_todo, updated_todo }) => {
    const [toggle, setToggle] = useState(false);
    const [todoItem, setTodoItem] = useState("");
    const [todoId, setTodoId] = useState(null); // Changed initial value to null

    const toggleModel = (item, id) => {
        setToggle(true);
        setTodoItem(item);
        setTodoId(id);
    };

    return (
        <>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <div className="todo-list-item" key={ index }>
                        <div className="task">
                            <input type="checkbox"/>
                            <p id='t_task'>{todo.task}</p>
                        </div>
                        <div className="btn-container">
                            <div className="edit">
                                <TiEdit size={20} onClick={() => toggleModel(todo.task, todo.id)} />
                            </div>
                            <div className="del">
                                <MdDelete size={20} onClick={() => delete_todo(todo.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {toggle &&
                <div className="modal-container">
                    <div className="modal">
                        <h1>Update Form</h1>
                        <form onSubmit={(e) => { e.preventDefault(); updated_todo(e, todoId, todoItem); setToggle(false); }}>
                            <input type="text" placeholder="Update Todo" value={todoItem} onChange={(e) => setTodoItem(e.target.value)} required />
                            <button type="submit">Update</button>
                        </form>
                        <div className="btn-container">
                            <button className="cancel mod-btn" onClick={() => setToggle(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default TodoList;
