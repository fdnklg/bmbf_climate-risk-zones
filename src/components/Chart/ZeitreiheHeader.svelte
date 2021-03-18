<script>
  export let gradient
</script>

<style lang="scss">
  @import 'src/style/root.scss';
  .chart-header {
    margin-bottom: 10px;
  }
</style>

<div class="chart-header">
  <strong style="color: {gradient[0]}">Mindest,</strong>
  <strong style="color: {gradient[1]}">höchst</strong>
  und Mittel der durchschnittlichen Tageshöchsttemperaturen für
  <strong style="color: grey">deine Region</strong>
  und
  <strong style="color: black">Deutschland</strong>
  in °&thinsp;C
</div>
