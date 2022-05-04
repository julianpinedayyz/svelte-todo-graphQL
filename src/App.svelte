<script>
  import { InMemoryCache, ApolloClient, gql } from "@apollo/client";
  import { setClient, query, mutation } from "svelte-apollo";


	export let name;

  const client = new ApolloClient({
    uri: "http://localhost:5055/graphql",
    cache: new InMemoryCache(),

    onError: function ({networkError, graphQLErrors }) {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
  });

  setClient(client);

  const GETTODO = gql`
    query allData {
      allTodos {
        nodes {
          id
          title
          done
        }
      }
    }
  `;

  const reply = query(GETTODO);



</script>

<main>
  <!-- <Todo /> -->
  <div style="text-align:center">
    <h1>Hello {name}!</h1>
    <h2>Svedos</h2>


    {#if $reply.loading}
      Loading...
    {:else if $reply.error}
      Error: {$reply.error.message}
    {:else}
      {#each $reply.data.allTodos.nodes as task}
        <p>{task.id} {task.title} {task.done}</p>
      {/each}
    {/if}
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