<script context="module">
  import { gql } from '@apollo/client';

  export const updateTodoMutation = gql`
    mutation ($todoID: Int!, $todoStatus: Boolean, $todoTitle: String) {
      updateTodo(
        input: { id: $todoID, patch: { done: $todoStatus, title: $todoTitle } }
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
