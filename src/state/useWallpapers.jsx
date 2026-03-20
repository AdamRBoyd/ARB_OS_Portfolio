import { useEffect, useState } from "react";

const WALLPAPER_KEY = "desktop_wallpaper";

export default function useWallpapers() {
  const [wallpapers, setWallpapers] = useState([]);
  const [selectedWallpaperId, setSelectedWallpaperId] = useState(
    () => localStorage.getItem(WALLPAPER_KEY) || ""
  );

  useEffect(() => {
    let isMounted = true;

    async function loadWallpapers() {
      try {
        const res = await fetch("/json/wallpapers.json");
        if (!res.ok) throw new Error("Failed to load wallpapers");
        const data = await res.json();

        if (!isMounted) return;

        const list = Array.isArray(data) ? data : [];
        setWallpapers(list);

        const savedId = localStorage.getItem(WALLPAPER_KEY);

        if (savedId && list.some((item) => item.id === savedId)) {
          setSelectedWallpaperId(savedId);
        } else if (list.length > 0) {
          setSelectedWallpaperId(list[0].id);
          localStorage.setItem(WALLPAPER_KEY, list[0].id);
        }
      } catch (err) {
        console.error("Wallpaper load error:", err);
      }
    }

    loadWallpapers();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedWallpaper =
    wallpapers.find((item) => item.id === selectedWallpaperId) || null;

  const selectWallpaper = (id) => {
    setSelectedWallpaperId(id);
    localStorage.setItem(WALLPAPER_KEY, id);
  };

  return {
    wallpapers,
    selectedWallpaper,
    selectedWallpaperId,
    selectWallpaper,
  };
}