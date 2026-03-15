import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { UNIT_CATEGORIES } from '@constants/unitConversions';
import { convert } from '@utils/convertUnits';
import { InsetSurface } from '@primitives';
import { Input } from '@atoms';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetSurface)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    border-radius: 12px;
    gap: 0.7rem;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const StyledInput = styled(Input)`
    width: 13rem;
    text-overflow: ellipsis;

    padding: 0.45rem 0.65rem;

    /* Remove spinner */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    appearance: textfield;
`;

const StyledLabel = styled.label`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    text-transform: capitalize;
`;

/* ----------------------------- */
/* HELPERS */
/* ----------------------------- */

const parseLooseNumber = (s) => {
    const v = String(s ?? '').trim();
    if (v === '' || v === '.' || v === '-' || v === '-.') return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
};

const formatPlain = (
    n,
    { maxFrac = 10, sciAt = 1e9, sciBelow = 1e-6 } = {},
) => {
    if (!Number.isFinite(n)) return '';
    const abs = Math.abs(n);
    if (abs !== 0 && (abs >= sciAt || abs < sciBelow))
        return n.toExponential(6);

    const s = n.toLocaleString(undefined, {
        useGrouping: false,
        maximumFractionDigits: maxFrac,
    });

    return s.includes('.') ? s.replace(/\.?0+$/, '') : s;
};

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

export default function UnitCard({ categoryKey }) {
    const category = useMemo(
        () => UNIT_CATEGORIES[categoryKey] ?? null,
        [categoryKey],
    );

    const unitKeys = useMemo(
        () => (category ? Object.keys(category.units) : []),
        [category],
    );

    const [activeUnit, setActiveUnit] = useState(category?.base ?? '');
    const [activeValue, setActiveValue] = useState('0');

    const values = useMemo(() => {
        if (!category) return Object.fromEntries(unitKeys.map((k) => [k, '']));

        const n = parseLooseNumber(activeValue);
        if (n === null) return Object.fromEntries(unitKeys.map((k) => [k, '']));

        const maxFrac = categoryKey === 'temperature' ? 2 : 10;

        return Object.fromEntries(
            unitKeys.map((toUnit) => {
                const out = convert(categoryKey, n, activeUnit, toUnit);
                return [toUnit, formatPlain(out, { maxFrac })];
            }),
        );
    }, [category, activeUnit, activeValue, unitKeys, categoryKey]);

    const handleChange = (unitKey) => (e) => {
        setActiveUnit(unitKey);
        setActiveValue(e.target.value);
    };

    if (!category) return null;

    return (
        <Shell>
            {unitKeys.map((unitKey) => (
                <InfoRow key={unitKey}>
                    <StyledLabel>{category.units[unitKey].label}:</StyledLabel>
                    <StyledInput
                        type="text"
                        inputMode="decimal"
                        value={
                            unitKey === activeUnit
                                ? activeValue
                                : values[unitKey]
                        }
                        onChange={handleChange(unitKey)}
                    />
                </InfoRow>
            ))}
        </Shell>
    );
}
