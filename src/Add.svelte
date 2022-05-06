<script>
  import { mutation } from "svelte-apollo";
  import { ADDTODO } from "./queries/addTODOS.svelte";
  import { GETTODO } from "./queries/getTODOS.svelte";
  import Fa from 'svelte-fa'
  import { faPlus } from '@fortawesome/free-solid-svg-icons'

  let todoTitle = "";
  let todoDone = false;

  const addTodo = mutation(ADDTODO);

  async function handleSubmit(e) {
    e.preventDefault();
    //An input field can have whitespaces, we want to prevent that.
    // Use String.prototype.trim()
    if(!todoTitle.trim().length){
      todoTitle = "";
      return false;
    }
    else {
      try {
        await addTodo({
          variables: {
            todoTitle,
            todoDone },
          refetchQueries: [
            GETTODO, // DocumentNode object parsed with gql
            'allData' // Query name
          ]
        });
      } catch (e) {
          console.error("error: ", e);
      }
       finally {
          todoTitle = "";
          todoDone = false;
       }
    }
  }
</script>

<style lang="scss">
  .container{
    margin-bottom: 40px;
  }
</style>

<section class="section">
  <div class="container is-fluid">
    <div class="columns is-centered">
      <div class="field has-addons">
        <form class="is-flex" on:submit|preventDefault="{handleSubmit}">
          <div class="control">
            <label class="is-sr-only" for="todo-title">Title</label>
            <input class="input" type="text" placeholder="new todo" id="todo-title" bind:value="{todoTitle}" />
            <label class="is-sr-only" for="todo-done">Done Checkmark</label>
            <!-- <input type="checkbox" id="todo-done" bind:checked="{todoDone}" class="is-checkradio"/> -->
          </div>
          <div class="control">
            <button class="button is-primary" type="submit"><Fa icon={faPlus} /></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>