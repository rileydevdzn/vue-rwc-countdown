<template>
  <main>
    <section class="hero">
      <img class="hero-img" src="~@/assets/rwc-timer-bg-lg.jpg"/>
      <a class="rwc-link"><img src="~@/assets/RWC-logo.png" class="rwc-logo"/><span class="sr-only">Visit Rugby World Cup 2023 Homepage</span></a>
    
      <div class="timer">
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
    </section>
  </main>
</template>

<script>
import countTimerVue from './components/count-timer.vue';
export default {
  components: {
    countTimerVue
  },
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
  $font-base: 1rem;
  $space-base: 1rem;
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
  @mixin box-shadow() {
    box-shadow: 2px 2px 5px 1px hsla(0, 0%, 0%, 0.1);
  }
  @mixin transition($properties, $dur: 0.2s) {
    @each $property in $properties {
      transition-property: $property;
    }
    transition-duration: $dur;
    transition-timing-function: ease;
  }
  @mixin bp($point) {
    @if $point == plant {
      @media (min-width: 1400px) { @content; }
    }
    @else if $point == sprout {
      @media (min-width: 1000px) { @content; }
    }
    @else if $point == seedling {
      @media (min-width: 800px) { @content; }
    }
    @else if $point == seed {
      @media (min-width: 640px) { @content; }
    }
  }

  body {
    text-align: center;
    background: $primary-blu-color;
    
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
main {
  width: 100%;
  height: 100vh;   
  @include bp(seed) {
    height: auto;
  }
}
.hero {
  width: 100%;
  height: 28vh;
  @include position(relative);
}  
.hero-img {
  width: 100%;
  object-fit: cover;
  @include bp(seed) {
    margin-bottom: calc(4 * $space-base);
  }
}
.rwc-link {
  width: 10rem;
  background: $primary-wht-color;
  border-radius: $space-base;
  margin: 0 auto -4rem auto;
  @include placement(flex);
  @include position(relative, $top: calc(-6 * $space-base));
  @include box-shadow();
  cursor: pointer;
  @include bp(seed) {
    @include position (absolute, $top: calc(3 * $space-base), $right: calc(3 * $space-base));
    z-index: 10;
    @include transition(transform);
    &:hover {
    transform: scale(1.05);
    }
  }
}
.rwc-logo {
  width: calc(10 * $space-base);
}
</style>
