import axios from "axios";
import useAuthStore from "../store/auth";

const apiUrl = "https://test-4tip.onrender.com/api";

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     const { refreshToken, accessToken, setAccessToken, setRefreshToken } =
//       useAuthStore.getState();

//     // Handle 401 Unauthorized errors (token expired)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         console.log("refresh token", refreshToken);
//         console.log("access token", accessToken);

//         const res = await axios.post(`${apiUrl}/auth/refresh`, {
//           refresh_token: refreshToken,
//         });

//         // Store the new tokens
//         setAccessToken(res.data.access_token);
//         setRefreshToken(res.data.refresh_token);

//         // Update the authorization header
//         apiClient.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${res.data.access_token}`;

//         // Retry the original request
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh token failure - logout user
//         setAccessToken(null);
//         setRefreshToken(null);

//         // Navigate to login or show message
//         // navigation.navigate('Login'); (would need to be handled in a component)
//         return Promise.reject(refreshError);
//       }
//     }

//     // Handle network errors
//     if (!error.response) {
//       // No response from server - network error
//       console.log("Network Error", error);
//       // You could show a toast notification here
//     }

//     return Promise.reject(error);
//   }
// );

export default apiClient;
