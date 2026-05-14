import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(

  persist(
    
    (set, get) => ({
      
    user: null,
    token: null,
    isAuthenticated: false,

    // set user and token after login
    setAuth: (userData, token) => set({
      user: userData,
      token,
      isAuthenticated: true,
    }),

    // set user and token clear after logout
    setClear: () => set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

    // get token outside react components
    getToken: () => get().token

    }),

    {
        name: 'auth-storage',
        partialize: (state) => ({
            user: state.user,
            token: state.token,
            isAuthenticated: state.isAuthenticated
        })
    }

  )
);


export default useAuthStore