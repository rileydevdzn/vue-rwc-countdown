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
  body {
    background: $primary-blu-color;
    font: $font-wt-norm #{$font-sz-base}/#{$body-txt-lnht} $sans-serif;
    text-align: center;
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
