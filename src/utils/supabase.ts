import { createClient } from "@supabase/supabase-js";
import { ratingKeys, ratingMetadata, type RatingRow } from "../models/Ratings";
import { useQuery } from "@tanstack/react-query";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchUserRatings = async (
  userId: string
): Promise<RatingRow[]> => {
  const { data, error } = await supabase
    .from("rating")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const useUserRatings = (userId: string | undefined) => {
  if (!userId) {
    throw new Error("User ID is required to fetch ratings");
  }

  return useQuery({
    queryKey: ["rating", userId],
    queryFn: () => fetchUserRatings(userId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};

export const computeAverages = (rows: RatingRow[]) => {
  if (rows.length === 0) return undefined;

  const totals = ratingKeys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as Record<(typeof ratingKeys)[number], number>);

  for (const row of rows) {
    for (const key of ratingKeys) {
      totals[key] += row[key];
    }
  }

  return ratingKeys.map((key) => ({
    label: ratingMetadata.find((x) => x.id === key)?.label || "",
    score: Number((totals[key] / rows.length).toFixed(2)),
  }));
};

export default supabase;
