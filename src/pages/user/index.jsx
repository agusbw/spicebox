import useRecipe from "../../hooks/useRecipe";
import Container from "../../components/layouts/Container";
import { AVATAR_IMAGE_URL } from "../../constants";
import { useEffect, useState, useRef } from "react";
import { TextInput } from "../../components/FormComponents";
import { useAuth } from "../../contexts/Auth";
import { getInitials } from "../../utils/functions";
import { useLoaderData, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import { useProfile } from "../../contexts/Profile";
import useBookmark from "../../hooks/useBookmark";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const { user } = useAuth();
  const profile = useLoaderData();
  const [, setProfile] = useProfile();
  const { countUserRecipes } = useRecipe();
  const [totalRecipe, setTotalRecipe] = useState(0);
  const [totalBookmark, setTotalBookmark] = useState(0);
  const { getUserBookmarks } = useBookmark();
  const imageRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(() => {
    if (profile && profile.avatar) {
      return `${AVATAR_IMAGE_URL}/${profile.avatar}`;
    }
    return null;
  });
  const { uploadAvatar, updateUser, deleteAvatar, isLoading } = useUser();
  const navigate = useNavigate();

  const getCountRecipes = async () => {
    const count = await countUserRecipes(user.id);
    setTotalRecipe(count);
  };

  const getCountBookmarks = async () => {
    const data = await getUserBookmarks(user.id);
    setTotalBookmark(data.length);
  };

  useEffect(() => {
    if (!profile) {
      navigate("/not-found", { replace: true });
      return;
    }
    if (user.id !== profile.id) {
      navigate("/not-found", { replace: true });
      return;
    }
    getCountRecipes();
    getCountBookmarks();
  }, []);

  const handleProfileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      return;
    }
    if (!file) {
      if (profile && profile.avatar) {
        setImagePreview(`${AVATAR_IMAGE_URL}/${profile.avatar}`);
        return;
      }
      setImagePreview(null);
      return;
    }
  };

  const handleSubmitAvatar = async () => {
    const { isConfirmed } = await Swal.fire({
      text: "Update profile picture?",
      icon: "warning",
      confirmButtonText: "Yes, update it!",
      showCancelButton: true,
      cancelButtonText: "No, cancel!",
    });

    if (!isConfirmed) return;

    await deleteAvatar(profile.avatar);
    const imageUrl = await uploadAvatar(user.id, imageRef.current?.files[0]);

    if (imageUrl) {
      await updateUser(user.id, {
        avatar: imageUrl,
      });
      setProfile({ ...profile, avatar: imageUrl });
      setImagePreview(`${AVATAR_IMAGE_URL}/${imageUrl}`);
      Swal.fire({
        title: "Success!",
        text: "Profile picture updated",
        icon: "success",
        confirmButtonText: "Ok",
      });
      return;
    }

    Swal.fire({
      title: "Error!",
      text: "Something went wrong, please try again",
      icon: "error",
      confirmButtonText: "Ok",
    });
  };

  return (
    <>
      <Helmet>
        <title>{profile.username} | SpiceBox</title>
      </Helmet>
      <Container>
        <h1 className="text-4xl font-bold mb-3">Profile 👤</h1>
        <div className="md:flex md:flex-row-reverse justify-start gap-8">
          <div className="flex-1 md:justify-self-center">
            <h2 className="text-2xl font-bold text-secondary">Statistics</h2>
            <div className="lg:stats h-fit shadow my-5">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Total Bookmark</div>
                <div className="stat-value text-primary">{totalBookmark}</div>
                <div className="stat-desc">Bookmarked Recipe(s)</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Total Upload</div>
                <div className="stat-value text-secondary">{totalRecipe}</div>
                <div className="stat-desc">Uploaded Recipe(s)</div>
              </div>
            </div>
          </div>
          <div className="w-ful flex-1 lg:w-fit flex-col justify-center">
            <h2 className="text-2xl font-bold text-primary">Profile Data</h2>
            <div className="flex flex-col md:max-w-md">
              <div className="mb-3 flex flex-col gap-3 justify-center align-middle w-fit">
                <label
                  className="label text-base label-text font-semibold"
                  htmlFor="profile"
                >
                  <span className="label-text">Profile Picture</span>
                </label>
                <div className="avatar">
                  <div className="w-24 rounded-full mx-auto">
                    {imagePreview !== null ? (
                      <img src={imagePreview} alt="profile" />
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                          <span>
                            {getInitials(
                              user.user_metadata.firstname,
                              user.user_metadata.lastname
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <input
                    ref={imageRef}
                    id="profile"
                    onChange={handleProfileChange}
                    type="file"
                    accept="image/jpg,image/png,image/jpeg"
                    className="file-input file-input-sm file-input-bordered file-input-secondary max-w-xs"
                  />
                  <button
                    className={`btn ${
                      isLoading ? "loading" : ""
                    } btn-sm ml-2 btn-secondary`}
                    onClick={handleSubmitAvatar}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="mb-3 flex gap-3">
                <div className="">
                  <TextInput
                    label="Firstname"
                    defaultValue={user.user_metadata.firstname}
                    disabled
                  />
                </div>
                <div className="">
                  <TextInput
                    label="Lastname"
                    defaultValue={user.user_metadata.lastname}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-3 flex">
                <div className="w-10/12">
                  <TextInput label="Email" defaultValue={user.email} disabled />
                </div>
                <div className="self-end mb-3 ml-2">
                  {user.email_confirmed_at ? (
                    <span className="px-3 py-2 rounded-lg bg-primary">
                      Confirmed
                    </span>
                  ) : (
                    <span className="px-3 py-2 rounded-lg bg  -error">
                      Not confirmed
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-3 mt-3">
                <button
                  className="btn btn-secondary rounded-sm
          "
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
