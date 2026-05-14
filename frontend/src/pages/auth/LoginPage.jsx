import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfoIcon, LoaderIcon } from "lucide-react";
import { Link, replace, useNavigate } from "react-router";
import extractErrorMessages from "@/utils/ErrorUtils";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/apiClient";
import useAuthStore from "@/lib/store/authStore";

const loginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loginMutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await api.post("/auth/login", newUser);      
      return response.data;
    },
    onSuccess: (data) => {
      if (data) {
        const user = data.user;
        const token = data.token;
        
        setAuth(user, token);

        navigate("/dashboard", {replace: true});
      }
    },
    onError: (error) => {
      setError(extractErrorMessages(error));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      console.log("All fields are required");
      return;
    }

    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 bg-linear-to-br from-secondary to-secondary/20 opacity-50" />

      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="font-bold text-3xl text-forground">Welcome back</h1>
          <p className="text-gray-500">We're glad to see you again</p>
        </div>

        {/* Card */}
        <Card>
          <CardHeader>
            <CardTitle className={"text-center text-lg text-foreground"}>
              Login
            </CardTitle>
            <CardDescription className="text-center py-2">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/10 text-red-500 p-2 mb-4 rounded-md text-sm">
                <span>{error}</span>
              </div>
            )}

            {/* form */}
            <form className="pb-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div>
                  <Input
                    name="email"
                    value={formData.email}
                    type="email"
                    placeholder="Email"
                    required
                    className={"py-5 placeholder:text-gray-400"}
                    onChange={handleFormChange}
                  />
                </div>

                {/* password */}
                <div>
                  <Input
                    name="password"
                    type="password"
                    placeholder="******"
                    required
                    className={"py-5 placeholder:text-gray-400"}
                    value={formData.password}
                    onChange={handleFormChange}
                  />
                </div>

                <Button className={"py-4.5 cursor-pointer text-lg mt-2"}>
                  {loginMutation.isPending ? (
                    <p className="flex items-center gap-4">
                      {" "}
                      <LoaderIcon /> Signing In ....
                    </p>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <div className="flex items-center justify-center text-gray-500 space-x-1">
                  <InfoIcon className="w-4 h-4 " />
                  Already haven't an account?
                  <Link className="text-orange-600 ml-1" to="/register">
                    {" "}
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default loginPage;
