import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  _id: string;
  email: string;
  full_name: string;
  profile_setup_completed: boolean;
  [key: string]: string | any;
}

interface AuthState {
  user: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDoctor: boolean;
  isPatient: boolean;
  error: string | null;
  setUser: (user: UserData) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (user: UserData, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isDoctor: false,
      isPatient: false,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      login: (user, accessToken, refreshToken) => {
        console.log("user", user);
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          error: null,
          isDoctor: user.role === "doctor",
          isPatient: user.role === "patient",
        });

        // store tokens in async storage
        AsyncStorage.setItem("access_token", accessToken);
        AsyncStorage.setItem("refresh_token", refreshToken);
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null,
        });

        AsyncStorage.removeItem("access_token");
        AsyncStorage.removeItem("refresh_token");
      },
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
      onRehydrateStorage: (state) => {
        return async (rehydratedState, error) => {
          // if (error) {
          //   console.log("an error happened during hydration", error);
          // } else if (rehydratedState?.accessToken) {
          //   const user = await fetchUserProfile();
          //   console.log("User data:", user);
          //   useAuthStore.getState().setIsAuthenticated(true);
          // }
          // useAuthStore.getState().setIsAuthenticated(true);
        };
      },
    }
  )
);

export default useAuthStore;
