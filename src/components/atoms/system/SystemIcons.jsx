/* ----------------------------- */
/* GENERIC WRAPPER */
/* ----------------------------- */

export const SystemIcon = ({ children, title }) => (
    <span
        title={title}
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            lineHeight: 0,
        }}
        aria-hidden="true"
    >
        {children}
    </span>
);

/* ----------------------------- */
/* WIFI */
/* ----------------------------- */

export const WifiIcon = ({ level = 4 }) => {
    const on = (n) => (n <= level ? 1 : 0.18);

    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        >
            {/* OUTER (strongest) */}
            <path d="M2 8.5c5.5-5 14.5-5 20 0" opacity={on(4)} />

            {/* MID */}
            <path d="M5 12c4-3.7 10-3.7 14 0" opacity={on(3)} />

            {/* INNER */}
            <path d="M8.5 15.5c2.2-2 4.8-2 7 0" opacity={on(2)} />

            {/* DOT (weakest) */}
            <circle
                cx="12"
                cy="19"
                r="1.2"
                fill="currentColor"
                stroke="none"
                opacity={on(1)}
            />
        </svg>
    );
};

/* ----------------------------- */
/* BATTERY */
/* ----------------------------- */

export const BatteryIcon = ({ level = 80, charging = false }) => {
    const pct = Math.max(0, Math.min(100, level));
    const w = Math.round((pct / 100) * 14);

    return (
        <svg
            width="22"
            height="18"
            viewBox="0 0 26 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
        >
            <rect x="1" y="3" width="20" height="12" rx="2" />
            <path d="M23 7v4" />
            <rect
                x="3"
                y="5"
                width={w}
                height="8"
                rx="1"
                fill="currentColor"
                stroke="none"
                opacity="0.35"
            />
            {charging && (
                <path
                    d="M12 5l-3 5h3l-1 3 4-6h-3l1-2z"
                    fill="currentColor"
                    stroke="none"
                    opacity="0.9"
                />
            )}
        </svg>
    );
};

/* ----------------------------- */
/* VOLUME */
/* ----------------------------- */

export const VolumeIcon = ({ muted = false }) =>
    muted ? (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M11 5 6 9H3v6h3l5 4V5z" />
            <path d="M16 9l5 6" />
            <path d="M21 9l-5 6" />
        </svg>
    ) : (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            <path d="M11 5 6 9H3v6h3l5 4V5z" />
            <path d="M16 9a4 4 0 0 1 0 6" />
            <path d="M18.5 6.5a7 7 0 0 1 0 11" />
        </svg>
    );
