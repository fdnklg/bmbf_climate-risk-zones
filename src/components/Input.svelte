<script>
  import { zipcodes, activeZipcode, userInput } from 'stores'

  import { postcodes } from 'config'

  import Button from 'components/Button.svelte'
  import ExampleSearches from 'components/ExampleSearches.svelte'

  $: isValid = false
  $: isEditing = true

  let zip
  export let className

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
  }

  const handleExampleSubmit = (e) => {
    zip.value = e.detail
    validate()
    userInput.set(true)
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
    height: 20px;
    display: flex;
    justify-content: center;
    padding: 10px;
    outline: none;
    background-color: white;
    outline: 1px solid $color-main-40;
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
    margin-top: 30px;

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
    font-size: $font-size-m;

    &::placeholder {
      color: $color-main;
    }
  }
</style>

<div>
  <form class="form {className}">
    <!-- <label for="zipcode">Postleitzahl</label> -->
    <input
      id="zipcode"
      bind:this={zip}
      on:keydown={handleKeydown}
      placeholder="Postleitzahl eingeben"
      class="zipInput" />
  </form>
  {#if !isValid && !isEditing}
    <p class="error">
      Die eingegebene Postleitzahl ist ungültig. Bitte versuche erneut eine
      <strong>deine Postleitzahl</strong>
      einzugeben.
    </p>
  {/if}

  {#if postcodes}
    <ExampleSearches on:postcode={handleExampleSubmit} {postcodes} />
  {/if}

  <div class="onboarding buttons">
    <Button primary={true} handleClick={handleSubmit}>Bestätigen</Button>
    <Button primary={false} handleClick={handleRandom}>Zufällige Region</Button>
  </div>
</div>
