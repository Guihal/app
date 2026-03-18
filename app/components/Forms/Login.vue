<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { User } from "~/types/User";

const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  password: v.pipe(
    v.string(),
    // v.minLength(8, "Must be at least 8 characters"),
    // v.regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква"),
    // v.regex(/[^A-Za-z0-9]/, "Должен быть спецсимвол"),
  ),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: "",
  password: "",
});

const isLoading = ref(false);

const toast = useToast();
const userState = useUser();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true;
  try {
    const resp = (await $fetch("/api/users/login", {
      method: "POST",
      body: state,
    })) as {
      access_token: string;
    };

    if (!resp.access_token) {
      toast.add({
        title: "Проблемы с авторизацией!!!",
        description: "Сосите!",
        color: "success",
      });
      return;
    }

    userState.tempToken = resp.access_token;
    userState.setPendingOtp();

    toast.add({
      title: "Нужно ввести код с почты!",
      description: "Сосите!",
      color: "success",
    });

    return await navigateTo("/app/auth/check-code", { redirectCode: 302 });
  } catch (err) {
    toast.add({
      title: "Ошибка авторизации",
      description: "Неправильно введена почта или пароль!",
      color: "error",
    });

    console.error(err);
  }

  isLoading.value = false;
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 max-w-[350px] mx-auto w-[100%]"
    @submit="onSubmit"
  >
    <UFormField label="Почта" name="email" class="w-[100%]">
      <UInput v-model="state.email" class="w-[100%]" />
    </UFormField>
    <UFormField label="Пароль" name="password" class="w-[100%]">
      <UInput v-model="state.password" type="password" class="w-[100%]" />
    </UFormField>

    <div class="flex justify-between">
      <UButton :disabled="isLoading ? true : false" type="submit">
        Войти
      </UButton>
      <NuxtLink to="/app/auth/register">Зарегистрироваться</NuxtLink>
    </div>
  </UForm>
</template>

<style lang="scss"></style>
