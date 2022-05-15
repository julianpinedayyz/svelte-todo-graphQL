<script context="module">
  import { gql } from '@apollo/client';

  export const deleteTodoMutation = gql`
    mutation ($todoID: Int!) {
      deleteTodo(input: { id: $todoID }) {
        todo {
          id
        }
      }
    }
  `;
</script>
