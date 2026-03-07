import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import useFetch from '@state/useFetch';
import {
    InsetSurface,
    Stack,
    Row,
    InsetWindowShell,
    Title,
    Subtitle,
} from '@primitives';
import { Button } from '@atoms';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
    grid-template-rows: auto auto 1fr;
    padding: 0;
`;

const TitleColumn = styled(Stack)`
    margin: 0.9rem 1rem 0.2rem;
`;

/* ----------------------------- */
/* FORM */
/* ----------------------------- */

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    padding: 0.75rem 1rem;

    background: ${({ theme }) => theme.palette.grays[3]};
`;

const FormInput = styled.input`
    width: 100%;
    box-sizing: border-box;

    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};

    border-radius: 12px;
    padding: 0.55rem 0.65rem;
    outline: none;

    &:focus {
        border-color: ${({ theme }) => theme.palette.accent[0]};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.accent[0]}22;
    }

    &::placeholder {
        color: ${({ theme }) => theme.palette.tertiary[0]};
        opacity: 0.7;
    }
`;

const SubmitButton = styled(Button)`
    padding: 0.55rem 5rem;
`;

/* ----------------------------- */
/* LIST */
/* ----------------------------- */

const DefinitionBody = styled(InsetSurface)`
    height: 100%;
    min-height: 0;

    display: grid;
    grid-template-rows: auto 1fr;
    overflow: hidden;

    background: ${({ theme }) => theme.palette.grays[2]};
    border: none;

    box-sizing: border-box;
`;

// Serched word and pronunciation - sticky at top of scroll
const DefinitionItem = styled(Row)`
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.palette.grays[2]};
    border-bottom: 1px solid ${({ theme }) => theme.palette.grays[4]};
`;

const Word = styled.span`
    font-weight: 600;
    font-size: 2rem;
    margin-right: 0.5rem;
    text-transform: capitalize;
`;

const Phonetic = styled.span`
    font-style: italic;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const Pronunciation = styled.audio``;

const PlayButton = styled(Button)``;

const PLayIcon = styled.img`
    width: 16px;
    height: 16px;
`;

// Container for meanings - scrollable
const MeaningContainer = styled(Stack)`
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 0.5rem;

    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.palette.grays[6]} transparent;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.palette.grays[6]};
        border-radius: 999px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.palette.grays[7]};
    }
`;

const Details = styled.details`
    margin-top: 0.25rem;
`;

const Summary = styled.summary`
    cursor: pointer;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.accent[0]};
`;

const DefinitionText = styled.p`
    margin-left: 1.5rem;
    margin-top: 0.25rem;
`;

const DefinitionList = styled.ol`
    margin-left: 1.5rem;
    margin-top: 0.25rem;
`;

const DefinitionItemText = styled.li`
    margin-top: 0.25rem;
`;

const SynonymList = styled.ul`
    margin-left: 1.5rem;
    margin-top: 0.25rem;
    list-style-type: disc;
`;

const SynonymItem = styled.li``;

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const DictionaryWindow = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [submittedTerm, setSubmittedTerm] = useState('');
    const audioRef = useRef(null);

    const url = submittedTerm
        ? `https://api.dictionaryapi.dev/api/v2/entries/en/${submittedTerm}`
        : null;

    const { data, error, loading } = useFetch(url);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = searchTerm.trim();
        if (trimmed === '') return;

        setSubmittedTerm(trimmed);
    };

    const entry = data?.[0];

    const audioUrl = entry?.phonetics?.find(
        (phonetic) => phonetic.audio,
    )?.audio;

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
        }
    }, [audioUrl]);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <Shell>
            <TitleColumn>
                <Title>Dictionary</Title>
                <Subtitle>Mini App</Subtitle>
            </TitleColumn>
            <Form onSubmit={handleSearch}>
                <FormInput
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SubmitButton type="submit">Search</SubmitButton>
            </Form>
            {!loading && data && (
                <DefinitionBody>
                    <DefinitionItem>
                        <Word>{entry.word}</Word>

                        {entry.phonetics && entry.phonetics.length > 0 && (
                            <>
                                <Phonetic>{entry.phonetics[0].text}</Phonetic>

                                {audioUrl && (
                                    <>
                                        <Pronunciation
                                            ref={audioRef}
                                            src={audioUrl}
                                        />
                                        <PlayButton
                                            type="button"
                                            onClick={toggleAudio}
                                            variant="icon"
                                        >
                                            <PLayIcon
                                                src="svg/audio.svg"
                                                alt="Play"
                                            />
                                        </PlayButton>
                                    </>
                                )}
                            </>
                        )}
                    </DefinitionItem>
                    <MeaningContainer>
                        {entry.meanings.map((meaning, index) => (
                            <Details key={index} name="partOfSpeech">
                                <Summary>{meaning.partOfSpeech}</Summary>

                                {meaning.synonyms &&
                                    meaning.synonyms.length > 0 && (
                                        <>
                                            <DefinitionText>
                                                <strong>Synonyms:</strong>
                                            </DefinitionText>
                                            <SynonymList>
                                                {meaning.synonyms.map(
                                                    (synonym, synIndex) => (
                                                        <SynonymItem
                                                            key={synIndex}
                                                        >
                                                            {synonym}
                                                        </SynonymItem>
                                                    ),
                                                )}
                                            </SynonymList>
                                        </>
                                    )}

                                <DefinitionList>
                                    {meaning.definitions.map(
                                        (def, defIndex) => (
                                            <DefinitionItemText key={defIndex}>
                                                {def.definition}
                                                {def.example && (
                                                    <em> - "{def.example}"</em>
                                                )}

                                                {def.synonyms &&
                                                    def.synonyms.length > 0 && (
                                                        <SynonymList>
                                                            {def.synonyms.map(
                                                                (
                                                                    synonym,
                                                                    synIndex,
                                                                ) => (
                                                                    <SynonymItem
                                                                        key={
                                                                            synIndex
                                                                        }
                                                                    >
                                                                        {
                                                                            synonym
                                                                        }
                                                                    </SynonymItem>
                                                                ),
                                                            )}
                                                        </SynonymList>
                                                    )}
                                            </DefinitionItemText>
                                        ),
                                    )}
                                </DefinitionList>
                            </Details>
                        ))}
                    </MeaningContainer>
                </DefinitionBody>
            )}
        </Shell>
    );
};

export default DictionaryWindow;
