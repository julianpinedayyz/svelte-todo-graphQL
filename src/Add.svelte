<script>
  import { mutation } from "svelte-apollo";
  import { ADDTODO } from "./_addTODOS.svelte";

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

<style>
  /* .done {
    text-decoration: line-through;
  } */
<style lang="scss">
  .container{
    margin-bottom: 40px;
  }
</style>

<form on:submit|preventDefault="{handleSubmit}">
  <label for="todo-title">Title</label>
  <input type="text" placeholder="new todo" id="todo-title" bind:value="{todoTitle}" />

  <label for="todo-done">Pending/Done</label>
  <input type="checkbox" id="todo-done" bind:checked="{todoDone}" />

  <button type="submit">Add Todo</button>
</form>
