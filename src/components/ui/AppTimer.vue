<template>
  <div class="flex justify-center items-center pb-3">
    <div class="base-timer relative w-10 h-10">
      <svg
        class="transform scale-x-1"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="none">
          <circle
            stroke-width="7"
            stroke="lightGray"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            :stroke-dasharray="circleDasharray"
            class="path-remaining text-blue-500"
            stroke-width="7"
            d="
                            M 50, 50
                            m -45, 0
                            a 45,45 0 1,0 90,0
                            a 45,45 0 1,0 -90,0
                        "
          ></path>
        </g>
      </svg>
      <div
        v-text="formattedTimeLeft"
        class="w-10 h-10 absolute inset-0 flex items-center justify-center text-xs text-gray-500 font-normal"
      ></div>
    </div>
  </div>
</template>

<script>
// https://medium.com/js-dojo/how-to-create-an-animated-countdown-timer-with-vue-89738903823f
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

export default {
  name: "AppTimer",
  emits: ["times-up"],
  props: {
    timeLimit: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const FULL_DASH_ARRAY = 283;
    const timePassed = ref(0);
    const timerInterval = ref(null);

    const timeLeft = computed(() => props.timeLimit - timePassed.value);

    const timeFraction = computed(() => {
      const rawTimeFraction = timeLeft.value / props.timeLimit;
      return rawTimeFraction - (1 / props.timeLimit) * (1 - rawTimeFraction);
    });

    const circleDasharray = computed(
      () => `${(timeFraction.value * FULL_DASH_ARRAY).toFixed(0)} 283`
    );
    // unix timestamp for saved to localStorage
    const timerLength = computed(
      () => new Date().getTime() + props.timeLimit * 1000
    );
    // Render template 0:00
    const formattedTimeLeft = computed(() => {
      const minutes = Math.floor(timeLeft.value / 60);
      let seconds = timeLeft.value % 60;

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      return `${minutes}:${seconds}`;
    });

    watch(
      () => timeLeft.value,
      (newValue) => {
        if (newValue === 0) {
          onTimesUp();
        }
      }
    );
    const onTimesUp = () => {
      emit("times-up");
      clearInterval(timerInterval.value);
    };
    const startTimer = () => {
      timerInterval.value = setInterval(() => timePassed.value++, 1000);
    };
    onMounted(() => {
      startTimer();
    });
    onUnmounted(() => {
      console.log("clear timer");
      clearInterval(timerInterval.value);
    });
    return { circleDasharray, formattedTimeLeft };
  },
};
</script>

<style scoped>
.base-timer .path-remaining {
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
}
</style>
