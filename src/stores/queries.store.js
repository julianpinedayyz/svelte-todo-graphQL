import { writable } from 'svelte/store';
import { mutation, query } from 'svelte-apollo';
import { createTodoMutation } from '../queries/createTODO.svelte';
import { readTodoQuery } from '../queries/getTODOS.svelte';
import { deleteTodoMutation } from '../queries/deleteTODO.svelte';
import { updateTodoMutation } from '../queries/updateTODO.svelte';

// function createQueries() {
//   const { subscribe , set, update } = writable();

//   return {
//     subscribe,
//     todos: () => set(() => query(readTodoQuery)),
//     createTodo: () => update(() => mutation(createTodoMutation)),
//     deleteTodo: () => update(() => mutation(deleteTodoMutation)),
//     updateTodo: () => update(() => mutation(updateTodoMutation)),
//   };
// }
export const queries = {
  todos: query(readTodoQuery),
};