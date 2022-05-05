<script>
  import { InMemoryCache, ApolloClient } from "@apollo/client";
  import setClient from "svelte-apollo";
  import Todo from "./Todo.svelte";
  import Add from "./Add.svelte";


	export let name;

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

<main>
  <!-- <Todo /> -->
  <div style="text-align:center">
    <h1>Hello {name}!</h1>
    <h2>Svedos</h2>
    <Add/>
    <Todo/>
  </div>

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>