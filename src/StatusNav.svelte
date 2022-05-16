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
      <p class="heading">Followers</p>
      <p class="title">456K</p>
    </div>
  </div>
  <div class="level-item has-text-centered">
    <div>
      <p class="heading">Likes</p>
      <p class="title">789</p>
    </div>
  </div>
</nav>
