<script lang="ts">
  export let src: string;
</script>

<svg
  class={`w-4 h-4 inline-block stroke-current ${$$restProps.class}`}
  viewBox="0 0 24 24"
  fill-rule="evenodd"
  clip-rule="evenodd"
  class:disabled={$$restProps.disabled}
>
  <path d={src} />
</svg>

<style lang="postcss">
  svg.disabled {
    @apply text-gray-100;
  }
</style>
