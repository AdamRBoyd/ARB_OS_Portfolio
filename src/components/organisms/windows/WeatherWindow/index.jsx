import styled from 'styled-components';
import { useEffect, useState } from 'react';
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
import apiKeys from '@/apiKeys.json';

const STORAGE_KEY = 'weatherAppData';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
    grid-template-rows: auto auto 1fr;
    padding: 0;
    gap: 0.25rem;
`;

const TitleColumn = styled(Stack)`
    margin: 0.9rem 1rem 0.2rem;
`;

const BodyContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;

    height: 100%;
    min-height: 0;
`;

/* ----------------------------- */
/* Form */
/* ----------------------------- */

const ListFormContainer = styled(InsetSurface)`
    min-height: 0;
    min-width: 0;
    overflow: hidden;
`;

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr auto auto;
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

const UseLocalDataButton = styled(Button)`
    padding: 0.55rem 1.2rem;
    font-size: 0.9rem;
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

const WeatherWindow = () => {
    const [searchLocation, setSearchLocation] = useState(() => {
        return sessionStorage.getItem(`${STORAGE_KEY}-searchLocation`) || '';
    });

    const [submittedLocation, setSubmittedLocation] = useState(() => {
        return sessionStorage.getItem(`${STORAGE_KEY}-submittedLocation`) || '';
    });

    const [cachedWeatherData] = useState(() => {
        try {
            const stored = sessionStorage.getItem(`${STORAGE_KEY}-weatherData`);
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const [url, setUrl] = useState(() => {
        return sessionStorage.getItem(`${STORAGE_KEY}-url`) || null;
    });

    const [manualError, setManualError] = useState('');

    const apiKey = apiKeys.codeWeather.appid;

    const { data, error, loading } = useFetch(url);

    const weatherData = data || cachedWeatherData;
    const inputError =
        manualError || (error ? 'Failed to fetch weather data.' : '');

    useEffect(() => {
        sessionStorage.setItem(`${STORAGE_KEY}-searchLocation`, searchLocation);
    }, [searchLocation]);

    useEffect(() => {
        sessionStorage.setItem(
            `${STORAGE_KEY}-submittedLocation`,
            submittedLocation,
        );
    }, [submittedLocation]);

    useEffect(() => {
        if (url) {
            sessionStorage.setItem(`${STORAGE_KEY}-url`, url);
        } else {
            sessionStorage.removeItem(`${STORAGE_KEY}-url`);
        }
    }, [url]);

    useEffect(() => {
        if (data) {
            sessionStorage.setItem(
                `${STORAGE_KEY}-weatherData`,
                JSON.stringify(data),
            );
        }
    }, [data]);

    const fetchByZip = async (zip) => {
        setUrl(
            `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&units=imperial&appid=${apiKey}`,
        );
    };

    const fetchByCityStateCountry = async ({ city, state, country }) => {
        setUrl(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${state},${country}&units=imperial&appid=${apiKey}`,
        );
    };

    const handleLocationSearch = async (input) => {
        const trimmed = input.trim();

        if (/^\d{5}(?:-\d{4})?$/.test(trimmed)) {
            setSubmittedLocation(trimmed);
            return fetchByZip(trimmed);
        }

        const match = trimmed.match(
            /^([A-Za-z.\-' ]+),\s*([A-Za-z]{2}),\s*([A-Za-z]{2})$/,
        );

        if (match) {
            const [, city, state, country] = match;

            setSubmittedLocation(trimmed);

            return fetchByCityStateCountry({
                city: city.trim(),
                state: state.toUpperCase(),
                country: country.toUpperCase(),
            });
        }

        throw new Error(
            'Invalid input. Enter a valid ZIP code or City, State Code, Country Code (e.g., Concord,CA,US).',
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setManualError('');

        try {
            await handleLocationSearch(searchLocation);
        } catch (error) {
            setManualError(error.message);
            setSubmittedLocation('');
        }
    };

    const handleUseLocalData = () => {
        setManualError('');

        if (!navigator.geolocation) {
            setManualError('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setSubmittedLocation('Local Weather');
                setUrl(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=${apiKey}`,
                );
            },
            () => {
                setManualError('Unable to get your location.');
            },
        );
    };

    return (
        <Shell>
            <TitleColumn>
                <Title>Weather App</Title>
                <Subtitle>This is a placeholder for the Weather App.</Subtitle>
            </TitleColumn>

            <Form onSubmit={handleSubmit}>
                <FormInput
                    aria-label="Search City or Zip"
                    type="text"
                    placeholder="Enter City, State Code, Country Code (City,XX,XX) OR Zip Code"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                />

                <SubmitButton type="submit" variant="primary">
                    Search
                </SubmitButton>

                <UseLocalDataButton
                    type="button"
                    variant="secondary"
                    onClick={() => {
                        handleUseLocalData();
                        setSearchLocation('');
                    }}
                >
                    Use Local Data
                </UseLocalDataButton>
            </Form>

            {inputError && <div>{inputError}</div>}

            {loading && <div>Loading...</div>}
            {weatherData && !inputError && (<div>
                <h2>{weatherData.name}</h2>
                <p>{weatherData.weather[0].description}</p>
                <p>Temperature: {weatherData.main.temp} °F</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} mph</p>
            </div>)}
            <APIInfo>
                <APICredit href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
                    Weather data provided by OpenWeatherMap
                </APICredit>
            </APIInfo>
        </Shell>
    );
};

export default WeatherWindow;
