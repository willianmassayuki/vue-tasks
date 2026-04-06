import { http, HttpResponse } from "msw";

// Simulação de um banco de dados em memória
const users: Record<
  string,
  { id: number; username: string; password: string }
> = {};
let userId = 1;

export const handlers = [
  // Handler para login
  http.post("http://localhost:3000/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as {
      username: string;
      password: string;
    };

    const user = Object.values(users).find(
      (u) => u.username === body.username && u.password === body.password,
    );

    if (!user) {
      return HttpResponse.json(
        { message: "Usuário e/ou senha inválidos!" },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      token: `token_${user.id}_${Date.now()}`,
      userId: user.id,
      username: user.username,
    });
  }),

  // Handler para registro
  http.post("http://localhost:3000/api/auth/register", async ({ request }) => {
    const body = (await request.json()) as {
      username: string;
      password: string;
    };

    // Validar se usuário já existe
    const userExists = Object.values(users).some(
      (u) => u.username === body.username,
    );

    if (userExists) {
      return HttpResponse.json(
        { message: "Usuário já existe!" },
        { status: 400 },
      );
    }

    // Validar dados
    if (!body.username || !body.password) {
      return HttpResponse.json(
        { message: "Usuário e senha são obrigatórios!" },
        { status: 400 },
      );
    }

    if (body.password.length < 6) {
      return HttpResponse.json(
        { message: "Senha deve ter no mínimo 6 caracteres!" },
        { status: 400 },
      );
    }

    // Criar novo usuário
    const newUser = {
      id: userId++,
      username: body.username,
      password: body.password,
    };

    users[newUser.id] = newUser;

    return HttpResponse.json({
      token: `token_${newUser.id}_${Date.now()}`,
      userId: newUser.id,
      username: newUser.username,
    });
  }),
];
