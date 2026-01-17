export const ratingKeys = [
  "present_moment",
  "values",
  "committed_action",
  "self_context",
  "defusion",
  "acceptance",
] as const;

export type RatingKey = (typeof ratingKeys)[number];

export type RatingsData = Record<RatingKey, number>;

type RatingMetadata = {
  id: RatingKey;
  label: string;
  minString: string;
  maxString: string;
};

export const ratingMetadata: RatingMetadata[] = [
  {
    id: "present_moment",
    label: "Present Moment",
    minString: "Lost attention on past or future",
    maxString: "Purposeful attention to present moment",
  },
  {
    id: "values",
    label: "Values",
    minString: "Unclear on my values",
    maxString: "Clear and strong values",
  },
  {
    id: "committed_action",
    label: "Committed Action",
    minString: "Fail to act on my values",
    maxString: "Act on my values",
  },
  {
    id: "self_context",
    label: "Self as Context",
    minString: "Thoughts and feelings are me",
    maxString: "Distinct from my thoughts and feelings",
  },
  {
    id: "defusion",
    label: "Defusion",
    minString: "Thoughts guiding actions",
    maxString: "Thoughts give one perspective",
  },
  {
    id: "acceptance",
    label: "Acceptance",
    minString: "Resist negative thoughts and feelings",
    maxString: "Accept all thoughts and feelings",
  },
];

export const getInitialRatingsData = (): RatingsData =>
  Object.fromEntries(ratingKeys.map((key) => [key, 5])) as RatingsData;

export const ratingKeysAvgSelect = ratingKeys
  .map((x) => `avg_${x}:${x}.avg()`)
  .join(", ");

export type RatingRow = {
  id: string;
  created_at: string;
  user_id: string;
  present_moment: number;
  values: number;
  committed_action: number;
  self_context: number;
  defusion: number;
  acceptance: number;
};

export type RatingAverages = {
  [K in RatingKey as `avg_${K}`]: number;
};
