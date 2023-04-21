<template>
  <div class="component-wrapper">
    <article v-if="loaded" class="countdown-timer">
      <div v-if="!expired">
        <h2 class="sr-only">Countdown to RWC 2023</h2>
        <div class="countdown-wrapper">
          <div class="count-container">
            <div class="digit-container">
              <p class="time tdays">{{ displayDays }}</p>
            </div>
            <p class="count-type">Days</p>
          </div>
          <div class="count-container">
            <div class="digit-container">
              <p class="time thrs">{{ displayHours }}</p>
            </div>
            <p class="count-type">Hours</p>
          </div>
          <div class="count-container">
            <div class="digit-container">
              <p class="time tmins">{{ displayMinutes }}</p>
            </div>
            <p class="count-type">Minutes</p>
          </div>
          <div class="count-container">
            <div class="digit-container">
              <p class="time tsecs">{{ displaySeconds }}</p>
            </div>
            <p class="count-type">Seconds</p>
          </div>
        </div>
      </div>
      <div v-else class="timer-finished">
        <h3>It's Time!</h3>
        <a href="https://www.rugbyworldcup.com/2023" class="schedule-link">See the RWC 2023 match schedule</a>
      </div>
    </article>
  </div>
     
</template>

<script>
export default {
  props: ["year", "month", "date", "hour", "minute", "second", "millisecond"],

  data: () => ({
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
    //Add v-if to component for load state; this.loaded=true in showRemaining so countdown comes up after loaded (no flash of zeros on load)
    loaded: false,
    expired: false
  }),
  computed: {
    secondsCalc: () => 1000,
    minutesCalc() {
      return this.secondsCalc * 60
    },
    hoursCalc() {
      return this.minutesCalc * 60
    },
    daysCalc() {
      return this.hoursCalc * 24
    },
    endDate() {
      return new Date(
        this.year,
        this.month,
        this.date,
        this.hour,
        this.minute,
        this.second,
        this.millisecond
      );
    }
  },
  mounted() {
    this.showRemaining();
  },
  methods: {
    //Values < 10 have a leading zero
    formatDigit: digit => (digit < 10 ? "0" + digit : digit),
    
    showRemaining() {
      const timer = setInterval(() => {
        const nowDate = new Date();
        //Replace hard-coded end date with updatable version; props, endDate() computed, this.endDate.getTime() + include values in component within main app
        //const endDate = new Date(2023, 8, 8, 21, 15, 0);
        let distance = this.endDate.getTime() - nowDate.getTime();

        if (distance < 0) {
          clearInterval(timer);
          this.expired = true;
          this.loaded = true;
          return
        }

        const days = Math.floor((distance / this.daysCalc));
        const hours = Math.floor((distance % this.daysCalc) / this.hoursCalc);
        const minutes = Math.floor((distance % this.hoursCalc) / this.minutesCalc);
        const seconds = Math.floor((distance % this.minutesCalc) / this.secondsCalc);
        this.displaySeconds = this.formatDigit(seconds);
        this.displayMinutes = this.formatDigit(minutes);
        this.displayHours = this.formatDigit(hours);
        this.displayDays = this.formatDigit(days);
        this.loaded = true;
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
  $primary-wht-color: hsl(0, 0%, 98%, 1.0);
  $bg-wht-variation: hsl(0, 0%, 98%, 0.2);
  $primary-blu-color: hsl(240, 50%, 20%, 1.0);
  $font-base: 1rem;
  $hd-font-sz: clamp(calc(3.75 * $font-base), calc(3.31 * $font-base) + 1.878vw, calc(5 * $font-base));
  $digit-font-sz: calc(3.75 * $font-base);
  $count-font-sz: clamp($font-base, calc(0.83 * $font-base) + 0.73vw, calc(1.375 * $font-base));
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
    font-family: 'Jost', sans-serif;
    font-weight: 400;
  }

  .countdown-wrapper {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(calc(17.8125 * $space-base), 1fr));
    @include bp(seed) {
      width: 90vw;
      max-width: calc(72 * $space-base);
      padding: $space-base 0;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, minmax(calc(10 * $space-base), 1fr));
      border: 0.5px solid $primary-wht-color;
    }
    @include bp(sprout) {
      background: $bg-wht-variation;
      border: none;
      padding: calc(2.5 * $space-base) clamp(calc(2 * $space-base), calc(-8 * $space-base) + 16vw, calc(4 * $space-base)) calc(1.5 * $space-base) clamp(calc(2 * $space-base), calc(-8 * $space-base) + 16vw, calc(4 * $space-base));
      @include position(absolute, $top: 35vw, $left: 0, $right: 0);
    }
  }
  .count-container {
    width: 100%;
    max-width: calc(17.8125 * $space-base);
    margin: $space-base auto;
    @include placement(flex, row, center, flex-start);
    column-gap: calc(2* $space-base);
    color: $primary-wht-color;
    @include bp(seed) {
      width: calc(10 * $space-base);
      @include placement(flex, column, center, center);
    }
  }
  .digit-container {
    width: 50%;
    @include bp(seed) {
      @include placement(flex);
    }
    @include bp(sprout) {
      width: calc(9 * $space-base);
      height: calc(9 * $space-base);
      background: $primary-blu-color;
      border-radius: calc(1.25 * $space-base);
    }
  }
  .time {
    font-size: $digit-font-sz;
  }
  .count-type {
    font-weight: 500;
    font-size: $count-font-sz;
    text-transform: uppercase;
    letter-spacing: 2px;
    @include bp(seed) {
      margin-top: clamp(calc(1.5 * $space-base), calc(-1 * $space-base) + 4vw, calc(2 * $space-base));
    }
  }
  .timer-finished {
    width: 90vw;
    max-width: calc(72 * $space-base);
    padding: $space-base 0;
    margin: 0 auto;
    font-size: $hd-font-sz;
    color: $primary-wht-color;

    @include bp(seed) {
      border: 0.5px solid $primary-wht-color;
    }
    @include bp(sprout) {
      background: $bg-wht-variation;
      border: none;
      padding: calc(2.5 * $space-base) clamp(calc(2 * $space-base), calc(-8 * $space-base) + 16vw, calc(4 * $space-base)) calc(1.5 * $space-base) clamp(calc(2 * $space-base), calc(-8 * $space-base) + 16vw, calc(4 * $space-base));
      @include position(absolute, $top: 35vw, $left: 0, $right: 0);
    }
    a {
      font-size: $count-font-sz;
      color: inherit;
    }
  }
</style>