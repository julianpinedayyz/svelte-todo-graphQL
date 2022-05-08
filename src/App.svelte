<script>
  import { InMemoryCache, ApolloClient, gql } from "@apollo/client";
  import { setClient } from "svelte-apollo";
  import Todo from "./Todo.svelte";
  import Add from "./Add.svelte";
  import Fa from 'svelte-fa';


  const typeDefs = gql`
    type Todo {
      id: Int!
      title: String!
      done: Boolean
    }
    input TodoInput {
      title: String!
      done: Boolean
    }

    type Query {
      getTodo(id: Int!): [Todo]
    }

    type Mutation {
      createTodo(input: TodoInput): Todo
      deleteTodoById(id: Int!): Todo
    }
  `;
  // Resolver map
  // const resolvers = {
  //   Query: {
  //     getTodo() {
  //       return getTodos;
  //     }
  //   },
  // };

  export const client = new ApolloClient({
    uri: "http://localhost:5055/graphql",
    cache: new InMemoryCache({
      // If true, the cache automatically adds __typename fields
      // to all objects in outgoing queries, removing the need to add them manually.
      addTypename: false
    }),
    // resolvers,
    typeDefs,
    csrfPrevention: true,

    onError: function ({networkError, graphQLErrors }) {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
  });

  setClient(client);

</script>
<svelte:head>
  <style src="./scss-entrypoint.scss"></style>
</svelte:head>
<main>
  <h1>GRAPHQL LIST OF PENDINGS</h1>
  <Add/>
  <Todo/>
</main>

<style>
  main {
    text-align: center;
    padding: 20px;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 36px;
    font-weight: 100;
    margin-bottom: 40px;
  }
</style>