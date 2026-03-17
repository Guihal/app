<script setup lang="ts">
const userState = useUser();

if (userState.authState === "authorized") {
  await navigateTo("/app", {});
}
</script>

<template>
  <UPageBody>
    <UPageSection title="Вход">
      <div class="flex justify-center">
        <FormsLogin />
      </div>
    </UPageSection>
  </UPageBody>
</template>

<style lang="scss"></style>
