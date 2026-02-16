import { useMemo, useState, useCallback, useRef } from "react";
import { WINDOW_META } from "@constants/windows";

/**
 * Window states:
 * - minimized: not rendered in desktop window layer, present in dock
 * - window: normal windowed frame
 * - fullscreen: fullscreen frame
 */

const SPAWN_OFFSET_X = 32;
const SPAWN_OFFSET_Y = 28;

const START_X = 130;
const START_Y = 80;

const makeInitialWindows = () => {
    const windows = {};

    WINDOW_META.forEach((w, i) => {
        windows[w.id] = {
            id: w.id,
            title: w.title,
            size: w.size,

            state: w.defaultState ?? "minimized",
            isOpen: w.defaultOpen ?? true,

            x: START_X + i * SPAWN_OFFSET_X,
            y: START_Y + i * SPAWN_OFFSET_Y,
        };
    });

    return windows;
};


const DEFAULT_WINDOWS = makeInitialWindows();

export default function useWindowManager(initialWindows = DEFAULT_WINDOWS) {
    const [windows, setWindows] = useState(initialWindows);

    // stack is back -> front. last item is active
    const [stack, setStack] = useState(() => {
        const openIds = Object.values(initialWindows)
            .filter((w) => w.isOpen && w.state !== "minimized")
            .map((w) => w.id);

        return openIds.length ? openIds : [];
    });

    const [minimizingIds, setMinimizingIds] = useState([]);
    const [closingIds, setClosingIds] = useState([]);


    // keep a ref for immediate, reliable spawn math (no stale closures)
    const spawnRef = useRef({ x: START_X, y: START_Y });

    const activeId = useMemo(() => stack[stack.length - 1] ?? null, [stack]);

    const isActive = useCallback((id) => id === activeId, [activeId]);

    const focusWindow = useCallback((id) => {
        setStack((prev) => {
            if (!prev.includes(id)) return prev;
            const others = prev.filter((x) => x !== id);
            return [...others, id];
        });
    }, []);

    const clampToViewport = useCallback((x, y, width = 820, height = 520) => {
        const padding = 16;

        const maxX = window.innerWidth - width - padding;
        const maxY = window.innerHeight - height - 80; // room for dock

        return {
            x: Math.max(padding, Math.min(x, maxX)),
            y: Math.max(padding + 38, Math.min(y, maxY)), // room for SystemBar
        };
    }, []);

    const openWindows = useMemo(() => {
        return Object.values(windows).filter((w) => w.isOpen);
    }, [windows]);


    const openWindow = useCallback(
        (id) => {
            // compute next spawn position synchronously
            const cursor = spawnRef.current;

            // we need current window size info; safe to read from state via setWindows updater below
            setWindows((prev) => {
                const w = prev[id];
                if (!w) return prev;

                const nextX = cursor.x + SPAWN_OFFSET_X;
                const nextY = cursor.y + SPAWN_OFFSET_Y;

                const sizeWidth = w.size === "lg" ? 980 : w.size === "sm" ? 640 : 820;
                const sizeHeight = w.size === "lg" ? 640 : w.size === "sm" ? 440 : 520;

                const clamped = clampToViewport(nextX, nextY, sizeWidth, sizeHeight);

                // advance cursor (ref) so rapid opens cascade correctly
                spawnRef.current = clamped;

                return {
                    ...prev,
                    [id]: {
                        ...w,
                        isOpen: true,
                        state: "window",
                        x: clamped.x,
                        y: clamped.y,
                    },
                };
            });

            setStack((prev) => {
                const others = prev.filter((x) => x !== id);
                return [...others, id];
            });
        },
        [clampToViewport]
    );

    const restoreWindow = useCallback((id) => {
        setWindows((prev) => {
            const w = prev[id];
            if (!w) return prev;

            const nextState =
                w.prevState === "fullscreen" ? "fullscreen" : "window";

            return {
                ...prev,
                [id]: {
                    ...w,
                    isOpen: true,
                    state: nextState,
                    prevState: undefined, // optional: clear once used
                    // IMPORTANT: do not modify x/y here
                },
            };
        });

        setStack((prev) => {
            const others = prev.filter((x) => x !== id);
            return [...others, id];
        });
    }, []);


    const openOrFocus = useCallback(
        (id) => {
            const w = windows[id];
            if (!w) return;

            // minimized -> restore (same position, same prior state)
            if (w.isOpen && w.state === "minimized") {
                restoreWindow(id);
                return;
            }

            // closed -> open (spawn)
            if (!w.isOpen) {
                openWindow(id);
                return;
            }

            // already open -> focus
            focusWindow(id);
        },
        [windows, restoreWindow, openWindow, focusWindow]
    );


    const minimizeWindow = useCallback((id) => {
        setMinimizingIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

        setTimeout(() => {
            setWindows((prev) => {
                const w = prev[id];
                if (!w) return prev;

                return {
                    ...prev,
                    [id]: {
                        ...w,
                        isOpen: true,
                        prevState: w.state,
                        state: "minimized",
                    },
                };
            });


            setStack((prev) => prev.filter((x) => x !== id));
            setMinimizingIds((prev) => prev.filter((x) => x !== id));
        }, 120);
    }, []);

    const toggleFullscreen = useCallback((id) => {
        setWindows((prev) => {
            const w = prev[id];
            if (!w) return prev;

            const nextState = w.state === "fullscreen" ? "window" : "fullscreen";
            return { ...prev, [id]: { ...w, state: nextState, isOpen: true } };
        });

        setStack((prev) => {
            const others = prev.filter((x) => x !== id);
            return [...others, id];
        });
    }, []);

    const closeWindow = useCallback((id) => {
        setClosingIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

        setTimeout(() => {
            setWindows((prev) => {
                const w = prev[id];
                if (!w) return prev;

                return {
                    ...prev,
                    [id]: { ...w, isOpen: false, state: "minimized" },
                };
            });

            setStack((prev) => prev.filter((x) => x !== id));
            setClosingIds((prev) => prev.filter((x) => x !== id));
            setMinimizingIds((prev) => prev.filter((x) => x !== id));
        }, 120);
    }, []);

    const openUrlWindow = useCallback((url, title = "Browser") => {
        const id =
            (globalThis.crypto?.randomUUID?.() && `browser-${crypto.randomUUID()}`) ||
            `browser-${Date.now()}`;

        // compute next spawn position
        const cursor = spawnRef.current;

        const nextX = cursor.x + SPAWN_OFFSET_X;
        const nextY = cursor.y + SPAWN_OFFSET_Y;

        const sizeWidth = 980;  // "lg"
        const sizeHeight = 640;

        const clamped = clampToViewport(nextX, nextY, sizeWidth, sizeHeight);
        spawnRef.current = clamped;

        setWindows((prev) => ({
            ...prev,
            [id]: {
                id,
                type: "browser",
                title,
                url,
                size: "lg",
                state: "window",
                isOpen: true,
                x: clamped.x,
                y: clamped.y,
            },
        }));

        setStack((prev) => [...prev.filter((x) => x !== id), id]);
    }, [clampToViewport]);


    const visibleWindows = useMemo(() => {
        return stack
            .map((id) => windows[id])
            .filter(Boolean)
            .filter((w) => w.isOpen && w.state !== "minimized");
    }, [stack, windows]);

    const minimizedWindows = useMemo(() => {
        return Object.values(windows).filter((w) => w.isOpen && w.state === "minimized");
    }, [windows]);

    return {
        windows,
        stack,
        activeId,

        visibleWindows,
        minimizedWindows,
        openWindows,
        minimizingIds,
        closingIds,

        isActive,

        openWindow,
        openOrFocus,
        focusWindow,
        minimizeWindow,
        restoreWindow,
        toggleFullscreen,
        closeWindow,
        openUrlWindow,
    };
}
