import type {
  ExperienceCard,
  EventPoster,
  ResidentDJ,
  GalleryItem,
  StatItem,
  Testimonial,
  StoryChapter,
  NavLink,
} from "@/types";

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const NAV_LINKS: NavLink[] = [
  { id: "experience", label: "Experience" },
  { id: "events", label: "Events" },
  { id: "djs", label: "Residents" },
  { id: "gallery", label: "Gallery" },
  { id: "vip", label: "VIP" },
  { id: "reserve", label: "Reserve" },
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "city",
    index: "01",
    title: "The City Awakens",
    caption: "Neon arteries pulse as midnight approaches.",
    image: img("1519677100203-a0e668c92439"),
  },
  {
    id: "entrance",
    index: "02",
    title: "The Entrance",
    caption: "Velvet ropes part. The threshold of another world.",
    image: img("1545128485-c400e7702796"),
  },
  {
    id: "mainfloor",
    index: "03",
    title: "The Main Floor",
    caption: "A cathedral of light, sound and motion.",
    image: img("1571266028243-e4733b0f0bb0"),
  },
  {
    id: "vip",
    index: "04",
    title: "The VIP Lounge",
    caption: "Where the city's elite watch the night unfold.",
    image: img("1566417713940-fe7c737a9ef2"),
  },
  {
    id: "dancefloor",
    index: "05",
    title: "The Dancefloor",
    caption: "Gravity dissolves. The crowd becomes one organism.",
    image: img("1516450360452-9312f5e86fc7"),
  },
  {
    id: "climax",
    index: "06",
    title: "The Climax",
    caption: "Lasers ignite. The drop lands. The night peaks.",
    image: img("1493676304819-0d7a8d026dcf"),
  },
];

export const EXPERIENCE_CARDS: ExperienceCard[] = [
  {
    id: "vip-tables",
    index: "01",
    title: "VIP Tables",
    description:
      "Private bottle service on elevated platforms overlooking the floor. Dedicated host, champagne parades and the best sightlines in the house.",
    tag: "Bottle Service",
    accent: "violet",
    image: img("1574391884720-bbc3740c59d1"),
  },
  {
    id: "cocktails",
    index: "02",
    title: "Signature Cocktails",
    description:
      "A laboratory of liquid art. Smoke, gold leaf and rare spirits crafted by award-winning mixologists into edible-light theatre.",
    tag: "Mixology",
    accent: "magenta",
    image: img("1514362545857-3bc16c4c7d1b"),
  },
  {
    id: "djs",
    index: "03",
    title: "World-Class DJs",
    description:
      "A rotating cast of global headliners and underground icons on a Funktion-One system engineered for physical, body-moving sound.",
    tag: "Live Sets",
    accent: "cyan",
    image: img("1470229722913-7c0e2dbbafd3"),
  },
  {
    id: "atmosphere",
    index: "04",
    title: "Luxury Atmosphere",
    description:
      "Kinetic lighting, programmable lasers and immersive haze choreographed in real time to turn every moment into cinema.",
    tag: "Immersive Design",
    accent: "gold",
    image: img("1492684223066-81342ee5ff30"),
  },
];

export const EVENTS: EventPoster[] = [
  {
    id: "neon-genesis",
    title: "Neon Genesis",
    date: "Fri · 12 Sep",
    lineup: "Amelie Lens · Charlotte de Witte",
    tag: "Techno",
    accent: "violet",
    image: img("1492684223066-81342ee5ff30"),
  },
  {
    id: "midnight-gold",
    title: "Midnight Gold",
    date: "Sat · 20 Sep",
    lineup: "Black Coffee · Peggy Gou",
    tag: "House",
    accent: "gold",
    image: img("1516450360452-9312f5e86fc7"),
  },
  {
    id: "afterglow",
    title: "Afterglow",
    date: "Fri · 26 Sep",
    lineup: "Tale Of Us · Mind Against",
    tag: "Melodic",
    accent: "cyan",
    image: img("1571266028243-e4733b0f0bb0"),
  },
  {
    id: "velvet-room",
    title: "Velvet Room",
    date: "Sat · 04 Oct",
    lineup: "The Blessed Madonna · Honey Dijon",
    tag: "Disco",
    accent: "magenta",
    image: img("1566417713940-fe7c737a9ef2"),
  },
  {
    id: "eclipse",
    title: "Eclipse",
    date: "Fri · 10 Oct",
    lineup: "Adriatique · Innellea",
    tag: "Progressive",
    accent: "violet",
    image: img("1493676304819-0d7a8d026dcf"),
  },
];

export const RESIDENT_DJS: ResidentDJ[] = [
  {
    id: "lumen",
    name: "Lena Voss",
    alias: "LUMEN",
    genre: "Melodic Techno",
    residency: "Every Friday",
    accent: "cyan",
    image: img("1593697821252-0c9137d9fc45"),
  },
  {
    id: "noctis",
    name: "Marco Adel",
    alias: "NOCTIS",
    genre: "Afro House",
    residency: "Twice a month",
    accent: "gold",
    image: img("1598387993441-a364f854c3e1"),
  },
  {
    id: "syren",
    name: "Ava Cruz",
    alias: "SYREN",
    genre: "Tech House",
    residency: "Every Saturday",
    accent: "magenta",
    image: img("1535525153412-5a42439a210d"),
  },
  {
    id: "vektor",
    name: "Dorian Kaye",
    alias: "VEKTOR",
    genre: "Progressive",
    residency: "Monthly headline",
    accent: "violet",
    image: img("1507003211169-0a1dd7228f2d"),
  },
];

export const GALLERY: GalleryItem[] = [
  { id: "g1", src: img("1516450360452-9312f5e86fc7"), span: "tall", caption: "Main Floor" },
  { id: "g2", src: img("1492684223066-81342ee5ff30"), span: "regular", caption: "Lasers" },
  { id: "g3", src: img("1571266028243-e4733b0f0bb0"), span: "wide", caption: "The Crowd" },
  { id: "g4", src: img("1566417713940-fe7c737a9ef2"), span: "regular", caption: "VIP Lounge" },
  { id: "g5", src: img("1493676304819-0d7a8d026dcf"), span: "tall", caption: "The Drop" },
  { id: "g6", src: img("1514525253161-7a46d19cd819"), span: "regular", caption: "Bottle Service" },
  { id: "g7", src: img("1470229722913-7c0e2dbbafd3"), span: "wide", caption: "Headliner" },
  { id: "g8", src: img("1545128485-c400e7702796"), span: "regular", caption: "The Entrance" },
];

export const STATS: StatItem[] = [
  { id: "visitors", value: 100, suffix: "K+", label: "Visitors A Year", accent: "violet" },
  { id: "events", value: 500, suffix: "+", label: "Events Hosted", accent: "cyan" },
  { id: "artists", value: 250, suffix: "+", label: "Resident & Guest Artists", accent: "magenta" },
  { id: "rating", value: 5, suffix: "★", label: "Average Experience", accent: "gold" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Charlie isn't a club, it's a production. Every detail — the lighting, the sound, the service — is engineered to perfection. The best night I've had in years.",
    author: "Sofia Marchetti",
    role: "Lifestyle Editor, LUXE",
    accent: "violet",
  },
  {
    id: "t2",
    quote:
      "The VIP experience is genuinely world-class. Our host anticipated everything before we asked. It felt like Vegas and Ibiza had a child — and it lives here.",
    author: "James Okafor",
    role: "Founder, Nova Studios",
    accent: "cyan",
  },
  {
    id: "t3",
    quote:
      "I've played the biggest rooms on earth and Charlie's sound system is up there with the best. The crowd, the energy, the lasers — unforgettable.",
    author: "VEKTOR",
    role: "Resident DJ",
    accent: "magenta",
  },
  {
    id: "t4",
    quote:
      "From the velvet entrance to the last record, it's pure cinema. This is what premium nightlife is supposed to feel like.",
    author: "Elena Brandt",
    role: "Creative Director",
    accent: "gold",
  },
];
