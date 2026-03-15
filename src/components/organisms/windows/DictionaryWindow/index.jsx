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
import { Button, Input } from '@atoms';
import { Form } from '@molecules';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
    grid-template-rows: auto auto 1fr auto;
    padding: 0;
    gap: 0.25rem;
`;

const TitleColumn = styled(Stack)`
    margin: 0.9rem 1rem 0.2rem;
`;

/* ----------------------------- */
/* FORM */
/* ----------------------------- */

const WindowForm = styled(Form)`
    grid-template-columns: 1fr auto;
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

// Searched word and pronunciation - sticky at top of scroll
const DefinitionItem = styled(Row)`
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.palette.grays[2]};
    border-bottom: 1px solid ${({ theme }) => theme.palette.grays[4]};
    display: flex;
    align-items: center;
    gap: 5rem;
    padding: 0 2rem 0.25rem;
`;

const Word = styled.span`
    font-weight: 600;
    font-size: 1.9rem;
    margin-right: 0.5rem;
    text-transform: capitalize;
`;

const PhoneticPronunciationContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.25rem;
    align-items: center;
`;

const Phonetic = styled.span`
    font-style: italic;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const Pronunciation = styled.audio``;

const PlayButton = styled(Button)``;

const PlayIcon = styled.img`
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
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette.primary[0]};
    text-transform: capitalize;
    background: ${({ theme }) => theme.palette.grays[4]};
    padding: 0.25rem 1rem;
    font-weight: 500;

    /* Remove default marker */
    list-style: none;

    &::-webkit-details-marker {
        display: none;
    }

    &::marker {
        display: none;
    }

    /* Custom marker */
    &::before {
        content: '▸';
        display: inline-block;
        margin-right: 0.5rem;
        transition: transform 0.2s ease;
    }

    /* When details is open */
    details[open] &::before {
        transform: rotate(90deg);
    }
`;

const DefinitionHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 2rem;
    background: ${({ theme }) => theme.palette.grays[3]};
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

const NoResults = styled.div`
    padding: 2rem;
    text-align: center;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const Loading = styled.div`
    padding: 2rem;
    text-align: center;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

/* ----------------------------- */
/* API CREDIT */
/* ----------------------------- */

const APIInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    background: ${({ theme }) => theme.palette.grays[3]};
`;

const APICredit = styled.a`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    text-decoration: none;
    margin: 0.5rem;
`;

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

    const { data, loading } = useFetch(url);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = searchTerm.trim();
        if (trimmed === '') return;

        setSubmittedTerm(trimmed);
    };

    const entry = data?.[0];
    const phoneticText = entry?.phonetics?.find((phonetic) => phonetic.text)?.text;
    const audioUrl = entry?.phonetics?.find((phonetic) => phonetic.audio)?.audio;

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.load();
        }
    }, [audioUrl]);

    const toggleAudio = async () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            try {
                await audioRef.current.play();
            } catch (err) {
                console.error('Failed to play audio:', err);
            }
        } else {
            audioRef.current.pause();
        }
    };

    return (
        <Shell>
            <TitleColumn>
                <Title>Dictionary</Title>
                <Subtitle>Look up word definitions and pronunciations.</Subtitle>
            </TitleColumn>
            <WindowForm onSubmit={handleSearch}>
                <Input
                    aria-label="Search dictionary"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SubmitButton type="submit">Search</SubmitButton>
            </WindowForm>
            {loading && <Loading>Loading...</Loading>}
            {!loading && !entry && submittedTerm && <NoResults>No results found.</NoResults>}
            {!loading && entry && (
                <DefinitionBody>
                    <DefinitionItem>
                        <Word>{entry.word}</Word>

                        {(phoneticText || audioUrl) && (
                            <PhoneticPronunciationContainer>
                                {phoneticText && <Phonetic>{phoneticText}</Phonetic>}

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
                                            <PlayIcon
                                                src="svg/audio.svg"
                                                alt="Play pronunciation"
                                            />
                                        </PlayButton>
                                    </>
                                )}
                            </PhoneticPronunciationContainer>
                        )}
                    </DefinitionItem>
                    <MeaningContainer>
                        {entry.meanings.map((meaning, index) => (
                            <Details key={index} name="dictionary-meanings">
                                <Summary>{meaning.partOfSpeech}</Summary>



                                <DefinitionHeader>
                                    <strong>Definitions:</strong>
                                </DefinitionHeader>
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

                                {meaning.synonyms &&
                                    meaning.synonyms.length > 0 && (
                                        <>
                                            <DefinitionHeader>
                                                <strong>Synonyms:</strong>
                                            </DefinitionHeader>
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
                            </Details>
                        ))}
                    </MeaningContainer>
                </DefinitionBody>
            )}
            <APIInfo>
                <APICredit
                    href="https://dictionaryapi.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by Free Dictionary API
                </APICredit>
            </APIInfo>
        </Shell>
    );
};

export default DictionaryWindow;
