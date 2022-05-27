<script context="module">
  import { gql } from '@apollo/client';

  export const createTodoMutation = gql`
    mutation ($todoTitle: String!, $todoDone: Boolean) {
      createTodo(input: { todo: { title: $todoTitle, done: $todoDone } }) {
        todo {
          id
          title
          done
        }
      }
    }
  `;
</script>
