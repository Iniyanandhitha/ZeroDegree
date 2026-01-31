import { useState } from 'react';
import { handleWeatherComparison, handlePostDataComparison } from '../lib/nadaPrograms';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 40px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 25px;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
`;

const SubTitle = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 8px;
  color: #fff;
  font-weight: 500;
  align-self: flex-start;
  margin-left: 5px;
`;

const StyledInput = styled.input`
  margin-bottom: 20px;
  padding: 12px 16px;
  width: 100%;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  backdrop-filter: blur(2px);
  transition: all 0.3s ease;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ResultCard = styled.div`
  margin-top: 25px;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  h2 {
    margin-top: 0;
    font-size: 1.2rem;
    color: #333;
  }

  p {
    margin: 10px 0;
    color: #444;
  }
`;

const ResultText = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  color: ${props => props.isSuccess ? '#2e7d32' : '#c62828'} !important;
`;

const Alert = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  background-color: rgba(255, 219, 219, 0.9);
  border: 1px solid #ffcdd2;
  color: #b71c1c;
  margin-bottom: 20px;
  text-align: left;
`;

const AlertTitle = styled.h4`
  margin: 0 0 5px 0;
  font-weight: bold;
`;

const AlertDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

export default function InputComparisonApp() {
  const [weatherCity, setWeatherCity] = useState('Goa');
  const [weatherTemperatureGuess, setWeatherTemperatureGuess] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherResult, setWeatherResult] = useState('');
  const [weatherError, setWeatherError] = useState(null);

  const [nadaTemperatureGuess, setNadaTemperatureGuess] = useState('');
  const [postData, setPostData] = useState(null);
  const [postResult, setPostResult] = useState('');
  const [postError, setPostError] = useState(null);

  const handleWeatherSubmit = async (e) => {
    e.preventDefault();
    try {
      const { actualTemperature, result } = await handleWeatherComparison(weatherCity, weatherTemperatureGuess);
      setWeatherData({ current: { temp_c: actualTemperature } });
      setWeatherResult(result);
      setWeatherError(null);
    } catch (error) {
      setWeatherError(error.message);
      setWeatherData(null);
      setWeatherResult('');
    }
  };

  const handlePostDataSubmit = async (e) => {
    e.preventDefault();
    try {
      const { postData, result } = await handlePostDataComparison(nadaTemperatureGuess);
      setPostData(postData);
      setPostResult(result);
      setPostError(null);
    } catch (error) {
      setPostError(error.message);
      setPostData(null);
      setPostResult('');
    }
  };

  return (
    <Container>
      <GlassCard>
        <Column>
          <SubTitle>Weather Guessing</SubTitle>
          <Form onSubmit={handleWeatherSubmit}>
            <Label>City Name:</Label>
            <StyledInput
              type="text"
              placeholder="e.g. London"
              value={weatherCity}
              onChange={(e) => setWeatherCity(e.target.value)}
              required
            />

            <Label>Guess Temperature (°C):</Label>
            <StyledInput
              type="number"
              placeholder="e.g. 25"
              value={weatherTemperatureGuess}
              onChange={(e) => setWeatherTemperatureGuess(e.target.value)}
              required
            />
            <StyledButton type="submit">Check Guess</StyledButton>
          </Form>

          {weatherError && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{weatherError}</AlertDescription>
            </Alert>
          )}
          {weatherData && (
            <ResultCard>
              <h2>Result for {weatherCity}</h2>
              <p>Actual: {weatherData.current.temp_c} °C</p>
              <ResultText isSuccess={weatherResult === 'Correct Guess!'}>
                {weatherResult}
              </ResultText>
            </ResultCard>
          )}
        </Column>

        <Column>
          <SubTitle>Secret Number Match</SubTitle>
          <Form onSubmit={handlePostDataSubmit}>
            <Label>Guess the Secret Byte (0-255):</Label>
            <StyledInput
              type="number"
              placeholder="e.g. 128"
              value={nadaTemperatureGuess}
              min="0"
              max="255"
              onChange={(e) => setNadaTemperatureGuess(e.target.value)}
              required
            />
            <StyledButton type="submit">Verify Secret</StyledButton>
          </Form>

          {postError && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{postError}</AlertDescription>
            </Alert>
          )}
          {postData && (
            <ResultCard>
              <h2>Result</h2>
              <p>Secret Byte Value: {postData}</p>
              <ResultText isSuccess={postResult === 'Correct Guess!'}>
                {postResult}
              </ResultText>
            </ResultCard>
          )}
        </Column>
      </GlassCard>
    </Container>
  );
}