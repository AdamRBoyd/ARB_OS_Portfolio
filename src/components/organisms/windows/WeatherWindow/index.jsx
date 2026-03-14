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
import { Button, Divider } from '@atoms';
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

/* ----------------------------- */
/* Form */
/* ----------------------------- */

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
    font-size: 0.8rem;

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
    padding: 0.55rem 4rem;
`;

const UseLocalDataButton = styled(Button)`
    padding: 0.55rem 1.2rem;
    font-size: 0.9rem;
`;

/* ----------------------------- */
/* Weather Display */
/* ----------------------------- */

const WeatherLocation = styled.h2`
    margin: 0;
    padding: 0.5rem 1rem;
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.palette.grays[4]};
    z-index: 2;
`;

const WeatherDisplayContainer = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
    overflow: auto;
`;

const WeatherInfoRow = styled(Row)`
    gap: 2rem;
    padding: 0 1rem;
    justify-content: center;
`;

const WeatherLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    border-right: 1px solid ${({ theme }) => theme.palette.grays[4]};
    padding-right: 4rem;
`;

const WeatherRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.25rem;
    padding-left: 2rem;
`;

const WeatherIcon = styled.img`
    width: 100px;
    height: 100px;
`;

const WeatherDescription = styled.div`
    font-size: 0.9rem;
    text-transform: capitalize;

    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const WeatherIconTemp = styled(Row)`
    font-size: 1.5rem;
    font-weight: bold;
`;

const WeatherFeelsLike = styled.div`
    font-size: 0.9rem;
    font-style: italic;

    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const WeatherLowHighGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

const WeatherLowHigh = styled.div`
    font-size: 0.9rem;

    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const WeatherInfoItem = styled.div`
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 0.5rem;

    font-size: 0.8rem;

    background: ${({ theme }) => theme.palette.grays[3]};
    padding: 0.25rem 1rem;
    border-radius: 8px;
    width: 100%;

`;

const WeatherLabel = styled.span`
    font-weight: 500;
`;

const WeatherValue = styled.span`
    text-align: left;
`;

const ErrorMessage = styled.div`
    color: ${({ theme }) => theme.palette.accent[0]};
    font-weight: bold;
    text-align: center;
    padding: 1rem;
`;

const LoadingMessage = styled.div`
    color: ${({ theme }) => theme.palette.tertiary[0]};
    font-style: italic;
    text-align: center;
    padding: 1rem;
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
/* UTILS */
/* ----------------------------- */

const getWindDirection = (deg) => {
    const directions = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ];
    return directions[Math.round(deg / 22.5) % 16];
};

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

    const [url, setUrl] = useState(() => {
        return sessionStorage.getItem(`${STORAGE_KEY}-url`) || null;
    });

    const [manualError, setManualError] = useState('');

    const apiKey = apiKeys.codeWeather.appid;
    const urlBase = `https://api.openweathermap.org/data/2.5/weather`;
    const querySuffix = `&units=imperial&appid=${apiKey}`;

    const { data, error, loading } = useFetch(url);

    const weatherData = data;
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

    const handleLocationSearch = async (input) => {
        const trimmed = input.trim();

        if (/^\d{5}(?:-\d{4})?$/.test(trimmed)) {
            setSubmittedLocation(trimmed);
            return setUrl(
                `${urlBase}?zip=${trimmed},US${querySuffix}`,
            );
        }

        const match = trimmed.match(
            /^([A-Za-z.\-' ]+),\s*([A-Za-z]{2}),\s*([A-Za-z]{2})$/,
        );

        if (match) {
            const [, city, state, country] = match;

            setSubmittedLocation(trimmed);

            const formattedCity = city.trim();
            const formattedState = state.toUpperCase();
            const formattedCountry = country.toUpperCase();

            return setUrl(
                `${urlBase}?q=${encodeURIComponent(formattedCity)},${formattedState},${formattedCountry}${querySuffix}`,
            );
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
                setSearchLocation('');
                setUrl(
                    `${urlBase}?lat=${position.coords.latitude}&lon=${position.coords.longitude}${querySuffix}`,
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
                <Subtitle>Get current weather data for any location worldwide.</Subtitle>
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
                    onClick={handleUseLocalData}
                >
                    Use Local Data
                </UseLocalDataButton>
            </Form>

            {inputError && <ErrorMessage>{inputError}</ErrorMessage>}

            {loading && <LoadingMessage>Loading...</LoadingMessage>}
            {weatherData && !inputError && !loading && (
                <WeatherDisplayContainer>
                    <WeatherLocation>
                        Weather for {weatherData.name},{' '}
                        {weatherData.sys.country}
                    </WeatherLocation>
                    <WeatherInfoRow>
                        <WeatherLeft>
                            <WeatherDescription>
                                {weatherData.weather[0].description}
                            </WeatherDescription>
                            <WeatherIconTemp>
                                <WeatherIcon
                                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                />
                                {weatherData.main.temp} °F
                            </WeatherIconTemp>
                            <WeatherFeelsLike>
                                Feels Like: {weatherData.main.feels_like} °F
                            </WeatherFeelsLike>
                            <WeatherLowHighGroup>
                                <WeatherLowHigh>{`Low: ${weatherData.main.temp_min} °F`}</WeatherLowHigh>
                                <Divider height="1rem" />
                                <WeatherLowHigh>{`High: ${weatherData.main.temp_max} °F`}</WeatherLowHigh>
                            </WeatherLowHighGroup>
                        </WeatherLeft>
                        <WeatherRight>
                            <WeatherInfoItem>
                                <WeatherLabel>Humidity:</WeatherLabel>
                                <WeatherValue>
                                    {weatherData.main.humidity}%
                                </WeatherValue>
                            </WeatherInfoItem>
                            <WeatherInfoItem>
                                <WeatherLabel>Wind Speed:</WeatherLabel>
                                <WeatherValue>
                                    {weatherData.wind.speed} mph {weatherData.wind?.deg != null && getWindDirection(weatherData.wind.deg)}
                                </WeatherValue>
                            </WeatherInfoItem>
                            <WeatherInfoItem>
                                <WeatherLabel>Pressure:</WeatherLabel>
                                <WeatherValue>
                                    {weatherData.main.pressure} hPa
                                </WeatherValue>
                            </WeatherInfoItem>
                            <WeatherInfoItem>
                                <WeatherLabel>Visibility:</WeatherLabel>
                                <WeatherValue>
                                    {(weatherData.visibility / 1609).toFixed(1)} miles
                                </WeatherValue>
                            </WeatherInfoItem>
                            <WeatherInfoItem>
                                <WeatherLabel>Sun:</WeatherLabel>
                                <WeatherValue>
                                    {`${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()} → ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}`}
                                </WeatherValue>
                            </WeatherInfoItem>
                            <WeatherInfoItem>
                                <WeatherLabel>Coordinates:</WeatherLabel>
                                <WeatherValue>
                                    {`${weatherData.coord.lat} lat, ${weatherData.coord.lon} lon`}
                                </WeatherValue>
                            </WeatherInfoItem>
                        </WeatherRight>
                    </WeatherInfoRow>
                </WeatherDisplayContainer>
            )}
            <APIInfo>
                <APICredit
                    href="https://openweathermap.org/api"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Weather data provided by OpenWeatherMap
                </APICredit>
            </APIInfo>
        </Shell>
    );
};

export default WeatherWindow;
