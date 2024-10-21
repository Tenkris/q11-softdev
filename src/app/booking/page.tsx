import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);
  console.log("Session", session);

  if (!session) {
    return <p>Please log in to book a vaccine.</p>;
  }

  let profile = null;
  let error = null;

  try {
    const userProfile = await getUserProfile(session.user.token);
    profile = userProfile.data;
  } catch (e: any) {
    error = e.message;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Vaccine Booking
      </h1>

      {profile && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            User Profile
          </h2>

          {profile.name && (
            <p className="text-gray-800 mb-2">
              Name: <span className="font-medium">{profile.name}</span>
            </p>
          )}
          {profile.email && (
            <p className="text-gray-800 mb-2">
              Email: <span className="font-medium">{profile.email}</span>
            </p>
          )}
          {profile.tel && (
            <p className="text-gray-800 mb-2">
              Phone: <span className="font-medium">{profile.tel}</span>
            </p>
          )}
          {profile.createdAt && (
            <p className="text-gray-800">
              Created: <span className="font-medium">{profile.createdAt}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
