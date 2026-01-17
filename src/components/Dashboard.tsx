import { useAuth } from "../contexts/AuthContext";
import { Modal } from "./Modal";
import { useState } from "react";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";

export const Dashboard = () => {
  const auth = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour > 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <div id="greeting" className="w-full text-center text-2xl">
        <div className="font-extrabold p-10">
          {getGreeting()}, you are logged in as {auth.user?.email}.
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setModalOpen(true)}
          >
            Add new rating
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 h-full mt-10">
        <LeftPanel />
        <RightPanel />
      </div>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
};
