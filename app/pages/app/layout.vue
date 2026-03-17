<script setup lang="ts"></script>

<template>
  <template>
    <UHeader>
      <template #left>
        <NuxtLink to="/"> привет </NuxtLink>
      </template>

      <template #right>
        <div class="">тут нихуя нет</div>
      </template>
    </UHeader>
    <slot />
  </template>
</template>

<style lang="scss"></style>
