<script context="module">
  import { gql } from "@apollo/client";

  export const deleteTodoMutation = gql`
    mutation ($todoID: Int!) {
      deleteTodoById(input: {id: $todoID}) {
        todo {
          id
        }
      }
    }
  `;
</script>