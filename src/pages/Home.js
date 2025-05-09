import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import styled from 'styled-components';

const PlanetButton = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  .planet-circle {
    border-radius: 50%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    transition: border-color 0.3s ease;
  }

  .planet-name {
    position: absolute;
    color: white;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    font-size: 14px;
    white-space: nowrap;
    left: ${props => props.nameX}px;
    top: ${props => props.nameY}px;
  }

  &:hover .planet-circle {
  }
`;

function Home() {
  const navigate = useNavigate();

  const planets = [
    { 
      id: 'sun', 
      name: 'Sun', 
      x: '-35%', 
      y: '7%', 
      size: 570,
      nameX: 500,
      nameY: 300
    },
    { 
      id: 'mercury', 
      name: 'Mercury', 
      x: '13.6%', 
      y: '46.6%', 
      size: 43,
      nameX: -3,
      nameY: 46
    },
    { 
      id: 'venus', 
      name: 'Venus', 
      x: '19%', 
      y: '46%', 
      size: 50,
      nameX: 0,
      nameY: 60
    },
    { 
      id: 'earth', 
      name: 'Earth', 
      x: '24.7%', 
      y: '43%', 
      size: 90,
      nameX: 28,
      nameY: 100
    },
    { 
      id: 'mars', 
      name: 'Mars', 
      x: '33.15%', 
      y: '46.6%', 
      size: 43,
      nameX: 0,
      nameY: 50
    },
    { 
      id: 'jupiter', 
      name: 'Jupiter', 
      x: '38.7%', 
      y: '33.7%', 
      size: 217,
      nameX: 80,
      nameY: 230
    },
    { 
      id: 'saturn', 
      name: 'Saturn', 
      x: '59.6%', 
      y: '38.5%', 
      size: 143,
      nameX: 55,
      nameY: 150
    },
    { 
      id: 'uranus', 
      name: 'Uranus', 
      x: '74.99%', 
      y: '40.7%', 
      size: 116,
      nameX: 35,
      nameY: 125
    },
    { 
      id: 'neptune', 
      name: 'Neptune', 
      x: '86.8%', 
      y: '40%', 
      size: 130,
      nameX: 42,
      nameY: 140
    }
  ];

  return (
    <Box className="home-page">
      <div className="planets-container">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          className="page-title"
        >
          Cosmic Explorer
        </Typography>
        
        {planets.map((planet) => (
          <PlanetButton
            key={planet.id}
            className="planet-button"
            style={{
              left: planet.x,
              top: planet.y
            }}
            size={planet.size}
            nameX={planet.nameX}
            nameY={planet.nameY}
            onClick={() => navigate(`/celestial/${planet.id}`)}
          >
            <div className="planet-circle" />
            <div className="planet-name">{planet.name}</div>
          </PlanetButton>
        ))}
      </div>
    </Box>
  );
}

export default Home; 