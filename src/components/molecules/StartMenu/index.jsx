import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { PROGRAMS } from '@constants/programs';
import { Input } from '@atoms';

const Panel = styled.div`
    position: absolute;
    left: 0.5rem;
    bottom: 62px;
    width: 340px;
    max-height: min(600px, calc(100vh - 120px));
    overflow: hidden;

    background: ${({ theme }) => theme.palette.grays[1]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    border-radius: 14px;

    box-shadow: 0 18px 44px ${({ theme }) => theme.palette.shadow[5]};
    z-index: 1600;

    animation: fadeIn 120ms ease-out;

    display: flex;
    flex-direction: column;

    overflow: hidden;
`;

const Top = styled.div`
    padding: 0.75rem 0.8rem;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.shadow[2]};
`;

const Scroller = styled.div`
    padding: 0.35rem 0.8rem 0.85rem;
    overflow-y: auto;
    overflow-x: hidden;

    flex: 1 1 auto;

    -webkit-overflow-scrolling: touch;

    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.palette.grays[6]} transparent;

    &::-webkit-scrollbar {
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.palette.grays[6]};
        border-radius: 999px;
        border: 2px solid transparent;
        background-clip: content-box;
    }
`;

const Search = styled(Input)`
    max-width: 100%;

    background: ${({ theme }) => theme.palette.shadow[3]};
    padding: 0.55rem 0.65rem;
`;

const Group = styled.div`
    margin-top: 0.85rem;
`;

const GroupTitle = styled.div`
    font-size: 0.88rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0.2rem 0 0.4rem;
`;

const SubGroupTitle = styled.div`
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
    font-size: 0.75rem;
    letter-spacing: 0.02em;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    opacity: 0.9;
`;

const Item = styled.button`
    width: 100%;
    border: 1px solid transparent;
    background: transparent;
    color: ${({ theme }) => theme.palette.primary[0]};
    border-radius: 12px;
    padding: 0.55rem 0.6rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.6rem;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[5]};
    }

    &:active {
        transform: translateY(1px);
    }
`;

const Icon = styled.img`
    width: 26px;
    display: grid;
    place-items: center;
    font-size: 1.05rem;
`;

const Label = styled.div`
    font-size: 0.9rem;
    font-weight: 500;
`;

const Footer = styled.div`
    border-top: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.shadow[3]};
    padding: 0.5rem 0.6rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
`;

const PowerButton = styled.button`
    width: 34px;
    height: 34px;
    border-radius: 999px;

    border: 1px solid transparent;
    background: transparent;
    color: ${({ theme }) => theme.palette.primary[0]};

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    transition:
        background 120ms ease-out,
        transform 90ms ease-out;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[3]};
    }

    &:active {
        transform: translateY(1px);
    }
`;

const PowerIcon = styled.img`
    width: 34px;
    height: 34px;
`;

export default function StartMenu({ onClose, onLaunch, onPowerOff }) {
    const ref = useRef(null);
    const [q, setQ] = useState('');

    useEffect(() => {
        const onPointerDown = (e) => {
            if (ref.current && !ref.current.contains(e.target)) onClose?.();
        };
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose?.();
        };

        document.addEventListener('pointerdown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('pointerdown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onClose]);

    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return PROGRAMS;
        return PROGRAMS.filter((p) => p.title.toLowerCase().includes(term));
    }, [q]);

    const grouped = useMemo(() => {
        const groups = new Map();

        filtered.forEach((p) => {
            const group = p.group || 'Programs';
            const subgroup = p.subgroup || 'General';

            if (!groups.has(group)) groups.set(group, new Map());
            const subMap = groups.get(group);

            if (!subMap.has(subgroup)) subMap.set(subgroup, []);
            subMap.get(subgroup).push(p);
        });

        return Array.from(groups.entries()).map(([groupName, subMap]) => [
            groupName,
            Array.from(subMap.entries()),
        ]);
    }, [filtered]);

    return (
        <Panel ref={ref} onPointerDown={(e) => e.stopPropagation()}>
            <Top>
                <Search
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search programs…"
                    aria-label="Search programs"
                    autoFocus
                />
            </Top>
            <Scroller>
                {grouped.map(([group, subgroups]) => (
                    <Group key={group}>
                        <GroupTitle>{group}</GroupTitle>

                        {subgroups.map(([subgroup, items]) => (
                            <div key={`${group}:${subgroup}`}>
                                {subgroup !== 'General' && (
                                    <SubGroupTitle>{subgroup}</SubGroupTitle>
                                )}

                                {items.map((p) => (
                                    <Item
                                        key={p.id}
                                        onClick={() => {
                                            onLaunch?.(p.id);
                                            onClose?.();
                                        }}
                                        title={`Open ${p.title}`}
                                    >
                                        <Icon
                                            src={`/images/icons/${p.iconSrc}`}
                                            alt={`${p.title} icon`}
                                        />
                                        <Label>{p.title}</Label>
                                    </Item>
                                ))}
                            </div>
                        ))}
                    </Group>
                ))}
            </Scroller>
            <Footer>
                Shutdown
                <PowerButton
                    onClick={() => {
                        onPowerOff?.();
                        onClose?.();
                    }}
                    title="Shutdown"
                    aria-label="Shutdown"
                >
                    <PowerIcon src="/images/icons/Power.png" alt="Power icon" />
                </PowerButton>
            </Footer>
        </Panel>
    );
}
