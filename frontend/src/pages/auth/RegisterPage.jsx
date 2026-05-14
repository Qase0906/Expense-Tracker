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
import { InfoIcon } from "lucide-react";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api/apiClient";
import extractErrorMessages from "@/utils/ErrorUtils";

const registerPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerMutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await api.post("/auth/register", newUser);
      console.log("response data", response);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Registered Successfully", data);
    },
    onError: (error) => {
      setError(extractErrorMessages(error));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null)

    if (!formData.username || !formData.email || !formData.password) {
      console.log("All fields are required");
      return
    }

    if(formData.password !== formData.confirmPassword){
      console.log("Not match passwords")
      return
    }

    registerMutation.mutate({
      name: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 bg-linear-to-br from-secondary to-secondary/20 opacity-50" />

      <div className="z-10 w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Join us today</h1>
          <p> Create an account just a few steps</p>
        </div>

        {/* Card */}
        <Card>
          <CardHeader>
            <CardTitle className={"text-center"}>Login</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-destructive/20 text-red-500 p-2 rounded-md my-4">
                <span>{error}</span>
              </div>
            )}

            {/* form */}

            <form className="pb-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {/* Username */}
                <div>
                  <Input
                    name="username"
                    value={formData.username}
                    type="text"
                    placeholder="username"
                    required
                    className={"py-5 placeholder:text-gray-400"}
                    onChange={handleFormChange}
                  />
                </div>

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
                    value={formData.password}
                    type="password"
                    placeholder="password"
                    required
                    className={"py-5 placeholder:text-gray-400"}
                    onChange={handleFormChange}
                  />
                </div>

                {/* confirm password */}
                <div>
                  <Input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    type="password"
                    placeholder="confirm password"
                    required
                    className={"py-5 placeholder:text-gray-400"}
                    onChange={handleFormChange}
                  />
                </div>

                <Button
                  type="submit"
                  className={"py-4.5 cursor-pointer text-base mt-4"}
                >
                  Sign Up
                </Button>
                <div className="flex justify-center items-center text-gray-500 space-x-1">
                  <InfoIcon className="w-4 h-4 " />
                  Already have an account?
                  <Link className="text-orange-600 ml-1" to="/login">
                    {" "}
                    Sign In
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

export default registerPage;
