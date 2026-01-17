import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "../contexts/ThemeContext";
import { nivoDarkTheme, nivoLightTheme } from "../models/ChartTheme";
import { ratingKeys, ratingMetadata } from "../models/Ratings";
import { useState } from "react";

const generateRandomData = () => {
  const sampleDates = [
    "01 Jan",
    "05 Jan",
    "10 Jan",
    "15 Jan",
    "20 Jan",
    "25 Jan",
    "30 Jan",
  ];
  const randomScore = () => Math.floor(Math.random() * 10) + 1;

  return ratingKeys.map((key) => ({
    id: ratingMetadata.find((x) => x.id === key)?.label ?? "",
    data: sampleDates.map((date) => ({
      x: date,
      y: randomScore(),
    })),
  }));
};

export const RightPanel = () => {
  const [filter, setFilter] = useState<string[]>(
    ratingMetadata.map((r) => r.id),
  );

  const [data] = useState(() => generateRandomData());
  const [timePeriod, setTimePeriod] = useState("last_week");
  const theme = useTheme();

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
        onChange={(e) => setTimePeriod(e.target.value)}
      >
        <option disabled={true}>Time period</option>
        <option value="last_week">Last week</option>
        <option value="last_month">Last month</option>
        <option value="all">All</option>
      </select>

      <div className="h-full min-h-200">
        <ResponsiveLine
          data={data}
          margin={{ top: 40, right: 50, bottom: 300, left: 50 }}
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
            legendOffset: 50,
            legendPosition: "middle",
          }}
          axisLeft={{
            legend: "Score",
            legendOffset: -35,
            legendPosition: "middle",
          }}
          pointSize={8}
          pointBorderWidth={2}
          legends={[
            {
              anchor: "bottom-left",
              direction: "row",
              itemWidth: 150,
              itemHeight: 30,
              translateY: 100,
              translateX: 25,
              symbolShape: "circle",
              symbolSize: 10,
            },
          ]}
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
