import { instance } from "./instance";
export async function Login() {
  const email = "test@example.com";
  const password = "12345678";
  try {
    const res = await instance.post("/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw new Error("로그인 실패");
  }
}
