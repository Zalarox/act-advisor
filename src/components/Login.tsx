import { useState } from "react";
import supabase from "../utils/supabase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Signup
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(data);
    if (error) setMessage(error.message);
    else setMessage("Check your email for confirmation link!");
  };

  // Login
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data);
    if (error) setMessage(error.message);
    else setMessage("Logged in!");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h1 className="text-2xl mb-4 font-bold">Login to Act Advisor</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-2">
        <button
          onClick={handleSignUp}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign Up
        </button>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Login
        </button>
      </div>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};
