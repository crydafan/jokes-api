export type Joke = {
  id: number;
  category:
    | "general"
    | "programming"
    | "tech"
    | "food"
    | "animals"
    | "work"
    | "school"
    | "science"
    | "travel"
    | "gaming";
  setup: string;
  punchline: string;
};
