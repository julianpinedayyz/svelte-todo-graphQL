<script context="module">
  import { gql } from '@apollo/client';

  export const updateTodoMutation = gql`
    mutation ($todoID: Int!, $todoStatus: Boolean, $title: String) {
      updateTodo(
        input: { id: $todoID, patch: { done: $todoStatus, title: $title } }
      ) {
        todo {
          id
          title
          done
        }
      }
    }
  `;
</script>
