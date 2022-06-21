<script>
  import { onMount } from 'svelte';
  import { readTodoQuery } from './queries/getTODOS.svelte';
  import Icon from './Icon.svelte';

  let todoTitle = '';
  let todoDone = false;
  let completeBy = '';
  export let createTodo;
  let now = new Date(),
    month,
    day,
    year;
  let dateString;

  onMount(() => {
    (month = '' + (now.getMonth() + 1)),
      (day = '' + now.getDate()),
      (year = now.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    // Adding 7 days to the current date for the completeBy date as the default value
    dateString = [year, month, parseInt(day) + 7].join('-');
  });

  async function handleSubmit(e) {
    e.preventDefault();
    //An input field can have whitespaces, we want to prevent that.
    // Use String.prototype.trim()
    if (!todoTitle.trim().length) {
      todoTitle = '';
      return false;
    } else {
      try {
        completeBy = dateString;
        await createTodo({
          variables: {
            todoTitle,
            todoDone,
            completeBy,
          },
          // update: (cache, { data }) => {
          //   const existingTodos = cache.readQuery({ query: readTodoQuery });
          //   console.log(existingTodos.todosList);
          //   // Add the new todo to the cache
          //   console.log('cache updated', data);
          //   const newTodo = data.createTodo;
          //   newTodo.todo.completedAt = newTodo.todo.completedAt
          //     ? newTodo.todo.completedAt
          //     : null;
          //   console.log('newTodo', newTodo);
          //   const newTodos = [...existingTodos.todosList, newTodo];
          //   console.log('newTodos', newTodos);
          //   cache.writeQuery({
          //     query: readTodoQuery,
          //     data: { todosList: newTodos },
          //   });
          // },
          refetchQueries: [readTodoQuery],
        });
      } catch (e) {
        console.error('error: ', e);
      } finally {
        todoTitle = '';
        todoDone = false;
        completeBy = '';
      }
    }
  }
</script>

<section class="section py-1">
  <div class="content">
    <div class="columns">
      <div class="column is-full quickTodo">
        <form class="field has-addons" on:submit|preventDefault={handleSubmit}>
          <p class="control is-expanded">
            <label class="is-sr-only" for="todo-title">Quick Todo</label>
            <input
              class="input"
              type="text"
              placeholder="new todo"
              id="todo-title"
              bind:value={todoTitle}
            />
          </p>
          <p class="control">
            <span class="is-block">
              <!-- Reference to the new Date() solution below -->
              <!-- https://stackoverflow.com/questions/17182544/disable-certain-dates-from-html5-datepicker -->
              <input
                type="date"
                class="input is-normal"
                bind:value={dateString}
                min={new Date().toISOString().split('T')[0]}
              /></span
            >
            <span class="is-size-7 dateGreen">Due date: {dateString}</span>
          </p>
          <p class="control">
            <button class="button is-primary" type="submit">
              <span class="icon-text">
                <span class="icon">
                  <Icon pack="fa" size="" icon="square-plus" isLeft="true" />
                </span>
                <span>Quick Todo</span>
              </span>
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .input.is-normal {
    height: 40px;
  }
</style>
