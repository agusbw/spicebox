import { useProfile } from "../contexts/Profile";
import { useAuth } from "../contexts/Auth";
import profileThumbnail from "../assets/profile.png";
import { AVATAR_IMAGE_URL } from "../constants";
import { getInitials } from "../utils/functions";

const ProfiePicture = () => {
  const [profile] = useProfile();
  const { user } = useAuth();

  console.log("Profile", profile);
  console.log("User", user);

  return (
    <>
      {!user && (
        <img
          src={profileThumbnail}
          alt="profile"
          className="rounded-full w-full h-full object-cover"
        />
      )}
      {profile && user && profile.avatar && (
        <img
          src={`${AVATAR_IMAGE_URL}/${profile.avatar}`}
          alt="profile"
          className="rounded-full w-full h-full object-cover"
        />
      )}
      {profile && user && !profile.avatar && (
        <div className="avatar placeholder w-full">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-full">
            <span>
              {getInitials(
                user?.user_metadata?.firstname,
                user?.user_metadata?.lastname
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfiePicture;
