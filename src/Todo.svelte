<script>
  import { mutation, query } from 'svelte-apollo';
  import { readTodoQuery } from './queries/getTODOS.svelte';
  import { deleteTodoMutation } from './queries/deleteTODO.svelte';
  import Fa from 'svelte-fa';
  import { Button } from 'svelma';
  import {
    faArrowRotateLeft,
    faCheck,
    faTrashAlt,
    faPenAlt,
  } from '@fortawesome/free-solid-svg-icons';
  // import {interpret} from 'xstate';
  // import {toggleMachine} from './machine';
  import { updateTodoMutation } from './queries/updateTODO.svelte';
  // 1import { marked } from 'marked';
  import ModalCard from './ModalCard.svelte';
  let active = false;

  const todos = query(readTodoQuery);

  const listTasks = async () => {
    const reply = query(readTodoQuery);
    reply.subscribe((data) => console.log('todosList', data));
  };

  listTasks();

  const deleteTodo = mutation(deleteTodoMutation);
  let todoID = 0;

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

  const updateTodo = mutation(updateTodoMutation);
  let todoStatus = false;

  async function handleUpdate(todoID, todoStatus) {
    try {
      await updateTodo({
        variables: {
          todoID,
          todoStatus: !todoStatus,
        },
      });
    } catch (e) {
      console.error('error: ', e);
    } finally {
      todoID = 0;
      todoStatus = false;
    }
  }
  let modalContent;
  async function handleEdit(todoID, todoTitle) {
    console.log(todoTitle);
    console.log(todoID);
    active = !active;
    try {
      modalContent = todoTitle;

      if (closeSuccess() == true) {
        console.log(modalContent);
        // await updateTodo({
        //   variables: {
        //     todoID,
        //     todoTitle: modalContent,
        //   },
        // });
      }
    } catch (e) {
      console.error('error: ', e);
    } finally {
      modalContent = '';
    }
  }
  // on:click={(e) => handleEdit(id, title)}
  let newTitle = '';
  let onBlur;
  const handleQuickUpdate = (id) => (event) => {
    newTitle = event.target.innerText;
    onBlur = () => {
      try {
        updateTodo({
          variables: {
            todoID: id,
            todoTitle: newTitle.toString(),
          },
          refetchQueries: [
            readTodoQuery, // DocumentNode object parsed with gql
            'getTodo', // Query name
          ],
        });
      } catch (e) {
        console.error('error: ', e);
      } finally {
        todoID = 0;
        newTitle = '';
      }
    };
  };
</script>

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
        {#each [...$todos.data.todosList].reverse() as { id, title, done }, i}
          <tr>
            <td><span class="tag">{id}</span></td>
            <td class="has-text-left"
              ><p
                contenteditable="true"
                on:input={handleQuickUpdate(id)}
                on:blur={onBlur}
              >
                {title}
              </p>
            </td>
            {#if done == false}
              <td
                ><Button
                  type="is-success"
                  on:click={(e) => handleUpdate(id, done)}
                  ><Fa icon={faCheck} /></Button
                ></td
              >
              <td
                ><Button
                  class="js-modal-trigger"
                  data-target="editModal"
                  on:click={() => handleEdit(id, title)}
                  ><Fa icon={faPenAlt} /></Button
                ></td
              >
            {:else}
              <td><Button disabled>Done</Button></td>
              <td
                ><Button
                  type="is-warning"
                  on:click={(e) => handleUpdate(id, done)}
                  ><Fa icon={faArrowRotateLeft} /></Button
                ></td
              >
            {/if}
            <td>
              <button
                class="button is-danger is-outlined"
                on:click|preventDefault={handleDelete(id)}
              >
                <Fa icon={faTrashAlt} />
              </button>
            </td>
          </tr>
        {/each}
        <!-- <tr><td>createdAt</td><td><span class="tag">{fd(st.data.task.createdAt)}</span></td></tr> -->
        <!-- <tr><td>updatedAt</td><td><span class="tag">{fd(st.data.task.updatedAt)}</span></td></tr> -->
        <!-- <tr><td>isActive</td><td></td></tr> -->
        <!-- <tr><td>owner</td><td><span class="tag">{st.data.task.userId}</span></td></tr> -->
      </tbody>
    </table>
  {/if}
  <ModalCard bind:active title="Edit Todo" saveButton="Save Todo's Edit">
    <textarea class="textarea is-primary" bind:value={modalContent} />
    <!-- <div>
      {@html marked(modalContent)}
    </div> -->
  </ModalCard>
</section>

<style lang="scss">
  .todosTable {
    width: 100%;
    .nameTag {
      text-align: left;
    }
  }
  .textarea {
    width: 100%;
  }
</style>
