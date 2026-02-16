export const WINDOW_IDS = {
  ABOUT: "about",
  PROJECTS: "projects",
  PLAYGROUND: "playground",
  RESUME: "resume",
};

export const WINDOW_META = [
  {
    id: WINDOW_IDS.ABOUT,
    title: "Adam Boyd",
    icon: "👤",
    size: "sm",

    defaultOpen: true,
    defaultState: "minimized",

    tags: ["system"],
    shortcut: "1",
  },

  {
    id: WINDOW_IDS.PROJECTS,
    title: "Projects",
    icon: "🗂️",
    size: "md",

    defaultOpen: true,
    defaultState: "minimized",

    tags: ["work"],
    shortcut: "2",
  },

  {
    id: WINDOW_IDS.PLAYGROUND,
    title: "Playground",
    icon: "🧪",
    size: "md",

    defaultOpen: true,
    defaultState: "minimized",

    tags: ["experiments"],
    shortcut: "3",
  },

  {
    id: WINDOW_IDS.RESUME,
    title: "Resume",
    icon: "📄",
    size: "sm",

    defaultOpen: true,
    defaultState: "minimized",

    tags: ["work"],
    shortcut: "4",
  },
];
