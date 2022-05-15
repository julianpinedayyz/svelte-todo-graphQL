<script context="module">
  import { gql } from '@apollo/client';

  export const updateTodoMutation = gql`
    mutation ($todoID: Int!, $done: Boolean, $title: String) {
      updateTodo(
        input: { id: $todoID, patch: { done: $done, title: $title } }
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
