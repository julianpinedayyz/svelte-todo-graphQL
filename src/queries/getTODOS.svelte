<script context="module">
  import { gql } from '@apollo/client';

  export const readTodoQuery = gql`
    query getTodo {
      todosList {
        id
        title
        done
      }
    }
  `;
</script>
