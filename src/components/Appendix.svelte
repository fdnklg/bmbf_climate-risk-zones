<script>
  import { appendix } from 'constants'
</script>

<style lang="scss">
  @import 'src/style/root.scss';

  .title {
    margin-bottom: 1px;
    letter-spacing: $letter-spacing-s;
    font-family: $font-bold;
  }

  .method {
    margin-top: 0px;
  }

  .appendix {
    display: flex;
    flex-direction: column;
    color: $color-main-60;
    line-height: 150%;
    font-size: $font-size-xs;
  }

  .partners {
    display: table;
  }

  .partners > div {
    display: table-row;
  }

  .partners > div > div {
    display: table-cell;
    vertical-align: middle;
  }

  .partners img {
    max-width: 200px;
    width: 80%;
  }
</style>

<div class="appendix">
  <div class="partners">
    <div>
      <div>
        <span>Ein Projekt von:</span><br />
        <a href="https://www.vislab.io"><img
            style="margin-top:5px; margin-bottom:2px;"
            src="/data/vislab@2x.jpg"
            alt="VISLAB.io" /></a><br />
        Als Teil des Forschungsvorhaben
        <strong>LoCobSS</strong>.
      </div>
      <div>
        <img
          src="/data/bmbf@x2.jpg"
          alt="Gefördert vom Bundesministerium für Bildung und Forschung" />
      </div>
    </div>
  </div>
  <div>
    <div>
      <div
        style="width:100%; text-align:center; margin-bottom:20px; margin-top:30px;">
        <span>Public Money &raquo; Public Code</span><br />
        <a href="https://github.com"><img
            style="max-width:120px; margin-top:5px;"
            src="/data/github.png"
            alt="GitHub" /></a>
      </div>
    </div>
  </div>
  <span class="title">Methodik</span>
  <p class="method">
    {@html appendix.method}
  </p>
  <span class="title">Quellen</span>
  {#each appendix.sources as source}
    <a class="source" href={source[0]}>{@html source[1]}</a>
  {/each}
</div>
