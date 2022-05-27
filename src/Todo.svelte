<script>
  import { mutation, query } from 'svelte-apollo';
  import { readTodoQuery } from './queries/getTODOS.svelte';
  import { deleteTodoMutation } from './queries/deleteTODO.svelte';
  import { updateTodoMutation } from './queries/updateTODO.svelte';

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

  export const queries = {
    deleteTodo: mutation(deleteTodoMutation),
    updateTodo: mutation(updateTodoMutation),
  };

  export let todos;
  const deleteTodo = queries.deleteTodo;
  const updateTodo = queries.updateTodo;

  const listTodos = async () => {
    const reply = query(readTodoQuery);
    reply.subscribe((data) => console.log('todosList', data));
  };

  listTodos();

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
  let closeModal;
  let openModal;
  let modalCardcomponent;
  let saveButton = "Save Todo's Edit";
  // for debugging purpose only
  // $: console.log(modalContent);
  openModal = (id, title) => {
    active = true;
    modalContent = title;
    todoID = id;
  };
  closeModal = () => {
    function handleEdit() {
      try {
        updateTodo({
          variables: {
            todoID: todoID,
            todoTitle: modalContent.toString(),
          },
          refetchQueries: [
            readTodoQuery, // DocumentNode object parsed with gql
            'getTodo', // Query name
          ],
        });
      } catch (e) {
        console.error('error: ', e);
      } finally {
        modalContent = '';
        active = !active;
        todoID = 0;
      }
    }
    handleEdit();
  };

  let newTitle = '';
  let onBlur;
  let reload;
  const handleQuickUpdate = (id) => (event) => {
    newTitle = event.target.innerText;
    onBlur = () => {
      if (newTitle === '' || /^\s*$/.test(newTitle) || newTitle.length === 0) {
        console.log("content can't be empty");
        // refectch or update value
      } else {
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
        {#each [...$todos.data.todosList].reverse() as { id, title, done, createdAt, completedAt }}
          <tr>
            <td><span class="tag">{id}</span></td>
            <td class="has-text-left">
              {#if done == false}
                <p
                  contenteditable="true"
                  on:input={handleQuickUpdate(id)}
                  on:blur={onBlur}
                >
                  {title}
                </p>
                <p class="is-size-7 dateGreen">{createdAt}</p>
              {:else}
                <div class="message is-success is-radiusless">
                  <p
                    contenteditable="false"
                    class="message-body is-radiusless px-2 py-3"
                  >
                    {title}
                  </p>
                  <p class="is-size-7 dateGreen">{completedAt}</p>
                </div>
              {/if}
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
  .dateGreen {
    color: teal;
    font-weight: 700;
  }
</style>
