import { useMemo, useState, useCallback, useRef } from 'react';
import { PROGRAMS, WINDOW_SIZE } from '@constants/programs';

/**
 * Window states:
 * - minimized: not rendered in desktop window layer, present in dock
 * - window: normal windowed frame
 * - fullscreen: fullscreen frame
 */

const SYSTEM_BAR_H = 38;
const DOCK_H = 72;
const VIEW_PADDING = 16;

const SPAWN_OFFSET_X = 32;
const SPAWN_OFFSET_Y = 28;

const START_X = 120;
const START_Y = 70;

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const clampToViewport = (x, y, w, h) => {
    const maxX = window.innerWidth - w - VIEW_PADDING;
    const maxY = window.innerHeight - h - DOCK_H;

    return {
        x: clamp(x, VIEW_PADDING, maxX),
        y: clamp(y, VIEW_PADDING + SYSTEM_BAR_H, maxY),
    };
};

/**
 * Converts a program "home" anchor (ax/ay) into an x/y position.
 * ax/ay are 0..1 representing usable workspace (minus padding + bars).
 * If home is missing, it will fall back to cascading from spawnRef.
 */
const computeSpawn = ({ home, size, spawnRef }) => {
    const w = size?.w ?? 820;
    const h = size?.h ?? 520;

    // Prefer "home" anchors if provided
    if (home && typeof home.ax === 'number' && typeof home.ay === 'number') {
        const usableW = window.innerWidth - VIEW_PADDING * 2 - w;
        const usableH =
            window.innerHeight - VIEW_PADDING * 2 - SYSTEM_BAR_H - DOCK_H - h;

        const baseX =
            VIEW_PADDING + clamp(home.ax, 0, 1) * Math.max(0, usableW);
        const baseY =
            VIEW_PADDING +
            SYSTEM_BAR_H +
            clamp(home.ay, 0, 1) * Math.max(0, usableH);

        return clampToViewport(baseX, baseY, w, h);
    }

    // Fallback: cascading cursor (your old behavior)
    const cursor = spawnRef.current;
    const nextX = cursor.x + SPAWN_OFFSET_X;
    const nextY = cursor.y + SPAWN_OFFSET_Y;

    const clamped = clampToViewport(nextX, nextY, w, h);
    spawnRef.current = clamped;
    return clamped;
};

const makeInitialWindows = () => {
    const windows = {};

    PROGRAMS.forEach((p) => {
        const isOpen = !!p.defaultOpen;
        const state = isOpen ? (p.defaultState ?? 'window') : 'minimized';

        windows[p.id] = {
            id: p.id,
            title: p.title,
            size: p.size,
            iconSrc: p.iconSrc,
            home: p.home,
            noScroll: !!p.noScroll,

            state,
            isOpen,

            x: START_X,
            y: START_Y,
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
            .filter((w) => w.isOpen && w.state !== 'minimized')
            .map((w) => w.id);
        return openIds.length ? openIds : [];
    });

    const [minimizingIds, setMinimizingIds] = useState([]);
    const [closingIds, setClosingIds] = useState([]);

    // fallback cascade cursor for programs with no home
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

    const openWindows = useMemo(() => {
        return Object.values(windows).filter((w) => w.isOpen);
    }, [windows]);

    const openWindow = useCallback((id) => {
        setWindows((prev) => {
            const w = prev[id];
            if (!w) return prev;

            const pos = computeSpawn({ home: w.home, size: w.size, spawnRef });

            return {
                ...prev,
                [id]: {
                    ...w,
                    isOpen: true,
                    state: 'window',
                    x: pos.x,
                    y: pos.y,
                },
            };
        });

        setStack((prev) => [...prev.filter((x) => x !== id), id]);
    }, []);

    const restoreWindow = useCallback((id) => {
        setWindows((prev) => {
            const w = prev[id];
            if (!w) return prev;

            const nextState =
                w.prevState === 'fullscreen' ? 'fullscreen' : 'window';

            return {
                ...prev,
                [id]: {
                    ...w,
                    isOpen: true,
                    state: nextState,
                    prevState: undefined,
                },
            };
        });

        setStack((prev) => [...prev.filter((x) => x !== id), id]);
    }, []);

    const openOrFocus = useCallback(
        (id) => {
            const w = windows[id];
            if (!w) return;

            if (w.isOpen && w.state === 'minimized') {
                restoreWindow(id);
                return;
            }

            if (!w.isOpen) {
                openWindow(id);
                return;
            }

            focusWindow(id);
        },
        [windows, restoreWindow, openWindow, focusWindow],
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
                        state: 'minimized',
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

            const nextState =
                w.state === 'fullscreen' ? 'window' : 'fullscreen';
            return { ...prev, [id]: { ...w, state: nextState, isOpen: true } };
        });

        setStack((prev) => [...prev.filter((x) => x !== id), id]);
    }, []);

    const closeWindow = useCallback((id) => {
        setClosingIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

        setTimeout(() => {
            setWindows((prev) => {
                const w = prev[id];
                if (!w) return prev;

                return {
                    ...prev,
                    [id]: { ...w, isOpen: false, state: 'minimized' },
                };
            });

            setStack((prev) => prev.filter((x) => x !== id));
            setClosingIds((prev) => prev.filter((x) => x !== id));
            setMinimizingIds((prev) => prev.filter((x) => x !== id));
        }, 120);
    }, []);

    const openUrlWindow = useCallback((url, title = 'Browser') => {
        const id =
            (globalThis.crypto?.randomUUID?.() &&
                `browser-${crypto.randomUUID()}`) ||
            `browser-${Date.now()}`;

        const size = WINDOW_SIZE?.lg ?? { w: 980, h: 640 };
        const pos = computeSpawn({ home: null, size, spawnRef });

        setWindows((prev) => ({
            ...prev,
            [id]: {
                id,
                type: 'browser',
                title,
                url,
                size,
                state: 'window',
                isOpen: true,
                x: pos.x,
                y: pos.y,
            },
        }));

        setStack((prev) => [...prev.filter((x) => x !== id), id]);
    }, []);

    const visibleWindows = useMemo(() => {
        return stack
            .map((id) => windows[id])
            .filter(Boolean)
            .filter((w) => w.isOpen && w.state !== 'minimized');
    }, [stack, windows]);

    const minimizedWindows = useMemo(() => {
        return Object.values(windows).filter(
            (w) => w.isOpen && w.state === 'minimized',
        );
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
