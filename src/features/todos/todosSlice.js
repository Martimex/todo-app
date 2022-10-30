import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const initialState = [
    {id: 'sguhruqw1234',   name: 'Shopping list', color: 'blue', isSelected: false, isDropdownExpanded: false},
    {id: 'sasdf3uqw2334',  name: 'Household chores', color: 'red', isSelected: false, isDropdownExpanded: false},
    {id: 'sgsgfsdasdq4a',  name: 'Novels to read', color: 'cyan', isSelected: false, isDropdownExpanded: false},
    {id: 'sghru345455234', name: 'Collected Pokemons', color: 'yellow', isSelected: false, isDropdownExpanded: false},
]

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.push(action.payload);
        },

        updateTodo(state, action) {
            const { id, name, color } = action.payload;
           // console.warn(color, name);
            const todoToUpdate = state.find(todo => todo.id === id);
            if(todoToUpdate) {
                todoToUpdate.name = name;
                todoToUpdate.color = color;
            } 
        },

        markAsSelected(state, action) {
            state[action.payload].isSelected = !state[action.payload].isSelected;
        },

        removeTodo(state, action) {
            //console.log(action.payload);
            state[action.payload].isDropdownExpanded = !state[action.payload].isDropdownExpanded;
            state.splice(action.payload, 1);
        },

        removeSelected(state, action) {
            for(let marked_todo of action.payload) {
                const existingTodo = state.find(todo => todo.id === marked_todo.id);
                state.splice(state.indexOf(existingTodo), 1);
            }
        },

        deselectAll(state, action) {
            for(let marked_todo of action.payload) {
                const todoToDeselect = state.find(todo => todo.id === marked_todo.id);
                state[state.indexOf(todoToDeselect)].isSelected = !state[state.indexOf(todoToDeselect)].isSelected;
            }
        },

        expandDropdown(state, action) {
            //console.log(action.payload[`alreadyExpandedTodo`]);
            state[action.payload[`todoIndex`]].isDropdownExpanded = !state[action.payload[`todoIndex`]].isDropdownExpanded;

            if(action.payload[`alreadyExpandedTodo`]) { 
                const todoToAbridge = state.find(todo => todo.id === action.payload[`alreadyExpandedTodo`].id)
                console.log(state[state.indexOf(todoToAbridge)]);
                state[state.indexOf(todoToAbridge)].isDropdownExpanded = false;
            }
        },
    }
})

export const { addTodo, updateTodo, markAsSelected, removeTodo, removeSelected, deselectAll, expandDropdown } = todosSlice.actions;

export default todosSlice.reducer;