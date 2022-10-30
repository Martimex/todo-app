import React, {useState} from "react";
import '../styles/ToDo.css';
import {useSelector} from 'react-redux';

import { TodoList } from '../features/todos/TodoList.js';
import { TodoAddForm } from '../features/todos/TodoAddForm.js';
import { TodoRemovePanel } from '../features/todos/TodoRemovePanel.js';
import { TodoEditPanel } from '../features/todos/TodoEditPanel.js';

function ToDo() {

    const [todoView, setTodoView] = useState(null);

    const allTodos = useSelector(state => state.todos);
    

    return (
        <div className="todo-main">
            <h1> Simple ToDo App </h1>
            
            <h3> ToDo lists created:  {allTodos.length}</h3>
            <div className="todo-main__action-box">
                <button 
                    className="action-btn" 
                    datatype="add"
                    onClick={() => setTodoView('add')}
                >
                    Add ToDo
                </button>

                <button 
                    className="action-btn" 
                    datatype="remove"
                    onClick={() => setTodoView('remove')}
                > 
                    Remove ToDo
                </button>
            </div>
            <TodoList includeChackboxes={false} setTodoView={setTodoView} />

            {(todoView === 'add' && <TodoAddForm setTodoView={setTodoView} /> )}
            {(todoView === 'edit' && <TodoEditPanel setTodoView={setTodoView} /> )}
            {(todoView === 'remove' && <TodoRemovePanel setTodoView={setTodoView} /> )}

        </div>
    )

}

export { ToDo };