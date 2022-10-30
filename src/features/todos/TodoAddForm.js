import react, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from './todosSlice';
import { nanoid } from '@reduxjs/toolkit';

export const TodoAddForm = ({setTodoView}) => {

    const dispatch = useDispatch();

    const [todoTitle, setTodoTitle] = useState('');
    const [todoColor, setTodoColor] = useState('');

    const onTodoTitleChange = e => setTodoTitle(e.target.value);
    const onTodoColorChange = e => setTodoColor(e.target.value);

    const checkCreateConditions = () => {
        if(!todoTitle || !todoColor) return;
        //console.warn('Todo can be made !');
        dispatch(addTodo({
            id: nanoid(),
            name: todoTitle,
            color: todoColor,
            isSelected: false,
            isDropdownExpanded: false
        }))

       closeFormWindow();
    }

    function closeFormWindow() {
        // Thanks to this close declaration, we no longer have to setTodoTitle and such to their basic values
        setTodoView(null); 
    }

    return (
        <section>
            <h1> ADD NEW TODO ! </h1>
            <form>
                <label htmlFor='todoTitle'> Todo title: </label>
                <input
                    type="text"
                    id="todoTitle"
                    value={todoTitle}
                    onChange={onTodoTitleChange}
                    placeholder="How would you call it ?"
                />

                <label htmlFor='todoColor'> Pick a color: </label>
                <input 
                    type="text"
                    id="todoColor"
                    value={todoColor}
                    onChange={onTodoColorChange}
                    placeholder="Color however you wish"
                />
            </form>
            <button onClick={() => {checkCreateConditions()}}> Create todo ! </button>
            <div>
                <button onClick={() => {closeFormWindow()}} > Close </button>
            </div>
        </section>
    )
}