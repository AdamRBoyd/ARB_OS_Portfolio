import { useState } from 'react';
import UnitCard from '@molecules/UnitCard';
import styled from 'styled-components';
import { Stack, InsetWindowShell, Title, Subtitle } from '@primitives';
import { Select, Option } from '@atoms';

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
                <Select
                    value={categoryKey}
                    onChange={handleCategoryChange}
                >
                    <Option value="area">Area</Option>
                    <Option value="distance">Distance</Option>
                    <Option value="mass">Mass</Option>
                    <Option value="time">Time</Option>
                    <Option value="volume">Volume</Option>
                    <Option value="temperature">
                        Temperature
                    </Option>
                </Select>
            </SelectWrapper>
            <UnitCard key={categoryKey} categoryKey={categoryKey} />
        </Shell>
    );
};

export default UnitConverterWindow;
