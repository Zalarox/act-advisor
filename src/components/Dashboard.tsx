import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import supabase from "../utils/supabase";

type RatingsData = {
  present_moment: number;
  values: number;
  committed_action: number;
  self_context: number;
  defusion: number;
  acceptance: number;
};

export const Dashboard = () => {
  const auth = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [ratingsData, setRatingsData] = useState<RatingsData>();

  const handleAdd = async () => {
    const { data, error } = await supabase.from("ratings").insert([
      {
        ...ratingsData,
      },
    ]);

    if (error) {
      console.error("Error adding rating:", error);
    }
  };
  return (
    <div className="h-dvh text-center bg-base-200">
      Hello, you are logged in as {auth.user?.email}.
      <div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Add new rating
        </button>
      </div>
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Modal content...</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Add
              </button>
              <button className="btn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
