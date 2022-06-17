module.exports = {
  client: {
    tagName: "graphql",
    service: {
      name: "svelte-todo-graphQL",
      url: "http://localhost:5055/graphql",
      localSchemaFile: "./src/schema/schema.graphql",
    },
    includes: ["./src/**/*.js"],
    excludes: ["**/__tests__/**"],
  },
};