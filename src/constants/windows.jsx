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
    iconSrc: "/images/icons/About.png",
    size: "sm",

    defaultOpen: true,
    defaultState: "minimized",

    tags: ["system"],
    shortcut: "1",
  },

  {
    id: WINDOW_IDS.PROJECTS,
    title: "Projects",
    iconSrc: "/images/icons/Projects.png",
    size: "md",

    defaultOpen: true,
    defaultState: "minimized",

    tags: ["work"],
    shortcut: "2",
  },

  {
    id: WINDOW_IDS.PLAYGROUND,
    title: "Playground",
    iconSrc: "/images/icons/Playground.png",
    size: "md",

    defaultOpen: true,
    defaultState: "minimized",

    tags: ["experiments"],
    shortcut: "3",
  },

  {
    id: WINDOW_IDS.RESUME,
    title: "Resume",
    iconSrc: "/images/icons/Resume.png",
    size: "sm",

    defaultOpen: true,
    defaultState: "minimized",

    tags: ["work"],
    shortcut: "4",
  },
];
