<script>
  import { readTodoQuery } from './queries/getTODOS.svelte';
  import Icon from './Icon.svelte';

  let todoTitle = '';
  let todoDone = false;
  export let createTodo;

  async function handleSubmit(e) {
    e.preventDefault();
    //An input field can have whitespaces, we want to prevent that.
    // Use String.prototype.trim()
    if (!todoTitle.trim().length) {
      todoTitle = '';
      return false;
    } else {
      try {
        await createTodo({
          variables: {
            todoTitle,
            todoDone,
          },
          refetchQueries: [
            readTodoQuery, // DocumentNode object parsed with gql
            'getTodo', // Query name
          ],
        });
      } catch (e) {
        console.error('error: ', e);
      } finally {
        todoTitle = '';
        todoDone = false;
      }
    }
  }
</script>

<section class="section">
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
</style>
