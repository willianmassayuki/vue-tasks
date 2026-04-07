import { storage } from "@/utils/storage";

export interface AuthError extends Error {
  response?: unknown;
  isAuthError?: boolean;
}

interface ApiResponse<T> {
  data: T;
}

interface StoredUser {
  id: number;
  username: string;
  password: string;
}

interface StoredTask {
  id: number;
  userId: number;
  title: string;
  done: boolean;
}

const USERS_KEY = "vt_users";
const TASKS_KEY = "vt_tasks";

const loadUsers = (): StoredUser[] => {
  const raw = storage.get(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveUsers = (users: StoredUser[]) => {
  storage.set(USERS_KEY, JSON.stringify(users));
};

const loadTasks = (): StoredTask[] => {
  const raw = storage.get(TASKS_KEY);
  return raw ? JSON.parse(raw) : [];
};

const saveTasks = (tasks: StoredTask[]) => {
  storage.set(TASKS_KEY, JSON.stringify(tasks));
};

const normalizeUsername = (username: string) => username.trim().toLowerCase();

const createAuthError = (message: string, status: number) => {
  const error = new Error(message) as AuthError;
  error.response = { status, data: { message } };
  if (status === 401) {
    error.isAuthError = true;
  }
  return error;
};

const parseToken = (token: string | null): number | null => {
  if (!token) {
    return null;
  }

  const match = token.match(/^token_(\d+)_\d+$/);
  return match ? Number(match[1]) : null;
};

const getCurrentUserId = (): number => {
  const token = storage.get("token");
  const userId = parseToken(token);

  if (!userId) {
    throw createAuthError("Token inválido ou expirado", 401);
  }

  return userId;
};

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async post<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
    await delay();

    if (url === "/auth/register") {
      const credentials = body as { username: string; password: string };
      const username = normalizeUsername(credentials.username);
      const password = credentials.password?.trim() || "";

      if (!username || !password) {
        throw createAuthError("Usuário e senha são obrigatórios!", 400);
      }

      if (password.length < 6) {
        throw createAuthError("Senha deve ter no mínimo 6 caracteres!", 400);
      }

      const users = loadUsers();
      const userExists = users.some((user) => user.username === username);

      if (userExists) {
        throw createAuthError("Usuário já existe!", 400);
      }

      const newUser: StoredUser = {
        id:
          users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
        username,
        password,
      };

      users.push(newUser);
      saveUsers(users);

      return {
        data: {
          token: `token_${newUser.id}_${Date.now()}`,
          userId: newUser.id,
          username: newUser.username,
        } as unknown as T,
      };
    }

    if (url === "/auth/login") {
      const credentials = body as { username: string; password: string };
      const username = normalizeUsername(credentials.username);
      const password = credentials.password?.trim() || "";

      const user = loadUsers().find(
        (storedUser) =>
          storedUser.username === username && storedUser.password === password,
      );

      if (!user) {
        throw createAuthError("Usuário e/ou senha inválidos!", 401);
      }

      return {
        data: {
          token: `token_${user.id}_${Date.now()}`,
          userId: user.id,
          username: user.username,
        } as unknown as T,
      };
    }

    if (url === "/tasks") {
      const userId = getCurrentUserId();
      const taskData = body as { title: string; done: boolean };
      const title = taskData.title?.trim() || "";

      if (!title) {
        throw createAuthError("Título da tarefa é obrigatório", 400);
      }

      const tasks = loadTasks();
      const newTask: StoredTask = {
        id:
          tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
        userId,
        title,
        done: taskData.done,
      };

      tasks.push(newTask);
      saveTasks(tasks);

      return {
        data: newTask as unknown as T,
      };
    }

    throw createAuthError("Endpoint não encontrado", 404);
  },

  async get<T>(url: string): Promise<ApiResponse<T>> {
    await delay();

    if (url === "/tasks") {
      const userId = getCurrentUserId();
      const tasks = loadTasks().filter((task) => task.userId === userId);
      return { data: tasks as unknown as T };
    }

    throw createAuthError("Endpoint não encontrado", 404);
  },

  async put<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
    await delay();

    const taskIdMatch = url.match(/^\/tasks\/(\d+)$/);
    if (!taskIdMatch) {
      throw createAuthError("Endpoint não encontrado", 404);
    }

    const taskId = Number(taskIdMatch[1]);
    const userId = getCurrentUserId();
    const updateData = body as { title?: string; done?: boolean };

    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(
      (task) => task.id === taskId && task.userId === userId,
    );

    if (taskIndex === -1) {
      throw createAuthError("Tarefa não encontrada", 404);
    }

    const task = tasks[taskIndex];
    tasks[taskIndex] = {
      ...task,
      title:
        updateData.title !== undefined ? updateData.title.trim() : task.title,
      done: updateData.done ?? task.done,
    };

    saveTasks(tasks);

    return { data: tasks[taskIndex] as unknown as T };
  },

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    await delay();

    const taskIdMatch = url.match(/^\/tasks\/(\d+)$/);
    if (!taskIdMatch) {
      throw createAuthError("Endpoint não encontrado", 404);
    }

    const taskId = Number(taskIdMatch[1]);
    const userId = getCurrentUserId();

    const tasks = loadTasks();
    const newTasks = tasks.filter(
      (task) => !(task.id === taskId && task.userId === userId),
    );

    if (newTasks.length === tasks.length) {
      throw createAuthError("Tarefa não encontrada", 404);
    }

    saveTasks(newTasks);
    return { data: undefined as unknown as T };
  },
};
