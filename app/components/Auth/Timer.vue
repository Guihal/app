<script setup lang="ts">
const { timeLeft } = useOtpTimer();
</script>

<template>
  <div class="fs-x2 text-center">{{ timeLeft }}</div>
</template>

<style lang="scss"></style>
