import axios from "axios";

export default async function userLogIn(
  userEmail: string,
  userPassword: string
) {
  try {
    const response = await axios.post(
      "https://backend-q-9-git-main-tenkris1s-projects.vercel.app/api/v1/auth/login",
      {
        email: userEmail,
        password: userPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
