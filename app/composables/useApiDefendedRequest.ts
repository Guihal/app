export async function useApiDefendedRequest<T>(
  callback: () => Promise<T>,
): Promise<T | null> {
  try {
    return await callback();
  } catch (err: any) {
    if (err.response?.status === 401) {
      const isRefreshed = await useRefreshToken();

      if (isRefreshed === true) {
        try {
          return await callback();
        } catch (retryErr) {
          return null;
        }
      }
    }

    return null;
  }
}
