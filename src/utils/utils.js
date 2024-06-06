import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

/**
 * Fetches more data from a paginated resource and updates the state.
 *
 * @param {object} resource - The current resource state.
 * @param {function} setResource - The state setter function for the resource.
 */
export const fetchMoreData = async (resource, setResource) => {
  try {
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      ...prevResource,
      next: data.next,
      results: data.results.reduce((acc, cur) => {
        return acc.some((accResult) => accResult.id === cur.id)
          ? acc
          : [...acc, cur];
      }, prevResource.results),
    }));
  } catch (err) {
    console.error("Error fetching more data:", err);
  }
};

/**
 * Helper function to update profile state when following a user.
 *
 * @param {object} profile - The current profile.
 * @param {object} clickedProfile - The profile that was clicked.
 * @param {number} following_id - The ID of the following relation.
 * @returns {object} - The updated profile.
 */
export const followHelper = (profile, clickedProfile, following_id) => {
  if (profile.id === clickedProfile.id) {
    return {
      ...profile,
      followers_count: profile.followers_count + 1,
      following_id,
    };
  }

  if (profile.is_owner) {
    return {
      ...profile,
      following_count: profile.following_count + 1,
    };
  }

  return profile;
};

/**
 * Helper function to update profile state when unfollowing a user.
 *
 * @param {object} profile - The current profile.
 * @param {object} clickedProfile - The profile that was clicked.
 * @returns {object} - The updated profile.
 */
export const unfollowHelper = (profile, clickedProfile) => {
  if (profile.id === clickedProfile.id) {
    return {
      ...profile,
      followers_count: profile.followers_count - 1,
      following_id: null,
    };
  }

  if (profile.is_owner) {
    return {
      ...profile,
      following_count: profile.following_count - 1,
    };
  }

  return profile;
};

/**
 * Sets the token timestamp in local storage.
 *
 * @param {object} data - The token data.
 */
export const setTokenTimestamp = (data) => {
  const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
  localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

/**
 * Checks if the token should be refreshed.
 *
 * @returns {boolean} - True if the token should be refreshed, false otherwise.
 */
export const shouldRefreshToken = () => {
  return !!localStorage.getItem("refreshTokenTimestamp");
};

/**
 * Removes the token timestamp from local storage.
 */
export const removeTokenTimestamp = () => {
  localStorage.removeItem("refreshTokenTimestamp");
};
