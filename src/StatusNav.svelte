<script>
  export let todos;
</script>

{#if $todos.loading}
  <span class="spinner-loader" style="margin-top: 10em">Loading…</span>
{:else if $todos.error}
  Error: {$todos.error.message}
{:else}
  <nav class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Total Posts</p>
        <p class="title">{$todos.data.todosList.length}</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Completed</p>
        <p class="title">
          {$todos.data.todosList.filter((todo) => todo.done).length}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Archived</p>
        <p class="title">
          {$todos.data.todosList.filter((todo) => todo.archived).length}
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">Deleted</p>
        <p class="title">
          {$todos.data.todosList.filter((todo) => todo.deleted).length}
        </p>
      </div>
    </div>
  </nav>
{/if}
