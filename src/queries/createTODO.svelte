<script context="module">
  import { gql } from '@apollo/client';

  export const createTodoMutation = gql`
    mutation ($todoTitle: String!, $todoDone: Boolean, $completeBy: Date) {
      createTodo(
        input: {
          todo: { title: $todoTitle, done: $todoDone, completeBy: $completeBy }
        }
      ) {
        todo {
          id
          title
          done
          completeBy
        }
      }
    }
  `;
</script>
