export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUser();

  if (!to.path.startsWith("/app")) return;

  if (
    userStore.authState === "unauthorized" &&
    !to.path.startsWith("/app/auth")
  ) {
    console.log("[middleware] redirecting...");
    return navigateTo("/app/auth/login");
  }
  if (userStore.authState === "authorized" && to.path.startsWith("/app/auth")) {
    console.log("[middleware] redirecting...");
    return navigateTo("/app");
  }
});
