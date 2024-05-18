import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfiles();
  }, [currentUser]);

  const handleFollow = async (profile) => {
    try {
      await axiosReq.post("/followers/", { followed: profile.id });

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((p) =>
            p.id === profile.id
              ? { ...p, following_id: currentUser?.profile_id, followers_count: p.followers_count + 1 }
              : p
          ),
        },
        popularProfiles: {
          results: prevState.popularProfiles.results.map((p) =>
            p.id === profile.id ? { ...p, followers_count: p.followers_count + 1 } : p
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (profile) => {
    try {
      await axiosReq.delete(`/followers/${profile.following_id}/`);

      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((p) =>
            p.id === profile.id
              ? { ...p, following_id: null, followers_count: p.followers_count - 1 }
              : p
          ),
        },
        popularProfiles: {
          results: prevState.popularProfiles.results.map((p) =>
            p.id === profile.id ? { ...p, followers_count: p.followers_count - 1 } : p
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ setProfileData, handleFollow, handleUnfollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
