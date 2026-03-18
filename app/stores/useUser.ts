import type { AuthState } from "~/types/AuthState";
import type { User } from "~/types/User";

export const useUser = defineStore(
  "user",
  () => {
    const user = ref<User | null>(null);
    const authState = ref<AuthState>("unauthorized");
    const otpExpiresAt = ref<number | null>(null);
    const tempToken = ref<string | null>(null);

    const isOtpExpired = computed(() => {
      if (!otpExpiresAt.value) return true;
      return Date.now() > otpExpiresAt.value;
    });

    function setPendingOtp() {
      authState.value = "pending_otp";
      otpExpiresAt.value = Date.now() + 5 * 60 * 1000;
    }

    function setVerifyEmail() {
      authState.value = "verify-email";
    }

    function setAuthorized() {
      authState.value = "authorized";
      otpExpiresAt.value = null;
    }

    function logout() {
      user.value = null;
      authState.value = "unauthorized";
      otpExpiresAt.value = null;
    }

    async function fetchUser() {
      useApiDefendedRequest(async () => {
        const userData = (await $fetch("/api/users/me", {
          credentials: "include",
        })) as User | null;

        if (!userData) return;

        user.value = { ...userData };
      });
    }

    function clearTempToken() {
      tempToken.value = null;
    }

    return {
      user,
      authState,
      otpExpiresAt,
      isOtpExpired,
      setPendingOtp,
      setAuthorized,
      tempToken,
      clearTempToken,
      fetchUser,
      logout,
      setVerifyEmail,
    };
  },
  {
    persist: true,
  },
);
