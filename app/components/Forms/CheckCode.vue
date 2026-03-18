<script setup lang="ts">
import * as v from "valibot";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { User } from "~/types/User";
import { useResendTimer } from "~/composables/useResendTimer";

const schema = v.object({
  otp_code: v.pipe(v.string(), v.length(6), v.digits()),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  otp_code: "",
});

const userState = useUser();
const isLoading = ref(false);

const toast = useToast();

async function onSubmitCheck() {
  isLoading.value = true;

  try {
    const tyty = (await $fetch("/api/users/check-code", {
      method: "POST",
      body: state,
      credentials: "include",
      headers: {
        Authorization: `Bearer ${userState.tempToken}`,
      },
    })) as User;

    toast.add({
      title: "Поздравляем!",
      description: "Вы успешно вошли!",
      color: "success",
    });

    await userState.fetchUser();

    userState.setAuthorized();

    navigateTo("/app", { redirectCode: 302 });
  } catch (err) {
    toast.add({
      title: "Неверный код",
      description: "Вы можете отправить его снова",
      color: "error",
    });

    console.error(err);
  }

  isLoading.value = false;
}

const { secondsLeft, restart, canResend } = useResendTimer();

const onSubmitResend = async () => {
  if (!canResend) return;

  isLoading.value = true;
  try {
    const resp = await $fetch("/api/users/resend-otp", {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: `Bearer ${userState.tempToken}`,
      },
    });
    toast.add({
      title: "Код снова отправлен вам на почту!",

      color: "success",
    });
  } catch (err) {
    toast.add({
      title: "Ошибка при отправке кода!",
      color: "error",
    });

    console.error(err);
  }

  restart();

  isLoading.value = false;
};

const resendBtnText = computed(() => {
  if (!canResend.value) {
    return `( ${secondsLeft.value} )`;
  }
  return "Получить новый";
});
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 max-w-[350px] mx-auto w-[100%]"
    @submit="onSubmitCheck"
  >
    <UFormField label="Код" name="otp_code" class="w-[100%]">
      <UInput v-model="state.otp_code" class="w-[100%]" />
    </UFormField>

    <div class="flex gap-2">
      <UButton :loading="isLoading" type="submit"> Отправить код </UButton>
      <UButton
        :loading="isLoading"
        :disabled="!canResend"
        variant="outline"
        type="button"
        @click="onSubmitResend"
      >
        {{ resendBtnText }}
      </UButton>
    </div>
  </UForm>
</template>

<style lang="scss"></style>
