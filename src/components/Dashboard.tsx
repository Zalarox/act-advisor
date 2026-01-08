import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import supabase from "../utils/supabase";
import {
  getInitialRatingsData,
  ratingKeys,
  type RatingsData,
} from "../models/Ratings";
import { RatingSlider } from "./RatingSlider";

export const Dashboard = () => {
  const auth = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const [ratingsData, setRatingsData] = useState<RatingsData>(
    getInitialRatingsData()
  );

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
          <div className="modal-box w-10/12 max-w-5xl">
            <h3 className="font-bold text-lg">How do you feel right now?</h3>
            <p className="py-4">
              {ratingKeys.map((ratingId) => (
                <RatingSlider
                  ratingId={ratingId}
                  ratingsData={ratingsData}
                  setRatingsData={setRatingsData}
                />
              ))}
            </p>
            <div className="modal-action">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleAdd();
                  setModalOpen(false);
                }}
              >
                Add
              </button>
              <button
                className="btn btn-error"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
