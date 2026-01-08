import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { handleAuth } = useAuth();

  const handleAuthClick = async () => {
    const result = await handleAuth(email, password);
    setMessage(result.message);
  };

  return (
    <div className="max-w-md mx-auto mt-20 flex-1">
      <h1 className="text-2xl mb-4 font-bold">Login to ACT Advisor</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-2">
        <button onClick={handleAuthClick} className="px-4 py-2 btn btn-primary">
          Login or Sign Up
        </button>
      </div>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};
