import { useState } from "react";
import {
  getInitialRatingsData,
  ratingKeys,
  type RatingsData,
} from "../models/Ratings";
import { RatingSlider } from "./RatingSlider";
import { supabase } from "../utils/supabase";
import { useRefreshQueries } from "../utils/queries";

export const Modal = ({
  setModalOpen,
}: {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [ratingsData, setRatingsData] = useState<RatingsData>(
    getInitialRatingsData(),
  );

  const refresh = useRefreshQueries();

  const handleAdd = async () => {
    const { error } = await supabase.from("rating").insert([
      {
        ...ratingsData,
      },
    ]);

    if (error) {
      console.error("Error adding rating:", error);
    }

    refresh();
  };

  return (
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
          <button className="btn btn-error" onClick={() => setModalOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
