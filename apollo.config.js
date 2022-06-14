module.exports = {
  client: {
    service: {
      name: "svelte-todo-graphQL",
      url: "http://localhost:5055/graphql",
      localSchemaFile: "./src/schema/schema.graphql",
    },
  },
};