<script>
  import { onMount, createEventDispatcher } from 'svelte'

  export let step
  export let once = false
  export let rootMargin = `-${0.5 * 100}% 0% -${100 - 0.5 * 100}% 0%`
  let intersecting = false
  let container

  const dispatch = createEventDispatcher()

  onMount(() => {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          intersecting = entry.isIntersecting

          if (intersecting) {
            dispatch('step', step)
          }

          if (intersecting && once) {
            observer.unobserve(container)
          }
        },
        {
          rootMargin,
        }
      )

      observer.observe(container)
      return () => observer.unobserve(container)
    }

    function handler() {
      if (intersecting && once) {
        window.removeEventListener('scroll', handler)
      }
    }

    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  })
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  div {
    width: 100%;
    height: auto;
  }
</style>

<div bind:this={container}>
  <slot {intersecting}><span>I'm an IntersectionObserver</span></slot>
</div>
