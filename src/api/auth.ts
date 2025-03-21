const teamId = process.env.NEXT_PUBLIC_TEAM_ID || "13-2";
const baseUrl = `https://sp-taskify-api.vercel.app/${teamId}`;

export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "로그인 실패");
  }
  return await response.json();
};

export const signupApi = async (
  email: string,
  nickname: string,
  password: string
) => {
  const response = await fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, nickname, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원가입 실패");
  }
  return await response.json();
};
