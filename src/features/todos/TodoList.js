import './styles/todoList.css';

import { useDispatch, useSelector } from 'react-redux';
import todosSlice,
{
    removeTodo,
    markAsSelected,
    expandDropdown,
} from './todosSlice';


export const TodoList = ({includeCheckboxes, setTodoView}) => {
    const dispatch = useDispatch();

    const allTodos = useSelector(state => state.todos)
    //console.log(allTodos);

    function markTodo(index) {
        dispatch(markAsSelected(index))
    }

    function checkDropdownConditions(todoIndex, includeCheckboxes, target) {
        if(includeCheckboxes) return;
        if(!target.classList.contains('todo-list__item')) return;
        const alreadyExpandedTodo = allTodos.find(todo => todo[`isDropdownExpanded`] === true)
        console.log(alreadyExpandedTodo);
        dispatch(expandDropdown({todoIndex,  alreadyExpandedTodo}))
    }

    function deleteTodo(todoIndex) {
        dispatch(removeTodo(todoIndex))
    }

    const renderedTodos = allTodos.map((todo, index) => {
        return (
            <li className={(includeCheckboxes)? "todo-list__item--small" : 'todo-list__item'} key={todo.name + index} style={{color: todo.color}}
               onClick={(e) => { checkDropdownConditions(index, includeCheckboxes, e.target)} }
            > 
                {todo.name} 
                {(includeCheckboxes && 
                    <span> 
                        <label htmlFor={`option-${index}`}> </label>
                        <input id={`option-${index}`} type="checkbox" onClick={(e) => {/* console.warn(e.target['checked']); */ markTodo(index)}}></input> 
                    </span>    
                        
                )}

                {((todo.isDropdownExpanded && !includeCheckboxes) && 
                    <span>
                        <button onClick={() => {setTodoView('edit')}}> Edit Todo </button>
                        <button onClick={() => {deleteTodo(index)}}> Delete Todo </button>
                    </span>    
                )}
            </li>
        )
    })

    return (
        <div className='todo-list-container'>
            <ul className='todo-list'>
                {renderedTodos}
            </ul>
        </div>
    )
}