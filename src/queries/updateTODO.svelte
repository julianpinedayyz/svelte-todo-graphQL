<script context="module">
  import { gql } from "@apollo/client";

  export const updateTodoMutation = gql`
    mutation ($todoID: Int!, $todoStatus: Boolean) {
      updateTodoById(input: {id: $todoID, todoPatch: {done: $todoStatus}}) {
        clientMutationId
        todo {
          done
          id
        }
      }
    }
  `;
</script>



