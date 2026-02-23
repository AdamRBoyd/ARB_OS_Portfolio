export const WINDOW_SIZE = {
  sm: { w: 640, h: 440 },
  md: { w: 820, h: 520 },
  lg: { w: 980, h: 640 },
};

export const DESKTOP_ICONS = [
  { id: "about", iconSrc: "/images/icons/About.png" },
  { id: "projects", iconSrc: "/images/icons/Projects.png" },
  { id: "resume", iconSrc: "/images/icons/Resume.png" },
];

export const PROGRAMS = [
  { id: "about", title: "About Me", iconSrc: "images/icons/About.png", group: "Main", size: { w: 640, h: 480 }, noScroll: false, defaultOpen: true, defaultState: "normal", },
  { id: "resume", title: "Resume", iconSrc: "images/icons/Resume.png", group: "Main", size: WINDOW_SIZE.md, noScroll: false, },
  { id: "projects", title: "Projects", iconSrc: "images/icons/Projects.png", group: "Main", size: WINDOW_SIZE.lg, noScroll: false, },

  // Mini apps (add these windows later when you build them)
  { id: "calculator", title: "Calculator", iconSrc: "images/icons/Calculator.png", group: "Mini Apps", subgroup: "Utilities", size: { w: 420, h: 580 }, noScroll: true, },
  { id: "tipcalculator", title: "Tip Calculator", iconSrc: "images/icons/TipCalculator.png", group: "Mini Apps", subgroup: "Utilities", size: { w: 330, h: 580 }, noScroll: true, },
  { id: "gradientpicker", title: "Gradient Picker", iconSrc: "images/icons/GradientPicker.png", group: "Mini Apps", subgroup: "Utilities", size: { w: 520, h: 520 }, noScroll: true, },
  { id: "todo", title: "To-Do List", iconSrc: "images/icons/ToDo.png", group: "Mini Apps", subgroup: "Productivity", size: { w: 620, h: 680 }, noScroll: false, },
  { id: "passwordgenerator", title: "Password Generator", iconSrc: "images/icons/PasswordGenerator.png", group: "Mini Apps", subgroup: "Utilities", size: { w: 420, h: 480 }, noScroll: true, },
  
  // Future mini apps
  { id: "dictionary", title: "Dictionary", iconSrc: "images/icons/Dictionary.png", group: "Mini Apps", subgroup: "Data", size: WINDOW_SIZE.sm, noScroll: false, },
  { id: "weather", title: "Weather", iconSrc: "images/icons/Weather.png", group: "Mini Apps", subgroup: "Data", size: WINDOW_SIZE.sm, noScroll: false, },
  { id: "tasklog", title: "Task Log", iconSrc: "images/icons/TaskLog.png", group: "Mini Apps", subgroup: "Productivity", size: WINDOW_SIZE.sm, noScroll: false, },
  { id: "tictactoe", title: "Tic Tac Toe", iconSrc: "images/icons/TicTacToe.png", group: "Mini Apps", subgroup: "Games", size: WINDOW_SIZE.sm, noScroll: false, },
  { id: "workoutlog", title: "Workout Log", iconSrc: "images/icons/WorkoutLog.png", group: "Mini Apps", subgroup: "Productivity", size: WINDOW_SIZE.sm, noScroll: false, },
  { id: "recipebook", title: "Recipe Book", iconSrc: "images/icons/RecipeBook.png", group: "Mini Apps", subgroup: "Data", size: WINDOW_SIZE.sm, noScroll: false, },
  { id: "unitconverter", title: "Unit Converter", iconSrc: "images/icons/UnitConverter.png", group: "Mini Apps", subgroup: "Utilities", size: WINDOW_SIZE.sm, noScroll: false, },
];