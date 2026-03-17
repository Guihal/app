<script setup lang="ts">
const route = useRoute();
const token = Object.keys(route.query)[0];
console.log(token);
if (!token) {
  navigateTo("/app/auth/login");
}

const { data, error } = await useFetch("/api/users/verify-email", {
  query: {
    token: token,
  },
  cache: "no-cache",
  credentials: "include",
});

watch(
  data,
  () => {
    navigateTo("/app/auth/login");
  },
  {
    immediate: true,
  },
);

const toast = useToast();

const title = computed(() => {
  if (error.value) {
    console.error(error.value);
    return "Возникла ошибка!";
  }
  if (data.value) {
    toast.add({
      title: "Вы успешно верифицировали почту!",
    });
    return "Вы верифицировали почту!";
  }

  return "Верификация....";
});
</script>

<template>
  <UPageSection :title> </UPageSection>
</template>

<style lang="scss"></style>
