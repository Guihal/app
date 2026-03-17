export async function useRefreshToken(): Promise<boolean> {
  const { authState, logout } = useUser();

  if (authState === "unauthorized") {
    logout();

    return false;
  }

  if (authState === "pending_otp") {
    return false;
  }

  try {
    await $fetch("/api/users/refresh", {
      credentials: "include",
      method: "POST",
    });
    return true;
  } catch (err: any) {
    if (err.response?.status === 401) {
      return false;
    }

    // logout();

    throw err;
  }
}
