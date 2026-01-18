import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "../contexts/ThemeContext";
import { nivoDarkTheme, nivoLightTheme } from "../models/ChartTheme";
import { ratingMetadata } from "../models/Ratings";
import { useState } from "react";
import { useUserRatings } from "../utils/queries";
import { useAuth } from "../contexts/AuthContext";
import { toLineSeries } from "../utils/supabase";

export type TimePeriod = "last_week" | "last_month" | "all";

export const RightPanel = () => {
  const [filter, setFilter] = useState<string[]>(
    ratingMetadata.map((r) => r.id),
  );

  const getPrettyDate = (value: string) => {
    const date = new Date(value);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  const [timePeriod, setTimePeriod] = useState<TimePeriod>("last_week");
  const auth = useAuth();
  const theme = useTheme();
  const { data } = useUserRatings(auth.user?.id, timePeriod);

  return (
    <div id="right-panel" className="h-100">
      <div className="dropdown">
        <label tabIndex={0} className="btn mx-5">
          Filter Graph
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {ratingMetadata.map((rating) => (
            <li key={rating.id}>
              <label className="cursor-pointer flex items-center gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={filter.includes(rating.id)}
                  onChange={() => {
                    setFilter((prev) =>
                      prev.includes(rating.id)
                        ? prev.filter((x) => x !== rating.id)
                        : [...prev, rating.id],
                    );
                  }}
                />
                <span>{rating.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <select
        className="select"
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
      >
        <option disabled={true}>Time period</option>
        <option value="last_week">Last week</option>
        <option value="last_month">Last month</option>
        <option value="all">All</option>
      </select>

      <div className="h-full min-h-200">
        <ResponsiveLine
          data={data ? toLineSeries(data) : []}
          margin={{ top: 40, right: 50, bottom: 300, left: 55 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 1,
            max: 10,
            stacked: false,
          }}
          axisBottom={{
            tickRotation: -45,
            legend: "Date",
            legendOffset: 65,
            legendPosition: "middle",
            format: getPrettyDate,
          }}
          axisLeft={{
            legend: "Score",
            legendOffset: -45,
            legendPosition: "middle",
          }}
          pointSize={8}
          pointBorderWidth={2}
          legends={[
            {
              anchor: "bottom",
              direction: "column",
              itemWidth: 10,
              itemHeight: 30,
              translateY: 275,
              translateX: -50,
              symbolShape: "circle",
              symbolSize: 10,
            },
          ]}
          tooltip={({ point }) => (
            <div className="bg-base-200 p-4 w-50">
              <div className="font-extrabold">
                Date: {getPrettyDate(point.data.x as string)}
              </div>
              <div className="mt-4">
                {point.seriesId} score average: {point.data.y?.toString()}
              </div>
            </div>
          )}
          useMesh={true}
          theme={theme.isDarkMode ? nivoDarkTheme : nivoLightTheme}
          colors={
            theme.isDarkMode ? { scheme: "dark2" } : { scheme: "pastel1" }
          }
        />
      </div>
    </div>
  );
};
