import { useEffect } from 'react';

import { Stack } from '@primitives';
import { PROGRAMS } from '@constants/programs';
import DesktopIcon from '@molecules/DesktopIcon';

const DESKTOP_ICONS = PROGRAMS.filter((p) => p.desktop).map(
    ({ id, iconSrc, title }) => ({ id, iconSrc, title }),
);

const DesktopIcons = ({ selectedId, setSelectedId, openWindow }) => {
    const windowsById = Object.fromEntries(PROGRAMS.map((w) => [w.id, w]));

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedId(null);

            if (e.key === 'Enter' && selectedId) {
                openWindow(selectedId);
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [selectedId, setSelectedId, openWindow]);

    return (
        <Stack
            style={{ position: 'absolute', left: '1rem', top: '4rem' }}
            onPointerDown={(e) => {
                e.stopPropagation();
            }}
        >
            {DESKTOP_ICONS.map((icon) => {
                const w = windowsById[icon.id];
                if (!w) return null;
                return (
                    <DesktopIcon
                        key={w.id}
                        label={w.title}
                        icon={`/images/icons/${w.iconSrc}`}
                        selected={selectedId === w.id}
                        onSelect={() => setSelectedId(w.id)}
                        onOpen={() => openWindow(w.id)}
                    />
                );
            })}
        </Stack>
    );
};

export default DesktopIcons;
