import { useState } from 'react';
import UnitCard from '@molecules/UnitCard';
import styled from 'styled-components';
import { Stack, InsetWindowShell, Title, Subtitle } from '@primitives';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
    grid-template-rows: auto auto 1fr;
`;

const SelectWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const CategorySelect = styled.select`
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-color: ${({ theme }) => theme.palette.grays[2]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    border-radius: 8px;

    color: ${({ theme }) => theme.palette.primary[0]};
    padding: 0.4rem 2rem 0.4rem 0.75rem;

    font-size: 0.9rem;
    cursor: pointer;

    outline: none;

    /* custom arrow */
    background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M5 7l5 5 5-5z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 0.6rem center;
    background-size: 16px;

    &:focus {
        border-color: ${({ theme }) => theme.palette.accent[0]};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.accent[0]}33;
    }
`;

const CategoryOption = styled.option`
    background-color: ${({ theme }) => theme.palette.background[0]};
    color: ${({ theme }) => theme.palette.primary[0]};
`;

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const UnitConverterWindow = () => {
    const [categoryKey, setCategoryKey] = useState('area');

    const handleCategoryChange = (e) => {
        setCategoryKey(e.target.value);
    };

    return (
        <Shell>
            <Stack>
                <Title>Unit Converter</Title>
                <Subtitle>Select a category:</Subtitle>
            </Stack>
            <SelectWrapper>
                <CategorySelect
                    value={categoryKey}
                    onChange={handleCategoryChange}
                >
                    <CategoryOption value="area">Area</CategoryOption>
                    <CategoryOption value="distance">Distance</CategoryOption>
                    <CategoryOption value="mass">Mass</CategoryOption>
                    <CategoryOption value="time">Time</CategoryOption>
                    <CategoryOption value="volume">Volume</CategoryOption>
                    <CategoryOption value="temperature">
                        Temperature
                    </CategoryOption>
                </CategorySelect>
            </SelectWrapper>
            <UnitCard key={categoryKey} categoryKey={categoryKey} />
        </Shell>
    );
};

export default UnitConverterWindow;
