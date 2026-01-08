import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "../components/Dashboard";
import { Login } from "../components/Login";
import { useAuth } from "../contexts/AuthContext";

export const Index = () => {
  const auth = useAuth();
  return auth.user ? <Dashboard /> : <Login />;
};

export const Route = createFileRoute("/")({
  component: Index,
});
