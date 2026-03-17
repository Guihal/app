export function useOtpTimer() {
  const userStore = useUser();
  const secondsLeft = ref(0);
  let interval: ReturnType<typeof setInterval>;

  onMounted(() => {
    secondsLeft.value = Math.floor(
      (userStore.otpExpiresAt! - Date.now()) / 1000,
    );

    interval = setInterval(() => {
      secondsLeft.value = Math.floor(
        (userStore.otpExpiresAt! - Date.now()) / 1000,
      );

      if (secondsLeft.value <= 0) {
        clearInterval(interval);
        navigateTo("/app/auth/login");
      }
    }, 1000);
  });

  onUnmounted(() => clearInterval(interval));

  const timeLeft = computed(() => {
    const m = Math.floor(secondsLeft.value / 60)
      .toString()
      .padStart(2, "0");
    const s = (secondsLeft.value % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  });

  return { secondsLeft, timeLeft };
}
