import react, { useState } from 'react';
import './styles/todoRemovePanel.css';

import { TodoList } from './TodoList';
import { useSelector, useDispatch } from 'react-redux';

import todosSlice,
{
    removeSelected,
    deselectAll
}
from './todosSlice';

export const TodoRemovePanel = ({ setTodoView }) => {

    const dispatch = useDispatch();
    const allTodos = useSelector(state => state.todos);

    const checkRemoveConditions = () => {
        dispatch(removeSelected(allTodos.filter(todo => todo.isSelected)));
    }

    const deselectAllTodos = () => {
        dispatch(deselectAll(allTodos.filter(todo => todo.isSelected)));

        // Get rid of checkboxes
        const todoPanel = document.querySelector('.panel-main .todo-list-container');
        const allTodoInputs = todoPanel.querySelectorAll('input[type="checkbox"]');
        allTodoInputs.forEach((input) => input['checked'] = false);
    }

    function closeWindow() {
        deselectAllTodos();
        setTodoView(null);
    }

    return (
        <div className='blur-bg'>
            <div className='panel-main'>
                <h2> Remove posts </h2>
                <TodoList includeCheckboxes={true} />

                <button onClick={() => checkRemoveConditions()}> Remove selected </button>
                <div>
                    <button onClick={() => deselectAllTodos()}> Deselect all </button>
                    <button onClick={() => closeWindow()}> Close </button>
                </div>
            </div>
        </div>
    )
}