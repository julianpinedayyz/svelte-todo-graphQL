<script>
  import { InMemoryCache, ApolloClient } from "@apollo/client";
  import {setClient} from "svelte-apollo";
  import Todo from "./Todo.svelte";
  import Add from "./Add.svelte";

  import Fa from 'svelte-fa'
  import { faFlag, faPlus } from '@fortawesome/free-solid-svg-icons';

  export const client = new ApolloClient({
    uri: "http://localhost:5055/graphql",
    cache: new InMemoryCache(),

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
  <h1>GRAPHQL LIIST OF PENDINGS</h1>
  <Add/>
  <Todo/>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 50px;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>