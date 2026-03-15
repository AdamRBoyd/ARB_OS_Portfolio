import { useEffect, useMemo, useRef, useState } from 'react';
import {
    SystemBar as Bar,
    SystemIdentity,
    SystemTitle,
    SystemRight,
    SystemPill,
} from '@primitives';

import useFakeSystemStatus from '@state/useFakeSystemStatus';
import {
    WifiIcon,
    BatteryIcon,
    VolumeIcon,
} from '@atoms/system/SystemIcons';
import CalendarPopover from '../../atoms/system/CalendarPopover';
import { Divider } from '@atoms';

const formatTime = (d) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const Cluster = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
};

const Clickable = ({ onClick, title, children }) => (
    <span
        onClick={onClick}
        title={title}
        style={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
        }}
    >
        {children}
    </span>
);

const TopSystemBar = ({
    name = 'Adam Boyd',
    subtitle = 'Frontend / React',
    activeTitle = 'Desktop',
}) => {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000 * 10); // update every 10s
        return () => clearInterval(id);
    }, []);

    const timeText = useMemo(() => formatTime(now), [now]);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const calendarRef = useRef(null);

    useEffect(() => {
        if (!calendarOpen) return;

        const onPointerDown = (e) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.target)
            ) {
                setCalendarOpen(false);
            }
        };

        const onKeyDown = (e) => {
            if (e.key === 'Escape' && calendarOpen) {
                e.stopPropagation();
                setCalendarOpen(false);
            }
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [calendarOpen]);

    const { status, toggleMute, toggleCharging, cycleWifi } =
        useFakeSystemStatus();
    const wifiLevel = clamp(status?.wifi?.level ?? 4, 1, 4);
    const battLevel = clamp(status?.power?.level ?? 85, 0, 100);
    const charging = Boolean(status?.power?.charging);
    const muted = Boolean(status?.sound?.muted);

    return (
        <Bar>
            {/* LEFT */}
            <SystemIdentity>
                <span>{name}</span>
                <SystemTitle>{subtitle}</SystemTitle>
            </SystemIdentity>

            {/* CENTER */}
            <SystemTitle title="Active window">
                <span
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 320,
                        display: 'inline-block',
                        verticalAlign: 'middle',
                    }}
                >
                    {activeTitle || 'Desktop'}
                </span>
            </SystemTitle>

            {/* RIGHT */}
            <SystemRight>
                <SystemPill>
                    <div style={Cluster}>
                        <Clickable
                            onClick={cycleWifi}
                            title={`Wi-Fi (fake): ${wifiLevel}/4`}
                        >
                            <WifiIcon level={wifiLevel} />
                        </Clickable>
                        <Divider height="1.2rem" />
                        <Clickable
                            onClick={toggleCharging}
                            title={`Power (fake): ${battLevel}%`}
                        >
                            <BatteryIcon
                                level={battLevel}
                                charging={charging}
                            />
                            <span style={{ marginLeft: 4 }}>{battLevel}%</span>
                        </Clickable>
                        <Divider height="1.2rem" />
                        <Clickable
                            onClick={toggleMute}
                            title={muted ? 'Muted' : 'Sound On'}
                        >
                            <VolumeIcon muted={muted} />
                        </Clickable>
                        <Divider height="1.2rem" />
                        <span
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={() => {
                                setCalendarOpen((v) => !v);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            {timeText}
                            {calendarOpen && (
                                <div ref={calendarRef}>
                                    <CalendarPopover
                                        onClose={() => setCalendarOpen(false)}
                                    />
                                </div>
                            )}
                        </span>
                    </div>
                </SystemPill>
            </SystemRight>
        </Bar>
    );
};

export default TopSystemBar;
