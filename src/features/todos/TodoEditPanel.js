import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import todosSlice, 
{
    markAsSelected,
    updateTodo
} from "./todosSlice";

import './styles/todoRemovePanel.css';

export const TodoEditPanel = ({ setTodoView }) => {

    const dispatch = useDispatch();

    const allTodos = useSelector(state  => state.todos);
    const targetedTodo = allTodos.find((todo, index) => todo.isDropdownExpanded);
    const editedPost_index = allTodos.indexOf(targetedTodo);

    const [todoTitle, setTodoTitle] = useState(targetedTodo.name);
    const [todoColor, setTodoColor] = useState(targetedTodo.color);

    const onTodoTitleChange = e => setTodoTitle(e.target.value);
    const onTodoColorChange = e => setTodoColor(e.target.value);

    const checkUpdateConditions = () => {
        if(!todoTitle || !todoColor) return;

        // Dispatch dla update'u

        // 1. ZRób dispatch dla updatowania - DONE
        // 2. Przy closeform window wyłącz isDropdownExpanded dla właśnie zedytowanego todo 
        dispatch(updateTodo({id: targetedTodo.id, name: todoTitle, color: todoColor}))

        closeFormWindow();
    }

    function closeFormWindow() {
        // Thanks to this close declaration, we no longer have to setTodoTitle and such to their basic values
        //dispatch(markAsSelected(editedPost_index)); ?? SHOULD WE UPDATE THAT ??
        setTodoView(null); 
    }

    return (
        <div className='blur-bg'>
            <div className='panel-main'>
                <h1> EDIT NEW TODO ! </h1>
                <form>
                    <label htmlFor='todoTitle'> Todo title: </label>
                    <input
                        type="text"
                        id="todoTitle"
                        value={todoTitle}
                        onChange={onTodoTitleChange}
                        placeholder={todoTitle}
                    />

                    <label htmlFor='todoColor'> Pick a color: </label>
                    <input 
                        type="text"
                        id="todoColor"
                        value={todoColor}
                        onChange={onTodoColorChange}
                        placeholder={todoColor}
                    />
                </form>
                <button onClick={() => {checkUpdateConditions()}} > Update todo </button>
                <div>
                    <button onClick={() => {closeFormWindow()}} > Close </button>
                </div>
            </div>
    </div>
    )
}