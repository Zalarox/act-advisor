import { ratingMetadata, type RatingsData } from "../models/Ratings";

export const RatingSlider = ({
  ratingId,
  ratingsData,
  setRatingsData,
}: {
  ratingId: keyof RatingsData;
  ratingsData: RatingsData;
  setRatingsData: React.Dispatch<React.SetStateAction<RatingsData>>;
}) => {
  function getSliderClass(value: number): string {
    if (value <= 3) return "range-error";
    if (value <= 6) return "range-warning";
    return "range-success";
  }

  return (
    <div key={ratingId} className="mb-4 p-6 flex items-center">
      <div className="w-32 italic text-sm text-left wrap-break-word">
        {ratingMetadata[ratingId].minString}
      </div>
      <div className="flex-1">
        <label className="block font-medium mb-1 text-center">
          {`${ratingMetadata[ratingId].label}: ${ratingsData[ratingId]}`}
        </label>

        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={ratingsData[ratingId]}
          className={`w-full range range-sm ${getSliderClass(
            ratingsData[ratingId]
          )}`}
          onChange={(e) =>
            setRatingsData((prev) => ({
              ...prev,
              [ratingId]: Number(e.target.value),
            }))
          }
        />
      </div>
      <div className="w-32 italic text-sm text-right wrap-break-word">
        {ratingMetadata[ratingId].maxString}
      </div>
    </div>
  );
};
