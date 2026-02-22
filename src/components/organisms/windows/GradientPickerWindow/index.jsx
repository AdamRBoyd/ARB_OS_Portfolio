import { useState } from "react";
import styled from "styled-components";
import { InsetSurface, Stack, Row } from "@primitives";

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetSurface)`
    height: 100%;
    min-height: 0;
    min-width: 0;

    display: grid;
    grid-template-rows: auto 1fr auto auto auto;
    gap: 0.9rem;

    padding: 0.9rem;
    border-radius: 12px;

    overflow: hidden;
    box-sizing: border-box;
`;

const Title = styled.div`
    font-weight: 650;
    color: ${({ theme }) => theme.palette.primary[0]};
`;

const Subtitle = styled.div`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.palette.secondary[0]};
`;

const GradientPreview = styled(InsetSurface)`
    width: 100%;
    height: 100%;
    min-height: 140px;
`;

const ColorPickerRow = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 0.5rem;
    align-items: center;
    padding: 0 1rem;
`;

const ColorLabel = styled.label`
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    margin: 0 0.5rem;
`;

const ColorInput = styled.input`
    width: 100%;
    height: 2.5rem;
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    border-radius: 4px;
    background: ${({ theme }) => theme.palette.grays[0]};
    color: ${({ theme }) => theme.palette.grays[9]};
    font-size: 0.9rem;
`;

const DegreeRow = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.75rem;
    padding: 0 2rem;
`;

const DegreeLabel = styled.label`
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    margin: 0 .5rem 0 0;
`;

const DegreeInput = styled.input`
  width: 100%;
  background: transparent; /* important */

  /* -------------------- */
  /* WebKit (Chrome, Edge, Safari) */
  /* -------------------- */

  &::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.grays[4]};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;

    margin-top: -5px; /* centers thumb on track */

    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: none;

    background: ${({ theme }) => theme.palette.accent[0]};
    cursor: pointer;
  }

  /* -------------------- */
  /* Firefox */
  /* -------------------- */

  &::-moz-range-track {
    height: 6px;
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.grays[4]};
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: none;

    background: ${({ theme }) => theme.palette.accent[0]};
    cursor: pointer;
  }

  /* remove ugly focus outline in Firefox */
  &::-moz-focus-outer {
    border: 0;
  }
`;

const GradientResult = styled(InsetSurface)`
    padding: 0.5rem .5rem 0.5rem 1.5rem;
    margin: 0 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    background: ${({ theme }) => theme.palette.grays[2]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    font-size: 0.9rem;
    font-family: monospace;
`;

const CopyButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};

    cursor: pointer;
    display: grid;
    place-items: center;
    font-weight: 800;
    line-height: 1;

    transition: background 120ms ease-out, transform 90ms ease-out;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[5]};
    }

    &:active {
        transform: translateY(1px);
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
        outline-offset: 2px;
    }
`;

const ButtonIcon = styled.img`
    width: 16px;
    height: 16px;
`;

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const GradientPickerWindow = () => {
    const [color1, setColor1] = useState("#3d65e7");
    const [color2, setColor2] = useState("#269256");
    const [degree, setDegree] = useState(45);
    const gradientCss = `linear-gradient(${degree}deg, ${color1}, ${color2})`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(gradientCss);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <Shell>
            <Stack $gap="0.2rem">
                <Title>Gradient Picker</Title>
                <Subtitle>Select colors and customize your gradients.</Subtitle>
            </Stack>
            <GradientPreview style={{ background: gradientCss }} />
            <ColorPickerRow>
                <ColorInput 
                type="color" 
                value={color1} 
                onChange={(e) => setColor1(e.target.value)} 
                title="Color 1" />
                <ColorLabel>Color Selection</ColorLabel>
                <ColorInput 
                type="color" 
                value={color2} 
                onChange={(e) => setColor2(e.target.value)} 
                title="Color 2" />
            </ColorPickerRow>
            <DegreeRow>
                <DegreeLabel>Degree</DegreeLabel>
                <DegreeInput 
                type="range" 
                min="0" 
                max="180" 
                value={degree} 
                onChange={(e) => setDegree(Number(e.target.value))} 
                title="Fade degree"/>
            </DegreeRow>
            <GradientResult>
                {gradientCss}
                <CopyButton onClick={copyToClipboard}>
                    <ButtonIcon src="/svg/copy.svg" alt="Copy to clipboard" title="Copy to clipboard" />
                </CopyButton>
            </GradientResult>
        </Shell>
    );
};

export default GradientPickerWindow;
