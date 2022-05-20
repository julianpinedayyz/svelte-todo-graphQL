import updateTodo from './queries/updateTODO.svelte';
import readTodoQuery from './queries/getTODOS.svelte';
// import { writable } from 'svelte/store';

export let newTitle = '';
// export todoID;
export let onBlur;

const quickUpdateStore = (id) => (event) => {
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

export const quickUpdate = quickUpdateStore();


// function createPosts() {
//   const {subscribe, set, update} = writable([]);

//   return {
//     subscribe,
//     fetchAll: () => {
//       const fetchedPosts = fetchPosts();
//       set(fetchedPosts);
//     }
//   }
// }

// export const posts = createPosts();