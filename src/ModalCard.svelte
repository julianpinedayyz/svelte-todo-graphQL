<script>
  import { onDestroy, onMount, createEventDispatcher } from 'svelte';
  import { chooseAnimation, isEscKey } from './utils/index';
  import { scale } from 'svelte/transition';

  export let active = false;
  export let title = 'Modal Title';
  export let animation = scale;
  // export let animProps = { duration: 2000 };
  export let size = '';
  export let showClose = true;
  export let onBody = true;
  export let saveButton = 'Save changes';
  export let success = true;

  const dispatch = createEventDispatcher();
  let modal;

  $: _animation = chooseAnimation(animation);
  $: {
    if (modal && active && onBody) {
      document.body.appendChild(modal);
    }
  }

  onMount(() => {});

  function close() {
    active = false;
  }

  function keydown(e) {
    if (active && isEscKey(e)) {
      close();
    }
  }

  export function closeSuccess() {
    dispatch('success', success);
    console.log(success);
    close();
    return success;
  }

  function closeFailure() {
    dispatch('failure');
    close();
  }
</script>

<svelte:window on:keydown={keydown} />

<div class="modal {size}" class:is-active={active} bind:this={modal}>
  <div class="modal-background" on:click={close} />
  <div class="modal-card" transition:scale={{ start: 100, duration: 2000 }}>
    <header class="modal-card-head">
      <p class="modal-card-title">{title}</p>
      <button class="delete" aria-label="close" on:click={close} />
    </header>
    <section class="modal-card-body">
      <slot />
    </section>
    <footer class="modal-card-foot">
      <button class="button is-success" on:click={closeSuccess}
        >{saveButton}</button
      >
      <button class="button" on:click={closeFailure}>Cancel</button>
    </footer>
  </div>
</div>
