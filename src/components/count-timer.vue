<template>
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
  $bg-wht-variation: hsl(0, 0%, 98%, 0.6);
  $primary-blu-color: hsl(240, 50%, 20%, 1.0);
  $hd-font-sz: 100px;
  $digit-font-sz: 85px;
  $count-font-sz: 22px;
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
    width: 80vw;
    max-width: 72rem;
    background: $bg-wht-variation;
    padding: calc(3.25 * $space-base);
    margin-bottom: 4rem;
    @include placement(flex);
  }
  h2, h3 {
    font-size: $hd-font-sz;
    
  }
  .countdown-wrapper {
    @include placement(flex);
    column-gap: calc(5 * $space-base);
  }
  .digit-container {
    width: 10.5vw;
    max-width: 10rem;
    height: 10.5vw;
    max-height: 10rem;
    background: $primary-blu-color;
    border-radius: 20px;
    @include placement(flex);
  }
  .time {
    font-size: $digit-font-sz;
    color: $primary-wht-color;
  }
  .thrs {
    padding-left: calc(0.5 * $space-base);
  }
  .count-type {
    font-weight: 500;
    font-size: $count-font-sz;
    text-transform: uppercase;
    letter-spacing: 3%;
    margin: calc(2.75 * $space-base) 0 calc(-1 * $space-base) 0;
  }
  
</style>