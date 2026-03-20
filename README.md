# 💻 Adam Boyd Portfolio (Desktop OS-Inspired Interface)

A modern, interactive portfolio built with **React** that simulates a desktop operating system.  
Users navigate through windows, a dock, and system controls to explore projects, experience, and technical skills.

---

## 🚀 Overview

This project reimagines a traditional portfolio as a **desktop environment**, demonstrating advanced front-end engineering, UI/UX design, and state-driven architecture.

Instead of static pages, the application provides:

- Window-based navigation (open, focus, minimize, close)
- Desktop icons and dock interaction
- Dynamic wallpaper system with persistent settings
- Modular, scalable component architecture

---

## 🛠 Technical Skills & Technologies

- **Frontend:** React, JavaScript (ES6+), HTML5, CSS3
- **Styling:** Styled Components, responsive design
- **State Management:** Custom hooks, component state, memoization
- **Architecture:** Component-based design (atomic design principles)
- **Data Handling:** JSON-driven content, Fetch API
- **Persistence:** LocalStorage (user preferences)
- **Build Tools:** Vite
- **Version Control:** Git, GitHub

---

## ✨ Key Features

### 🪟 Window Management System

- Dynamic window creation and rendering
- Focus management and active window tracking
- Minimize, close, and fullscreen functionality
- Smooth animations and transitions

### 🖥 Desktop Interface

- Clickable desktop icons
- System bar displaying active window context
- Start menu for launching applications
- Dock with active app indicators

### 🎨 Dynamic Wallpaper System

- Wallpapers loaded from external JSON (`/public/json/wallpapers.json`)
- User selection persists via `localStorage`
- Thumbnail-based selection UI
- Easily extensible without rebuilding the application

### ⚡ Performance & Optimization

- Efficient rendering using React hooks (`useMemo`, `useEffect`)
- Minimal re-renders through state isolation
- Lightweight asset handling

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   ├── pages/
│   │   └── DesktopPage.jsx
│   └── primitives/
│
├── state/
│   └── useWallpapers.js
│   └── useWindowManager.js
│
├── utils/
│   └── covertUnits.jsx
│
public/
├── images/
│   └── wallpapers/
│       ├── full/
│       └── thumbs/
│
├── json/
│   └── wallpapers.json
│
├── apiKeys.json
├── App.jsx
├── main.jsx
---

## 🧩 Extensible Wallpaper System

Add new wallpapers without modifying application code.

### Example JSON

```json
[
  {
    "id": "default",
    "title": "Default",
    "src": "default.jpg"
  }
]

### File Placement

    public/images/wallpapers/
    ├── full/
    │   └── default.jpg
    └── thumbs/
        └── default.jpg

---

### Api Keys

This file is not synced to my GitHub as is includes personal API keys.

The structure is as follows:

```json

{
    "codeWeather": {
        "appid": "Your appid, supplied by OpenWeather"
    }
}

---

## ▶️ Getting Started

    git clone https://github.com/AdamRBoyd/ARB_OS_Portfolio.git
    cd YOUR_REPO
    npm install
    create apiKeys.json
    npm run dev

---

## 🧪 Future Enhancements

- Draggable and resizable windows
- Light/Dark theme toggle
- Animated or time-based wallpapers
- Audio feedback for system interactions

---

## 👨‍💻 Author

**Adam Boyd**

- GitHub: https://github.com/AdamRBoyd
- LinkedIn: https://www.linkedin.com/in/adamrichardboyd/
- Live Project: https://adamrboyd.dev/

---

## 💡 Summary

This project demonstrates:

- Strong proficiency in **React** and modern **JavaScript**
- Ability to design and implement **complex UI systems**
- Experience building **scalable, maintainable front-end architecture**
- Focus on **user experience, performance, and product-level polish**
