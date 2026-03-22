export const WINDOW_SIZE = {
    sm: { w: 640, h: 440 },
    md: { w: 820, h: 520 },
    lg: { w: 980, h: 560 },
};

export const PROGRAMS = [
    // ---------------- MAIN ----------------

    {
        id: 'about',
        title: 'About Me',
        iconSrc: 'About.png',
        group: 'Main',
        size: { w: 640, h: 480 },
        noScroll: false,
        desktop: true,
        defaultOpen: true,
        defaultState: 'window',
        home: { ax: 0.06, ay: 0.08 }, // upper left
    },
    {
        id: 'resume',
        title: 'Resume',
        iconSrc: 'Resume.png',
        group: 'Main',
        size: WINDOW_SIZE.md,
        noScroll: false,
        desktop: true,
        home: { ax: 0.22, ay: 0.16 }, // slightly right & down
    },
    {
        id: 'projects',
        title: 'Projects',
        iconSrc: 'Projects.png',
        group: 'Main',
        size: WINDOW_SIZE.lg,
        noScroll: false,
        desktop: true,
        home: { ax: 0.5, ay: 0.08 }, // upper right quadrant
    },
    // ---------------- SETTINGS ----------------
    {
        id: "wallpaperpicker",
        title: "Wallpaper",
        iconSrc: "Wallpaper.png",
        group: "Settings",
        size: { w: 960, h: 560 },
        noScroll: false,
        desktop: false,
        home: { ax: 0.19, ay: 0.30 }, // mid-left
        sourceUrl: "WallpaperPickerWindow"
    },
    // ---------------- MINI APPS ----------------
    {
        id: 'calculator',
        title: 'Calculator',
        iconSrc: 'Calculator.png',
        group: 'Mini Apps',
        subgroup: 'Utilities',
        size: { w: 420, h: 560 },
        noScroll: true,
        desktop: false,
        home: { ax: 0.78, ay: 0.48 }, // bottom right
        sourceUrl: "CalculatorWindow"
    },
    {
        id: 'tipcalculator',
        title: 'Tip Calculator',
        iconSrc: 'TipCalculator.png',
        group: 'Mini Apps',
        subgroup: 'Utilities',
        size: { w: 330, h: 560 },
        noScroll: true,
        desktop: false,
        home: { ax: 0.78, ay: 0.28 }, // right mid
        sourceUrl: "TipCalculatorWindow"
    },
    {
        id: 'gradientpicker',
        title: 'Gradient Picker',
        iconSrc: 'GradientPicker.png',
        group: 'Mini Apps',
        subgroup: 'Utilities',
        size: { w: 520, h: 520 },
        noScroll: true,
        desktop: false,
        home: { ax: 0.36, ay: 0.52 }, // lower center-left
        sourceUrl: "GradientPickerWindow"
    },
    {
        id: 'todo',
        title: 'To-Do List',
        iconSrc: 'ToDo.png',
        group: 'Mini Apps',
        subgroup: 'Productivity',
        size: { w: 620, h: 570 },
        noScroll: false,
        desktop: false,
        home: { ax: 0.18, ay: 0.32 }, // mid-left
        sourceUrl: "ToDoWindow"
    },
    {
        id: 'passwordgenerator',
        title: 'Password Generator',
        iconSrc: 'PasswordGenerator.png',
        group: 'Mini Apps',
        subgroup: 'Utilities',
        size: { w: 420, h: 480 },
        noScroll: true,
        desktop: false,
        home: { ax: 0.58, ay: 0.48 }, // lower right-center
        sourceUrl: "PasswordGeneratorWindow"
    },
    {
        id: 'unitconverter',
        title: 'Unit Converter',
        iconSrc: 'UnitConverter.png',
        group: 'Mini Apps',
        subgroup: 'Utilities',
        size: { w: 430, h: 560 },
        noScroll: false,
        desktop: false,
        home: { ax: 0.5, ay: 0.32 },
        sourceUrl: "UnitConverterWindow"
    },
    {
        id: 'tictactoe',
        title: 'Tic Tac Toe',
        iconSrc: 'TicTacToe.png',
        group: 'Mini Apps',
        subgroup: 'Games',
        size: { w: 420, h: 560 },
        noScroll: false,
        desktop: false,
        home: { ax: 0.5, ay: 0.56 },
        sourceUrl: "TicTacToeWindow"
    },
    {
        id: 'workoutlog',
        title: 'Workout Log',
        iconSrc: 'WorkoutLog.png',
        group: 'Mini Apps',
        subgroup: 'Productivity',
        size: { w: 920, h: 560 },
        noScroll: false,
        desktop: false,
        home: { ax: 0.64, ay: 0.56 },
        sourceUrl: "WorkoutLogWindow"
    },
    {
        id: 'tasklog',
        title: 'Task Log',
        iconSrc: 'TaskLog.png',
        group: 'Mini Apps',
        subgroup: 'Productivity',
        size: { w: 1020, h: 560 },
        noScroll: false,
        desktop: false,
        home: { ax: 0.36, ay: 0.28 },
        sourceUrl: "TaskLogWindow"
    },
    {
        id: 'dictionary',
        title: 'Dictionary',
        iconSrc: 'Dictionary.png',
        group: 'Mini Apps',
        subgroup: 'Data',
        size: { w: 820, h: 560 },
        noScroll: false,
        desktop: false,
        home: { ax: 0.06, ay: 0.56 },
        sourceUrl: "DictionaryWindow"
    },
    {
        id: 'recipebook',
        title: 'Recipe Book',
        iconSrc: 'RecipeBook.png',
        group: 'Mini Apps',
        subgroup: 'Data',
        size: WINDOW_SIZE.lg,
        noScroll: false,
        desktop: false,
        home: { ax: 0.78, ay: 0.56 },
        sourceUrl: "RecipebookWindow"
    },
    {
        id: 'weather',
        title: 'Weather',
        iconSrc: 'Weather.png',
        group: 'Mini Apps',
        subgroup: 'Data',
        size: { w: 860, h: 560 },
        noScroll: false,
        desktop: false,
        home: { ax: 0.22, ay: 0.56 },
        sourceUrl: "WeatherWindow"
    },
];
