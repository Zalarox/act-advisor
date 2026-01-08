export const ratingKeys = [
  "present_moment",
  "values",
  "committed_action",
  "self_context",
  "defusion",
  "acceptance",
] as const;

export type RatingsData = Record<(typeof ratingKeys)[number], number>;

type RatingMetadata = {
  label: string;
  minString: string;
  maxString: string;
};

export const ratingMetadata: Record<keyof RatingsData, RatingMetadata> = {
  present_moment: {
    label: "Present Moment",
    minString: "Lost attention on past or future",
    maxString: "Purposeful attention to present moment",
  },
  values: {
    label: "Values",
    minString: "Unclear on my values",
    maxString: "Clear and strong values",
  },
  committed_action: {
    label: "Committed Action",
    minString: "Fail to act on my values",
    maxString: "Act on my values",
  },
  self_context: {
    label: "Self as Context",
    minString: "Thoughts and feelings are me",
    maxString: "Distinct from my thoughts and feelings",
  },
  defusion: {
    label: "Defusion",
    minString: "Thoughts guiding actions",
    maxString: "Thoughts give one perspective",
  },
  acceptance: {
    label: "Acceptance",
    minString: "Resist negative thoughts and feelings",
    maxString: "Accept all thoughts and feelings",
  },
};

export const getInitialRatingsData = (): RatingsData =>
  Object.fromEntries(ratingKeys.map((key) => [key, 5])) as RatingsData;
