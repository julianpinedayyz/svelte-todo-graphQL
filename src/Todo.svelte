<script>
  import { mutation, query } from 'svelte-apollo';
  import { readTodoQuery } from './queries/getTODOS.svelte';
  import { deleteTodoMutation } from './queries/deleteTODO.svelte';
  import { updateTodoMutation } from './queries/updateTODO.svelte';

  import { onMount } from 'svelte';
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
          todoID: todoID,
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

  import ModalCard from './ModalCard.svelte';

  let active = false;
  let modalContent;
  let success = false;
  let closeModal;
  let openModal;
  let modalCardcomponent;
  let saveButton = "Save Todo's Edit";

  $: console.log(modalContent);

  onMount(() => {
    openModal = (id, title) => {
      console.log('from inside the Modal component');
      console.log(id);
      console.log(title);
      active = true;
      console.log(success);
      modalContent = title;
      todoID = id;
    };

    closeModal = () => {
      console.log(modalContent);
      console.log(todoID);
      async function handleEdit(modalContent) {
        console.log(modalContent);
        try {
          await updateTodo({
            variables: {
              todoID,
              todoTitle: modalContent,
            },
          });
        } catch (e) {
          console.error('error: ', e);
        } finally {
          console.log(modalContent);
          modalContent = '';
          active = !active;
          todoID = 0;
          modalCardcomponent.closeSuccess();
        }
      }
      handleEdit();
      console.log('clicked on closeModal');
    };
  });
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
        {#each [...$todos.data.todosList].reverse() as { id, title, done }}
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
                  on:click={() => handleUpdate(id, done)}
                  ><Fa icon={faCheck} /></Button
                ></td
              >
              <td
                ><Button
                  class="js-modal-trigger"
                  data-target="editModal"
                  on:click={() => openModal(id, title)}
                  ><Fa icon={faPenAlt} /></Button
                ></td
              >
            {:else}
              <td><Button disabled>Done</Button></td>
              <td
                ><Button
                  type="is-warning"
                  on:click={() => handleUpdate(id, done)}
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
    <ModalCard bind:active title="Edit Todo" bind:this={modalCardcomponent}>
      <textarea class="textarea is-primary" bind:value={modalContent} />
      <footer class="modal-card-foot">
        <button class="button is-success" on:click={closeModal}
          >{saveButton}</button
        >
        <button class="button" on:click={modalCardcomponent.closeFailure}
          >Cancel</button
        >
      </footer>
    </ModalCard>
  {/if}
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
