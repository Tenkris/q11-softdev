import { HospitalJson } from "./interface";

export default async function getHospital(hid: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    `https://backend-q-9-git-main-tenkris1s-projects.vercel.app/api/v1/hospitals/${hid}`
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch hospital data");
  }
  return await response.json();
}
