export type NeonColor = "violet" | "magenta" | "cyan" | "gold";

export interface NavLink {
  id: string;
  label: string;
}

export interface ExperienceCard {
  id: string;
  index: string;
  title: string;
  description: string;
  tag: string;
  accent: NeonColor;
  image: string;
}

export interface EventPoster {
  id: string;
  title: string;
  date: string;
  lineup: string;
  tag: string;
  accent: NeonColor;
  image: string;
}

export interface ResidentDJ {
  id: string;
  name: string;
  alias: string;
  genre: string;
  residency: string;
  accent: NeonColor;
  image: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  span: "tall" | "wide" | "regular";
  caption: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  accent: NeonColor;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  accent: NeonColor;
}

export interface StoryChapter {
  id: string;
  index: string;
  title: string;
  caption: string;
  image: string;
}
