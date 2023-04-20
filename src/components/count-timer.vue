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
  $bg-wht-variation: hsl(0, 0%, 98%, 0.3);
  $primary-blu-color: hsl(240, 50%, 20%, 1.0);
  $hd-font-sz: 100px;
  $digit-font-sz: 60px;//85px;
  $count-font-sz: 16px;//22px;
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

  //.component-wrapper {
    //@include bp(seed) {
      //@include position(absolute);
    //}
  //}
  //.countdown-timer {
    //margin-top: 19vh;
    //@include bp(seed) {
      //margin-top: 0;
      //@include position(relative, $top: 40vh);
      
    //}
  //}
  .countdown-wrapper {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(17.8125rem, 1fr));
    @include bp(seed) {
      width: 90vw;
      max-width: 72rem;
      padding: 2rem 0;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
      border: 0.5px solid $primary-wht-color;
    }
    @include bp(sprout) {
      background: $bg-wht-variation;
      border: none;
      padding: 2rem 4rem;
      @include position(absolute, $top: 40vw, $left: 0, $right: 0);
    }
  }
  .count-container {
    width: 100%;
    max-width: 17.8125rem;
    margin: $space-base auto;
    @include placement(flex, row, center, flex-start);
    column-gap: calc(2* $space-base);
    color: $primary-wht-color;
    @include bp(seed) {
      width: 10rem;
      @include placement(flex, column, center, center);
    }
  }
  .digit-container {
    width: 50%;
    @include bp(seed) {
      @include placement(flex);
    }
    @include bp(sprout) {
      width: 10rem;
      height: 10rem;
      background: $primary-blu-color;
      border-radius: 20px;
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
      margin-top: calc(2 * $space-base);
    }
    @include bp(sprout) {
      color: #000;
    }
  }
  
</style>