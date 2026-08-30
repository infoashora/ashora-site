export type StorytellingIngredient = {
  name: string;
  description: string;
};

export type StorytellingPoint = {
  title: string;
  description: string;
};

export type StorytellingFragranceNote = {
  label: string;
  name: string;
};

export type StorytellingCareItem = {
  title: string;
  description: string;
};

export type StorytellingReview = {
  name: string;
  location?: string;
  review: string;
};

export type ProductStorytelling = {
  whyThisCandle: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };

  insideYourCandle: {
    eyebrow: string;
    heading: string;
    introduction: string;
    ingredients: StorytellingIngredient[];
    waxDescription: string;
    burnTime: string;
    affirmationCard: string;
  };

  whyYoullLoveIt: {
    eyebrow: string;
    heading: string;
    points: StorytellingPoint[];
  };

  smellsLike: {
    eyebrow: string;
    heading: string;
    notes: StorytellingFragranceNote[];
    paragraphs: string[];
  };

  ritual: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    closingLine: string;
  };

  candleCare: {
    eyebrow: string;
    heading: string;
    introduction: string;
    items: StorytellingCareItem[];
    closingLine: string;
  };

  reviews: {
    eyebrow: string;
    heading: string;
    introduction?: string;
    reviews: StorytellingReview[];
  };

  relatedProducts: {
    eyebrow: string;
    heading: string;
  };
};