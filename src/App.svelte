<script>
  import StatusNav from './StatusNav.svelte';
  import Todo from './Todo.svelte';
  import Add from './Add.svelte';
  import { InMemoryCache, ApolloClient } from '@apollo/client';
  import { setClient } from 'svelte-apollo';
  import typeDefs from './schema/schema.graphql';
  import './app.scss';

  // Resolver map
  const resolvers = {
    Query: {
      getTodo() {
        return getTodos;
      },
    },
  };

  // To run the client
  // postgraphile -c "postgres://localhost:5432/test" --watch -p 5055 --cors --enhance-graphiql --extended-errors hint,detail,errcode -append-plugins @graphile-contrib/pg-simplify-inflector
  export const client = new ApolloClient({
    uri: 'http://localhost:5055/graphql',
    cache: new InMemoryCache({
      // If true, the cache automatically adds __typename fields
      // to all objects in outgoing queries, removing the need to add them manually.
      // addTypename: false
    }),
    typeDefs,
    resolvers,
    csrfPrevention: true,

    onError: function ({ networkError, graphQLErrors }) {
      console.log('graphQLErrors', graphQLErrors);
      console.log('networkError', networkError);
    },
  });

  setClient(client);

  import { mutation, query } from 'svelte-apollo';
  import { readTodoQuery } from './queries/getTODOS.svelte';
  import { createTodoMutation } from './queries/createTODO.svelte';
  export let id = '';
  export let title = '';
  export let done = '';
  export let createdAt = '';
  export let completedAt = '';
  export let updatedAt = '';
  export let completeBy = '';
  export const todos = query(readTodoQuery, {
    variables: {
      id,
      title,
      done,
      createdAt,
      completedAt,
      updatedAt,
      completeBy,
    },
  });
  $: todos.refetch({
    id,
    title,
    done,
    createdAt,
    completedAt,
    updatedAt,
    completeBy,
  });
  export const createTodo = mutation(createTodoMutation);
</script>

<!--  -->
<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css"
  />
  <link rel="stylesheet" href="/build/compsBundle.css" />
  <script
    src="https://kit.fontawesome.com/9468b47b6e.js"
    crossorigin="anonymous"></script>
</svelte:head>
<main>
  <h1>GRAPHQL LIST OF PENDINGS</h1>
  <Add {createTodo} />
  <StatusNav {todos} />
  <Todo {todos}>
    <slot name="update"><!-- optional fallback --></slot>
  </Todo>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 20px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 40px;
    margin-bottom: 30px;
    font-weight: 100;
  }
</style>
