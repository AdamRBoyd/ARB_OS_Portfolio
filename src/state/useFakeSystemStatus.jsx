import { useEffect, useMemo, useState } from "react";

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function useFakeSystemStatus() {
  const [status, setStatus] = useState(() => ({
    wifi: { level: pick([1, 2, 3, 4]), connected: true },
    power: { charging: pick([true, false]), level: pick([42, 58, 73, 86, 96]) },
    sound: { muted: false, level: pick([0, 25, 50, 75, 100]) },
  }));

  // Optional: “life-like” drift
  useEffect(() => {
    const id = setInterval(() => {
      setStatus((s) => {
        const nextBattery = Math.max(
          5,
          Math.min(100, s.power.level + (s.power.charging ? 1 : -1))
        );

        return {
          ...s,
          power: { ...s.power, level: nextBattery },
        };
      });
    }, 1000 * 30);

    return () => clearInterval(id);
  }, []);

  const api = useMemo(() => {
    const toggleMute = () =>
      setStatus((s) => ({ ...s, sound: { ...s.sound, muted: !s.sound.muted } }));

    const toggleCharging = () =>
      setStatus((s) => ({ ...s, power: { ...s.power, charging: !s.power.charging } }));

    const cycleWifi = () =>
      setStatus((s) => ({
        ...s,
        wifi: { ...s.wifi, level: s.wifi.level === 4 ? 1 : s.wifi.level + 1 },
      }));

    return { toggleMute, toggleCharging, cycleWifi };
  }, []);

  return { status, ...api };
}
