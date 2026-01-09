import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Modal } from "./Modal";
import { ResponsiveRadar } from "@nivo/radar";
import { useTheme } from "../contexts/ThemeContext";
import { nivoDarkTheme, nivoLightTheme } from "../models/ChartTheme";
import { ratingKeys, ratingMetadata } from "../models/Ratings";
import { computeAverages, useUserRatings } from "../utils/supabase";

export const Dashboard = () => {
  const auth = useAuth();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: rows, refetch, isFetching } = useUserRatings(auth.user?.id);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour > 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="h-dvh text-center bg-base-200">
      <div className="font-extrabold text-2xl p-10">
        {getGreeting()}, you are logged in as {auth.user?.email}.
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Add new rating
        </button>
      </div>
      <div className="flex flex-col justify-center items-center p-10">
        <div className="font-bold text-2xl flex gap-2 items-center">
          <span>Your average scores over {rows?.length ?? 0} entries</span>
          <button
            className="btn btn-ghost"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Refreshing…" : "Refresh?"}
          </button>
        </div>
        <div className="w-full max-w-3xl h-100">
          <ResponsiveRadar
            data={rows ? computeAverages(rows) ?? [] : []}
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
        <div>
          <table className="table table-zebra">
            <thead>
              <th>#</th>
              <th>Created At</th>
              {ratingMetadata.map((x) => (
                <th key={x.id}>{x.label}</th>
              ))}
            </thead>
            <tbody>
              {rows?.map((row, i) => (
                <tr key={row.id}>
                  <td>{i + 1}</td>
                  <td>{new Date(row.created_at).toLocaleDateString()}</td>
                  {ratingKeys.map((k) => (
                    <td key={k}>{row[k]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalOpen && <Modal setModalOpen={setModalOpen} />}
    </div>
  );
};
