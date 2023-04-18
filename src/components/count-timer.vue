<template>
  <article v-if="loaded" class="countdown-timer">
    <h2 v-if="!expired">Countdown to RWC 2023</h2>
    <h3 v-else class="timer-finished">It's Time! <a href="https://www.rugbyworldcup.com/2023">See the RWC 2023 match schedule</a></h3>
    <div class="countdown-wrapper">
      <div class="digit-container">
        <p class="time tdays">{{ displayDays }}</p>
        <p class="count-type">Days</p>
      </div>
      <div class="digit-container">
        <p class="time thrs">{{ displayHours }}</p>
        <p class="count-type">Hours</p>
      </div>
      <div class="digit-container">
        <p class="time tmins">{{ displayMinutes }}</p>
        <p class="count-type">Minutes</p>
      </div>
      <div class="digit-container">
        <p class="time tsecs">{{ displaySeconds }}</p>
        <p class="count-type">Seconds</p>
      </div>
    </div>
    
  </article>
     
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
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }
  $primary-wht-color: #fafafa;
  $h2-font-sz: 30px;
  $digit-font-sz: 40px;
  $count-font-sz: 14px;
  $space-base: 1rem;
  @mixin placement($display: flex, $flexdir: row, $align: center, $justify: center) {
  display: $display;
  flex-direction: $flexdir;
  align-items: $align;
  justify-content: $justify;
  }
  @mixin box-shadow() {
  box-shadow: 2px 2px 5px 1px hsla(0, 0%, 0%, 0.1);
  }
  .countdown-timer {
    background: $primary-wht-color;
    padding: calc(1.5 * $space-base) $space-base;
    @include box-shadow();
  }
  .countdown-wrapper {
    margin: 0 auto;
    @include placement(flex);
    column-gap: calc(1.5 *$space-base);
  }
  h2 {
    font-size: $h2-font-sz;
    margin-bottom: calc(2 * $space-base);
  }
  .time {
    font-size: $digit-font-sz;
  }
  .count-type {
    margin-top: $space-base;
    font-size: $count-font-sz;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
</style>