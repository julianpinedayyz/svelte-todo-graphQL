<script>
  import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
  import { Button } from 'svelma';
  import { deleteTodoMutation } from './queries/deleteTODO.svelte';
  import { readTodoQuery } from './queries/getTODOS.svelte';
  import { mutation } from 'svelte-apollo';
  import Fa from 'svelte-fa';

  export const queries = {
    deleteTodo: mutation(deleteTodoMutation),
  };

  export let todos;
  const deleteTodo = queries.deleteTodo;

  let todoID = 0;
  let id;

  async function handleDelete(todoID) {
    try {
      deleteTodo({
        variables: { todoID },
        refetchQueries: [
          readTodoQuery, // DocumentNode object parsed with gql
          'getTodo', // Query name
        ],
      });
    } catch (e) {
      console.error('error: ', e);
    } finally {
      todoID = 0;
    }
  }
</script>

<Button type="is-danger" on:click={() => handleDelete(id)}
  ><Fa icon={faTrashAlt} />{id}</Button
>
