<script>
  import { zipcodes, activeZipcode, userInput } from 'stores'

  import * as animateScroll from 'svelte-scrollto'
  import Button from 'components/Button.svelte'

  $: isValid = false
  $: isEditing = true

  let zip
  export let className

  function scrollToFirstScene() {
    animateScroll.scrollTo({
      element: `[id='anchor-1.1']`,
      offset: -60,
      duration: 1500,
      delay: 0,
    })
  }

  const validate = (e) => {
    const value = zip.value
    isValid = $zipcodes.includes(value)
    isEditing = false

    if (isValid) {
      activeZipcode.set(value)
    }
    return isValid
  }

  const handleSubmit = (e) => {
    const valid = validate()
    disable(e)
    if (valid) {
      userInput.set(true)
    }

    setTimeout(() => {
      if (isValid) {
        scrollToFirstScene()
      }
    }, 50)
  }

  const disable = (e) => {
    e.target.classList.add('disabled')
    setTimeout(function () {
      e.target.classList.remove('disabled')
    }, 2000)
  }

  const handleRandom = (e) => {
    disable(e)
    setRandomZip()
    userInput.set(true)

    setTimeout(() => {
      scrollToFirstScene()
    }, 50)
  }

  const setRandomZip = () => {
    const randIndex = Math.floor(Math.random() * $zipcodes.length)
    zip.value = $zipcodes[randIndex]
    validate()
  }

  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      validate()
    } else {
      isEditing = true
    }
  }
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .form {
    position: relative;
    height: 35px;
    display: flex;
    justify-content: center;
    padding: 10px;
    max-width: 50%;
    outline: none;
    background-color: white;
    border: 2px solid $color-main-20;
    flex-direction: column;
    box-shadow: none;
    @include transition-s;

    @include respond-max-screen-phablet {
      max-width: 100%;
    }

    label {
      font-size: $font-size-s;
      letter-spacing: $letter-spacing-s;
      line-height: $line-height-m;
      color: $color-main-60;
    }
    button {
      position: absolute;
      right: 15px;
      top: 20px;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      border: 0px solid transparent;
      @include transition-s;
    }
  }

  .buttons {
    display: flex;
    font-size: $font-size-m;
    align-items: center;
    flex-direction: row;
    margin-top: 35px;

    @include respond-max-screen-phablet {
      justify-content: space-evenly;
    }
  }

  .error {
    font-size: $font-size-s;
    line-height: $line-height-m;

    @include respond-max-screen-phablet {
      text-align: center;
    }
  }

  .zipInput {
    background-color: transparent;
    border: 0px solid transparent;
    margin: 0;
    padding: 0;
    color: $color-main;
    font-family: 'Post Grotesk Bold';
    font-size: $font-size-s;

    &::placeholder {
    }
  }
</style>

<div>
  <form class="form {className}">
    <label for="zipcode">Postleitzahl</label>
    <input
      id="zipcode"
      bind:this={zip}
      on:keydown={handleKeydown}
      placeholder="z.B. 10115 (Berlin)"
      class="zipInput" />
  </form>
  {#if !isValid && !isEditing}
    <p class="error">
      Die eingegebene Postleitzahl ist ungültig. Bitte versuche erneut eine
      <strong>deine Postleitzahl</strong>
      einzugeben.
    </p>
  {/if}

  <div class="onboarding buttons">
    <Button primary={true} handleClick={handleSubmit}>Bestätigen</Button>
    <Button primary={false} handleClick={handleRandom}>
      Zufällige Auswahl
    </Button>
  </div>
</div>
