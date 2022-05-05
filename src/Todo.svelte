<script>
  import { query } from "svelte-apollo";
  import { GETTODO } from "./_getTODOS.svelte";

  const todos = query(GETTODO);
</script>

<style>
  /* .done {
    text-decoration: line-through;
  } */
</style>

<div style="text-align:center">
  {#if $todos.loading}
    Loading...
  {:else if $todos.error}
    Error: {$todos.error.message}
  {:else}
    {#each $todos.data.allTodos.nodes as todo}
      <p>{todo.id} {todo.title} {todo.done}</p>
    {/each}
  {/if}
</div>
