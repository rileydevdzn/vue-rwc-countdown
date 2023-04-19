<template>
  <main>
    <a class="rwc-link"><img src="~@/assets/RWC-logo.png" class="rwc-logo"/><span class="sr-only">Visit Rugby World Cup 2023 Homepage</span></a>
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
  $primary-wht-color: hsl(0, 0%, 98%, 1.0);
  $bg-wht-variation: hsl(0, 0%, 98%, 0.7);
  $primary-blu-color: hsl(240, 50%, 20%, 1.0);
  @mixin placement($display: flex, $flexdir: row, $align: center, $justify: center) {
  display: $display;
  flex-direction: $flexdir;
  align-items: $align;
  justify-content: $justify;
  }
  @mixin position($pos, $top: auto, $left: auto, $btm: auto, $right: auto) {
  position: $pos;
  top: $top;
  left: $left;
  bottom: $btm;
  right: $right;
}
@mixin transition($properties, $dur: 0.2s) {
  @each $property in $properties {
    transition-property: $property;
  }
  transition-duration: $dur;
  transition-timing-function: ease;
}
  body {
    text-align: center;
  }
  main {
    width: 100%;
    height: 100vh;
    @include placement(flex, row, flex-end, center);
    background: center / cover no-repeat url('~@/assets/rwc-timer-bg-lg.jpg');
    position: relative;
  }
  .sr-only {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
.rwc-link {
  width: 12.25vw;
  max-width: 12rem;
  height: 12.25vw;
  max-height: 12rem;
  background: $primary-wht-color;
  border-radius: 16px;
  @include placement(flex);
  @include position(absolute, $top: 3rem, $right: 3rem);
  @include transition(transform);
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
}
.rwc-logo {
  width: 10rem;
}
</style>
