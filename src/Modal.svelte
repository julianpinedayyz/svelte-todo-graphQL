<!-- Modal with svelma -->
<!-- https://c0bra.github.io/svelma/install/ -->
<script>
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';

  import { Button, ModalCard, Field, Input } from 'svelma';
  import Fa from 'svelte-fa';

  let active = false;
</script>

<Button class="block" on:click={() => active = !active}><Fa icon={faPenAlt}/></Button>
<ModalCard bind:active={active} title="My Modal Title">
  <Field label="Textarea">
    <Input type="textarea" maxlength="200" />
  </Field>
</ModalCard>