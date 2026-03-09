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
    gap: 0.25rem;
`;

const MainBody = styled(InsetSurface)`
    width: 100%;
    height: 100%;
    min-height: 0;
    display: grid;
    grid-template-columns: 1fr 3fr;
    border: none;
    overflow: hidden;
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
    margin-top: 0.25rem;

    background: ${({ theme }) => theme.palette.grays[3]};

`;

const FormInput = styled.input`
    width: 100%;
    box-sizing: border-box;

    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};

    border-radius: 12px;
    padding: 0.55rem 1.2rem;
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
/* SEARCH RESULTS */
/* ----------------------------- */

const ResultsContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${({ theme }) => theme.palette.grays[4]};
    box-sizing: border-box;
    
    height: 100%;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;

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

const ResultItem = styled.button`
    width: 100%;
    text-align: left;
    background: transparent;
    border: 0;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grays[4]};
    color: ${({ theme }) => theme.palette.primary[0]};
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[3]};
    }
`;

const ResultThumbnail = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 0.5rem;
`;

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
/* RECIPE DETAILS */
/* ----------------------------- */

const RecipeContainer = styled.div`
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    min-height: 0;
    min-width: 0;
    overflow: hidden;
    padding: 1rem;
    color: ${({ theme }) => theme.palette.primary[0]};
`;

const RecipeTitle = styled.h2`
    margin: 0;
    margin-bottom: 0.5rem;
`;

const RecipeContent = styled.div`
    min-height: 0;
    min-width: 0;
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 0;

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

const ImageIngredientContainer = styled.div`
    display: grid;
    grid-template-columns: 360px minmax(0, 1fr);
    gap: 2rem;
    box-sizing: border-box;
    align-items: start;
    min-width: 0;
    padding: 1rem;
`;

const RecipeThumbnail = styled.img`
    width: 360px;
    height: auto;
    object-fit: cover;
    display: block;
`;

const RecipeInstructions = styled.p`
    white-space: pre-wrap;
    padding: 1rem;
`;

const IngredientsList = styled.ul`
    font-size: 0.7rem;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const IngredientItem = styled.li`
    margin-bottom: 0.25rem;
`;

const YouTubeButton = styled(Button)`
    width: fit-content;
    padding: 0.5rem 2rem;
    margin: 0 2rem 1rem;

    border: 1px solid ${({ theme }) => theme.palette.grays[6]};
`;

const YouTubeText = styled.span`
    color: ${({ theme }) => theme.palette.alert[0]};
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

const RecipebookWindow = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [submittedTerm, setSubmittedTerm] = useState('');
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const recipeContentRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = searchTerm.trim();
        if (trimmed === '') return;

        setSubmittedTerm(trimmed);
    };

    const url = submittedTerm
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${submittedTerm}`
        : null;

    const { data, loading } = useFetch(url);
    const recipes = data?.meals || [];

    useEffect(() => {
        if (recipeContentRef.current) {
            recipeContentRef.current.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    }, [selectedRecipe]);

    return (
        <Shell>
            <TitleColumn>
                <Title>Recipe Book</Title>
                <Subtitle>Coming Soon!</Subtitle>
            </TitleColumn>
            <Form onSubmit={handleSearch}>
                <FormInput
                    aria-label="Search recipes"
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SubmitButton type="submit">Search</SubmitButton>
            </Form>
            <MainBody>
                <ResultsContainer>
                    {loading && <Loading>Loading...</Loading>}
                    {!loading && recipes.length === 0 && submittedTerm && (
                        <NoResults>No results found.</NoResults>
                    )}
                    {!loading && recipes.length > 0 && (
                        recipes.map((recipe) => (
                            <ResultItem key={recipe.idMeal} onClick={() => setSelectedRecipe(recipe)}>
                                {recipe.strMeal}
                                {recipe.strMealThumb && <ResultThumbnail src={recipe.strMealThumb} alt={recipe.strMeal} />}
                            </ResultItem>
                        ))
                    )}
                </ResultsContainer>
                <RecipeContainer>
                    {selectedRecipe && (
                        <>
                            <RecipeTitle>{selectedRecipe.strMeal}</RecipeTitle>

                            <RecipeContent ref={recipeContentRef}>
                                <ImageIngredientContainer>
                                    <RecipeThumbnail
                                        src={selectedRecipe.strMealThumb}
                                        alt={selectedRecipe.strMeal}
                                    />

                                    <IngredientsList>
                                        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                                            const ingredient = selectedRecipe[`strIngredient${num}`];
                                            const measure = selectedRecipe[`strMeasure${num}`];

                                            if (ingredient && ingredient.trim() !== '') {
                                                return (
                                                    <IngredientItem key={num}>
                                                        {measure} {ingredient}
                                                    </IngredientItem>
                                                );
                                            }

                                            return null;
                                        })}
                                    </IngredientsList>

                                </ImageIngredientContainer>
                                <RecipeInstructions>
                                    {selectedRecipe.strInstructions}
                                </RecipeInstructions>
                                {selectedRecipe.strYoutube && (
                                    <YouTubeButton
                                        onClick={() => window.open(selectedRecipe.strYoutube, '_blank', 'noopener,noreferrer')}
                                        variant="primary"
                                    >
                                        Watch on <YouTubeText>YouTube</YouTubeText>
                                    </YouTubeButton>
                                )}
                            </RecipeContent>
                        </>
                    )}
                </RecipeContainer>
            </MainBody>
            <APIInfo>
                <APICredit
                    href="https://www.themealdb.com/api.php"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TheMealDB API
                </APICredit>
            </APIInfo>
        </Shell>
    );
};

export default RecipebookWindow;