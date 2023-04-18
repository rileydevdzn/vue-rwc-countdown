<template>
  <main>
    <div>
      <countTimerVue
        :year="2023"
        :month="8"
        :date="8"
        :hour="13"
        :minute="15"
        :second="0"
        :millisecond="0"
      />
    </div>
  </main>
</template>

<script>
import countTimerVue from './components/count-timer.vue';
export default {
  components: {
    countTimerVue
  }
}
</script>

<style lang="scss">
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }
  @mixin placement($display: flex, $flexdir: row, $align: center, $justify: center) {
  display: $display;
  flex-direction: $flexdir;
  align-items: $align;
  justify-content: $justify;
  }
  body {
    text-align: center;
  }
  main {
    width: 100%;
    height: 100vh;
    @include placement(flex);
    background: 43% 50% / 52% no-repeat url('~@/assets/flag-map-of-france-sm.png');
  }
</style>
