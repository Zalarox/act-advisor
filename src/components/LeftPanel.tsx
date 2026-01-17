import { useAuth } from "../contexts/AuthContext";
import { ResponsiveRadar } from "@nivo/radar";
import { ratingMetadata, ratingKeys } from "../models/Ratings";
import { useState } from "react";
import { useAverageRatings, useUserRatingsPage } from "../utils/queries";
import { nivoDarkTheme, nivoLightTheme } from "../models/ChartTheme";
import { useTheme } from "../contexts/ThemeContext";

export const LeftPanel = () => {
  const auth = useAuth();
  const theme = useTheme();

  const { data: averageRatings, refetch: refetchAvg } = useAverageRatings(
    auth.user?.id,
  );

  const [page, setPage] = useState(1);
  const {
    data: pageData,
    refetch: refetchPage,
    isFetching,
  } = useUserRatingsPage(auth.user?.id, page);

  return (
    <div id="left-panel">
      <div id="average-scores-text" className="text-center my-5">
        <div className="font-bold text-2xl">
          <button
            className="btn btn-ghost mb-2"
            onClick={() => {
              refetchPage();
              refetchAvg();
            }}
            disabled={isFetching}
          >
            {isFetching ? "Refreshing…" : "Refresh?"}
          </button>
          <div>Your average scores over {pageData?.totalCount} entries</div>
        </div>
      </div>
      <div id="radar-chart" className="w-full max-w-3xl h-100 mx-auto mb-10">
        <ResponsiveRadar
          data={averageRatings ?? []}
          keys={["score"]}
          indexBy="label"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          maxValue={10}
          gridLabelOffset={36}
          dotSize={10}
          dotColor={{ theme: "background" }}
          borderWidth={0.5}
          dotBorderWidth={2}
          enableDotLabel={true}
          blendMode="multiply"
          theme={theme.isDarkMode ? nivoDarkTheme : nivoLightTheme}
          colors={
            theme.isDarkMode ? { scheme: "dark2" } : { scheme: "pastel1" }
          }
        />
      </div>

      <div className="mx-10">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Created At</th>
              {ratingMetadata.map((x) => (
                <th key={x.id}>{x.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData?.rows.map((row, i) => (
              <tr key={row.id}>
                <td>{(page - 1) * 5 + i + 1}</td>
                <td>
                  {new Date(row.created_at).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </td>
                {ratingKeys.map((k) => (
                  <td key={k}>{row[k]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4 justify-center">
          {pageData &&
            Array.from({ length: Math.ceil(pageData.totalCount / 5) }).map(
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1 ? "bg-primary text-white" : "bg-base-200"
                  }`}
                >
                  {i + 1}
                </button>
              ),
            )}
        </div>
      </div>
    </div>
  );
};
