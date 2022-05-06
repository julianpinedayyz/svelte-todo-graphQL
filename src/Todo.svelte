<script>
  import { query } from "svelte-apollo";
  import { GETTODO } from "./queries/getTODOS.svelte";

  const todos = query(GETTODO);
</script>

<style>
  /* .done {
    text-decoration: line-through;
  } */
</style>
<section class="section">
  {#if $todos.loading}
    <span class="spinner-loader" style="margin-top: 10em">Loading…</span>
  {:else if $todos.error}
    Error: {$todos.error.message}
  {:else}
    <table class="table is-hoverable is-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <!-- <th>Created at</th>
          <th>Status</th> -->
          <th>Done?</th>
        </tr>
      </thead>
      <tbody>
        {#each $todos.data.allTodos.nodes as todo}
          <tr>
            <td><span class="tag">{todo.id}</span></td>
            <td class="has-text-left">{todo.title}</td>
            <td>{todo.done}</td>
          </tr>
        {/each}
        <!-- <tr><td>id</td></tr> -->
        <!-- <tr><td>name</td><td></td></tr> -->
        <!-- <tr><td>createdAt</td><td><span class="tag">{fd(st.data.task.createdAt)}</span></td></tr> -->
        <!-- <tr><td>updatedAt</td><td><span class="tag">{fd(st.data.task.updatedAt)}</span></td></tr> -->
        <!-- <tr><td>isActive</td><td></td></tr> -->
        <!-- <tr><td>owner</td><td><span class="tag">{st.data.task.userId}</span></td></tr> -->
      </tbody>
    </table>
  {/if}
</section>
