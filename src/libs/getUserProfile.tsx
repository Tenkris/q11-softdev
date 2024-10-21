import axios from "axios";

export default async function getUserProfile(token: string) {
  try {
    const response = await axios.get(
      "https://backend-q-9-git-main-tenkris1s-projects.vercel.app/api/v1/auth/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
