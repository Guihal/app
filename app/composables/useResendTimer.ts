// composables/useResendTimer.ts
export function useResendTimer() {
  const secondsLeft = ref(0);
  let interval: ReturnType<typeof setInterval>;

  onMounted(() => {
    secondsLeft.value = 1;

    interval = setInterval(() => {
      secondsLeft.value--;

      if (secondsLeft.value <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  });

  onUnmounted(() => clearInterval(interval));

  const canResend = computed(() => secondsLeft.value <= 0);

  function restart() {
    secondsLeft.value = 30;
    clearInterval(interval);

    interval = setInterval(() => {
      secondsLeft.value--;

      if (secondsLeft.value <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  }

  return { secondsLeft, canResend, restart };
}
