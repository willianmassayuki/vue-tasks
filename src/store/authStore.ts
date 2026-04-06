import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { authService } from "@/services/authService";
import { storage } from "@/utils/storage";
import { useRouter } from "vue-router";
import type { LoginCredentials, AuthResponse } from "../services/authService";

export interface User {
  id: number;
  username: string;
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  const user = ref<User | null>(null);
  const token = ref<string | null>(storage.get("token"));
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const currentUser = computed(() => user.value);
  const isLoading = computed(() => loading.value);
  const hasError = computed(() => error.value);
  const userName = computed(() => user.value?.username || "");

  const login = async (
    credentials: LoginCredentials,
  ): Promise<AuthResponse> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.login(credentials);
      token.value = response.token;

      user.value = {
        id: response.userId,
        username: response.username,
      };

      storage.set("token", response.token);
      storage.set("user", JSON.stringify(user.value));

      router.push("/tasks");

      return response;
    } catch (err) {
      if (err.isAuthError) {
        error.value = err.message;
        throw err;
      }

      error.value = err.response?.data?.message || "Erro ao fazer o login";
      console.error("Erro ao fazer o login:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const checkAuth = () => {
    const savedToken = storage.get("token");
    const savedUser = storage.get("user");

    if (savedToken && savedUser) {
      token.value = savedToken;
      user.value = JSON.parse(savedUser);
    }
  };

  const register = async (
    credentials: LoginCredentials,
  ): Promise<AuthResponse> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authService.register(credentials);
      token.value = response.token;
      user.value = {
        id: response.userId,
        username: response.username,
      };

      storage.set("token", response.token);
      storage.set("user", JSON.stringify(user.value));

      router.push("/task");

      return response;
    } catch (err) {
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    currentUser,
    isLoading,
    hasError,
    userName,
    login,
    checkAuth,
  };
});
