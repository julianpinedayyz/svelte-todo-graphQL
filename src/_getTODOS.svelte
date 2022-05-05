<script context="module">
  import { gql } from "@apollo/client";

  export const GETTODO = gql`
    query allData {
      allTodos {
        nodes {
          id
          title
          done
        }
      }
    }
  `;
</script>