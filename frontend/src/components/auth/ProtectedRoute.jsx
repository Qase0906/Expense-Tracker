import api from "@/lib/api/apiClient";
import useAuthStore from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
    
  const { user, setAuth, setClear, token } = useAuthStore();

  const { data, isError, isLoading, isSuccess, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get("/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    },
    enabled: !!token,
    retry: 1,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setAuth(data, token);
    }
  }, [setAuth, token, isSuccess, data]);

  useEffect(() => {
    if (isError) {
      setClear();
    }
  }, [setClear, isError]);

  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!token || isError) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
