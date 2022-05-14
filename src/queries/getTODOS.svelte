<script context="module">
  import { gql } from "@apollo/client";

  export const readTodoQuery = gql`
    query getTodo {
      todos {
        nodes {
          id
          title
          done
        }
      }
    }
  `;
</script>