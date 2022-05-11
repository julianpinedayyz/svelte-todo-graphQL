<script>
  import Modal from "./Modal.svelte";
  import { mutation, query } from "svelte-apollo";
  import { readTodoQuery} from "./queries/getTODOS.svelte";
  import { deleteTodoMutation } from "./queries/deleteTODO.svelte";
  import Fa from 'svelte-fa';
  import { Switch } from 'svelma';
  import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
  import { updateTodoMutation } from "./queries/updateTODO.svelte";

  const todos = query(readTodoQuery);

  const listTasks = async () => {
    const reply = query(readTodoQuery);
    reply.subscribe(data => console.log('list', data));
  };

  listTasks();

  const deleteTodo = mutation(deleteTodoMutation);
  let todoID = 0;

  async function handleDelete(todoID){
    try{
        deleteTodo({
          variables: { todoID },
          refetchQueries: [
            readTodoQuery, // DocumentNode object parsed with gql
            'getTodo' // Query name
          ]
      });
    } catch(e) {
        console.error("error: ", e);
    } finally {
      todoID = 0;
    }
  };

  const updateTodo = mutation(updateTodoMutation);
  let todoStatus = false;

  async function handleUpdate(todoID, todoStatus){
    try {
      await updateTodo({
        variables: {
          todoID,
          todoStatus: !todoStatus
        }
      });
    } catch (e) {
        console.error("error: ", e);
    } finally {
        todoID = 0;
        todoStatus = false;
    }
  }

</script>

<style lang="scss">
  .todosTable {
    width: 100%;
    .nameTag {
      text-align: left;
    }
  }
</style>
<section class="section">
  {#if $todos.loading}
    <span class="spinner-loader" style="margin-top: 10em">Loading…</span>
  {:else if $todos.error}
    Error: {$todos.error.message}
  {:else}
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Total Posts</p>
          <p class="title">{ $todos.data.allTodos.nodes.length }</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Completed</p>
          <p class="title">{ $todos.data.allTodos.nodes.filter(todo => todo.done).length}</p>
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
    <table class="todosTable table is-hoverable is-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th class="nameTag">Name</th>
          <!-- <th>Created at</th>
          <th>Status</th> -->
          <th>Status</th>
          <th>Edit</th>
          <th>Delete?</th>
        </tr>
      </thead>
      <tbody>
        {#each [...$todos.data.allTodos.nodes].reverse() as { id, title, done }, i}
          <tr>
            <td><span class="tag">{id}</span></td>
            <td class="has-text-left">{title}</td>
            <td>
              <Switch on:click={e => handleUpdate(id, done)}>{done}</Switch>
            </td>
            <td><Modal/></td>
            <td><button class="button is-danger is-outlined" on:click|preventDefault="{handleDelete(id)}"><Fa icon={faTrashAlt}/></button></td>
          </tr>
        {/each}
        <!-- <tr><td>createdAt</td><td><span class="tag">{fd(st.data.task.createdAt)}</span></td></tr> -->
        <!-- <tr><td>updatedAt</td><td><span class="tag">{fd(st.data.task.updatedAt)}</span></td></tr> -->
        <!-- <tr><td>isActive</td><td></td></tr> -->
        <!-- <tr><td>owner</td><td><span class="tag">{st.data.task.userId}</span></td></tr> -->
      </tbody>
    </table>
  {/if}
</section>