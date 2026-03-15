import { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
    InsetSurface,
    Stack,
    Row,
    InsetWindowShell,
    Title,
    Subtitle,
} from '@primitives';
import { Button, Input } from '@atoms';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)``;

const Form = styled.form`
    min-height: 0;
    display: grid;
    grid-template-rows: auto auto auto 1fr auto;
    gap: 0.9rem;
`;

const Field = styled.div`
    display: grid;
    gap: 0.35rem;
`;

const Label = styled.label`
    font-size: 0.82rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const FormInput = styled(Input)`
    padding: 0.55rem 0.65rem;

    /* Remove spinner */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    appearance: textfield;
`;

const ResetButton = styled(Button)``;

const Chips = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.45rem;
    flex-wrap: wrap;
`;

const Chip = styled(Button)`
    padding: 0.35rem 1rem;
    font-size: 0.82rem;
`;

const SplitRow = styled(Row)`
    justify-content: space-between;
    align-items: center;
    gap: 0.6rem;
`;

const Stepper = styled(Row)`
    gap: 0.45rem;
    align-items: center;
`;

const StepBtn = styled(Button)`
    width: 30px;
    height: 25px;

    font-weight: 800;
    line-height: 1;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[5]};
    }
`;

const SplitBadge = styled(FormInput)`
    min-width: 44px;
    max-width: 80px;
    text-align: center;

    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};

    border-radius: 10px;
    padding: 0.5rem 0.5rem;
    font-weight: 650;
`;

const Results = styled(InsetSurface)`
    padding: 0.85rem;
    border-radius: 12px;

    background: ${({ theme }) => theme.palette.grays[2]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};

    display: grid;
    gap: 0.55rem;
    align-content: start;
`;

const ResultRow = styled(Row)`
    justify-content: space-between;
    align-items: baseline;
`;

const ResultLabel = styled.div`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.palette.secondary[0]};
`;

const ResultValue = styled.div`
    font-size: 1.05rem;
    font-weight: 650;
    color: ${({ theme }) => theme.palette.primary[0]};
`;

const Hint = styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const Divider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.palette.grays[4]};
    opacity: 0.9;
    margin: 0.15rem 0;
`;

/* ----------------------------- */
/* HELPERS */
/* ----------------------------- */

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const toMoney = (n) => {
    if (!Number.isFinite(n)) return '0.00';
    return n.toFixed(2);
};

const safeFloat = (s) => {
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : null;
};

const safeInt = (s) => {
    const n = parseInt(s, 10);
    return Number.isFinite(n) ? n : null;
};

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const TipCalculatorWindow = () => {
    const QUICK_TIPS = [15, 18, 20];

    const [billAmount, setBillAmount] = useState('');
    const [tipPercentage, setTipPercentage] = useState('');
    const [split, setSplit] = useState('1');

    const bill = useMemo(() => safeFloat(billAmount), [billAmount]);
    const tipPct = useMemo(() => safeFloat(tipPercentage), [tipPercentage]);

    const people = useMemo(() => {
        const n = safeInt(split);
        return clamp(n ?? 1, 1, 100);
    }, [split]);

    const canCalculate = bill !== null && tipPct !== null;

    const computed = useMemo(() => {
        if (!canCalculate) return null;

        const tip = (bill * tipPct) / 100;
        const total = bill + tip;
        const perPerson = total / people;

        return { tip, total, perPerson };
    }, [bill, tipPct, people, canCalculate]);

    const onSubmit = (e) => {
        e.preventDefault();
        // derived results update automatically
    };

    const reset = () => {
        setBillAmount('');
        setTipPercentage('');
        setSplit('1');
    };

    const bumpSplit = (delta) => {
        setSplit((prev) => {
            const n = safeInt(prev) ?? 1;
            return String(clamp(n + delta, 1, 100));
        });
    };

    return (
        <Shell>
            <Stack $gap="0.2rem">
                <Title>Tip Calculator</Title>
                <Subtitle>Estimate tip, total, and per-person split.</Subtitle>
            </Stack>

            <Form onSubmit={onSubmit}>
                <Field>
                    <Label htmlFor="bill">Bill Amount</Label>
                    <FormInput
                        id="bill"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        placeholder="e.g. 42.50"
                        value={billAmount}
                        onChange={(e) => setBillAmount(e.target.value)}
                    />
                </Field>

                <Field>
                    <Row
                        $gap="0.6rem"
                        style={{ justifyContent: 'space-between' }}
                    >
                        <Label htmlFor="tip">Tip Percentage</Label>
                        <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>
                            Quick tips:
                        </span>
                    </Row>

                    <Chips aria-label="Quick tip percentages">
                        {QUICK_TIPS.map((p) => (
                            <Chip
                                key={p}
                                type="button"
                                variant="secondary"
                                $active={String(p) === String(tipPercentage)}
                                onClick={() => setTipPercentage(String(p))}
                                title={`Set tip to ${p}%`}
                            >
                                {p}%
                            </Chip>
                        ))}
                    </Chips>

                    <Input
                        id="tip"
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.5"
                        placeholder="e.g. 20"
                        value={tipPercentage}
                        onChange={(e) => setTipPercentage(e.target.value)}
                    />
                </Field>

                <Field>
                    <SplitRow>
                        <Label htmlFor="split" style={{ margin: 0 }}>
                            Split
                        </Label>

                        <Stepper aria-label="Split stepper">
                            <StepBtn
                                type="button"
                                onClick={() => bumpSplit(-1)}
                                title="Decrease split"
                                variant="icon"
                            >
                                –
                            </StepBtn>
                            <SplitBadge
                                id="split"
                                type="number"
                                inputMode="numeric"
                                min="1"
                                step="1"
                                placeholder="1"
                                value={split}
                                onChange={(e) => setSplit(e.target.value)}
                            />
                            <StepBtn
                                type="button"
                                onClick={() => bumpSplit(1)}
                                title="Increase split"
                                variant="icon"
                            >
                                +
                            </StepBtn>
                        </Stepper>
                    </SplitRow>
                </Field>

                <Results>
                    {!computed ? (
                        <Hint>Enter bill + tip percentage to see results.</Hint>
                    ) : (
                        <>
                            <ResultRow>
                                <ResultLabel>Tip</ResultLabel>
                                <ResultValue>
                                    ${toMoney(computed.tip)}
                                </ResultValue>
                            </ResultRow>

                            <ResultRow>
                                <ResultLabel>Total</ResultLabel>
                                <ResultValue>
                                    ${toMoney(computed.total)}
                                </ResultValue>
                            </ResultRow>

                            <Divider />

                            <ResultRow>
                                <ResultLabel>
                                    Per person{' '}
                                    <span style={{ opacity: 0.8 }}>
                                        ({people})
                                    </span>
                                </ResultLabel>
                                <ResultValue>
                                    ${toMoney(computed.perPerson)}
                                </ResultValue>
                            </ResultRow>
                        </>
                    )}
                </Results>

                <ResetButton
                    type="button"
                    onClick={reset}
                    title="Reset fields"
                    variant="secondary"
                >
                    Reset
                </ResetButton>
            </Form>
        </Shell>
    );
};

export default TipCalculatorWindow;
