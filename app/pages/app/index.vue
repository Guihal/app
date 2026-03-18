<script setup lang="ts">
const userState = useUser();
userState.fetchUser();

const isLoading = ref(false);
const toast = useToast();

const logout = () => {
  isLoading.value = true;

  try {
    const resp = $fetch("/api/users/logout", {
      credentials: "include",
    });
  } catch (e) {
    console.error(e);
  }

  isLoading.value = true;
  userState.logout();
  navigateTo("/app/auth/login");
  toast.add({
    title: "Вы успешно вышли!",
  });
};
</script>

<template>
  <UPageBody>
    <UPageSection title="Шалом)">
      <div class="flex flex-col gap-16 items-center">
        <div class="flex justify-center">
          Имя: {{ userState.user?.username }}
        </div>
        <div class="flex justify-center">Роль: {{ userState.user?.role }}</div>
        <div class="flex justify-center">
          Почта: {{ userState.user?.email }}
        </div>
        <UButton class="w-fit" @click="logout" :disabled="isLoading"
          >Выйти</UButton
        >
      </div>
    </UPageSection>
  </UPageBody>
</template>

<style lang="scss"></style>
