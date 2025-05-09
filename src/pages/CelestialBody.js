import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';
import Planet3DViewer from '../components/Planet3DViewer';

const celestialData = {
  sun: {
    name: 'Sun',
    type: 'Star',
    diameter: '1,392,700 km',
    distance: '0 km (Center of Solar System)',
    orbitalPeriod: 'N/A',
    surfaceTemp: '5,500°C (Surface) / 15 million°C (Core)',
    description: 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field. It is by far the most important source of energy for life on Earth.',
    features: [
      'Largest object in our solar system',
      'Contains 99.8% of the solar system\'s mass',
      'Surface temperature of about 5,500°C',
      'Core temperature of about 15 million°C',
      'Provides light and heat to all planets'
    ],
    image: '/planets/sun.jpg'
  },
  mercury: {
    name: 'Mercury',
    type: 'Planet',
    diameter: '4,879 km',
    distance: '57.9 million km',
    orbitalPeriod: '88 Earth days',
    surfaceTemp: '-180°C to 430°C',
    description: 'Mercury is the smallest and innermost planet in the Solar System. Its orbital period around the Sun of 87.97 days is the shortest of all the planets in the Solar System.',
    features: [
      'Smallest planet in our solar system',
      'Closest planet to the Sun',
      'No atmosphere to retain heat',
      'Heavily cratered surface'
    ],
    image: '/planets/mercury.jpg'
  },
  venus: {
    name: 'Venus',
    type: 'Planet',
    diameter: '12,104 km',
    distance: '108.2 million km',
    orbitalPeriod: '225 Earth days',
    surfaceTemp: '462°C',
    description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor. It\'s one of the four inner, terrestrial planets, and it\'s often called Earth\'s twin because it\'s similar in size and density.',
    features: [
      'Hottest planet in our solar system',
      'Thick atmosphere of carbon dioxide',
      'Retrograde rotation',
      'No moons or rings'
    ],
    image: '/planets/venus.jpg'
  },
  earth: {
    name: 'Earth',
    type: 'Planet',
    diameter: '12,742 km',
    distance: '149.6 million km',
    orbitalPeriod: '365.25 Earth days',
    surfaceTemp: '-88°C to 58°C',
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 29.2% of Earth\'s surface is land and 70.8% is water.',
    features: [
      'Only planet known to have life',
      'Has one natural satellite (Moon)',
      '71% of surface covered in water',
      'Has a protective magnetic field',
      'Atmosphere contains 21% oxygen'
    ],
    image: '/planets/earth.jpg'
  },
  mars: {
    name: 'Mars',
    type: 'Planet',
    diameter: '6,779 km',
    distance: '227.9 million km',
    orbitalPeriod: '687 Earth days',
    surfaceTemp: '-140°C to 20°C',
    description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Often called the "Red Planet" due to its reddish appearance, Mars has a thin atmosphere and surface features reminiscent of both the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth.',
    features: [
      'Known as the Red Planet',
      'Has the largest volcano in the solar system',
      'Has two small moons',
      'Has seasons like Earth',
      'Evidence of ancient water flows'
    ],
    image: '/planets/mars.jpg'
  },
  jupiter: {
    name: 'Jupiter',
    type: 'Planet',
    diameter: '139,820 km',
    distance: '778.5 million km',
    orbitalPeriod: '11.9 Earth years',
    surfaceTemp: '-110°C',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in our solar system combined.',
    features: [
      'Largest planet in our solar system',
      'Has the Great Red Spot storm',
      'Has 79 known moons',
      'Has a faint ring system',
      'Strong magnetic field'
    ],
    image: '/planets/jupiter.jpg'
  },
  saturn: {
    name: 'Saturn',
    type: 'Planet',
    diameter: '116,460 km',
    distance: '1.4 billion km',
    orbitalPeriod: '29.5 Earth years',
    surfaceTemp: '-178°C',
    description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is known for its prominent ring system, which consists of ice particles, rocky debris, and dust.',
    features: [
      'Known for its beautiful ring system',
      'Has 82 confirmed moons',
      'Least dense planet in our solar system',
      'Has a hexagonal storm at its north pole',
      'Rings are made of ice and rock'
    ],
    image: '/planets/saturn.jpg'
  },
  uranus: {
    name: 'Uranus',
    type: 'Planet',
    diameter: '50,724 km',
    distance: '2.9 billion km',
    orbitalPeriod: '84 Earth years',
    surfaceTemp: '-224°C',
    description: 'Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is similar in composition to Neptune, and both have different bulk chemical composition from that of the larger gas giants Jupiter and Saturn.',
    features: [
      'Rotates on its side',
      'Has 27 known moons',
      'Has 13 known rings',
      'First planet discovered with a telescope',
      'Has a blue-green color due to methane'
    ],
    image: '/planets/uranus.jpg'
  },
  neptune: {
    name: 'Neptune',
    type: 'Planet',
    diameter: '49,244 km',
    distance: '4.5 billion km',
    orbitalPeriod: '165 Earth years',
    surfaceTemp: '-214°C',
    description: 'Neptune is the eighth and farthest known planet from the Sun. It was the first planet located through mathematical calculations rather than observation. Neptune is similar in composition to Uranus, and both have different bulk chemical composition from that of the larger gas giants Jupiter and Saturn.',
    features: [
      'Has the strongest winds in the solar system',
      'Has 14 known moons',
      'Has a faint ring system',
      'Has a Great Dark Spot storm',
      'Last planet in our solar system'
    ],
    image: '/planets/neptune.jpg'
  }
};

function CelestialBody() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = celestialData[id];
  const [show3D, setShow3D] = useState(false);

  if (!data) {
    return (
      <Container>
        <Typography variant="h4">Celestial body not found</Typography>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #0a1929 0%, #1a2027 100%)',
        py: 8
      }}
    >
      <Container>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 4 }}
        >
          Back to Explorer
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '400px',
                  mb: 4,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 0 20px rgba(144, 202, 249, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)'
                }}
              >
                <img
                  src={data.image}
                  alt={data.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    padding: '20px'
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => setShow3D(true)}
                  sx={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'rgba(25, 118, 210, 0.9)',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 1)'
                    }
                  }}
                >
                  View in 3D
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  color: 'primary.main',
                  fontWeight: 'bold',
                  mb: 2,
                  textShadow: '0 0 10px rgba(144, 202, 249, 0.5)'
                }}
              >
                {data.name}
              </Typography>
              <Typography variant="h5" color="primary" gutterBottom>
                {data.type}
              </Typography>

              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  mb: 4
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Quick Facts
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" paragraph>
                  <strong>Diameter:</strong> {data.diameter}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Distance from Sun:</strong> {data.distance}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Orbital Period:</strong> {data.orbitalPeriod}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Surface Temperature:</strong> {data.surfaceTemp}
                </Typography>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" paragraph>
                  {data.description}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Key Features
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ul style={{ paddingLeft: '20px' }}>
                  {data.features.map((feature, index) => (
                    <li key={index}>
                      <Typography variant="body1" paragraph>
                        {feature}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
      {show3D && (
        <Planet3DViewer
          planetName={data.name}
          onClose={() => setShow3D(false)}
        />
      )}
    </Box>
  );
}

export default CelestialBody; 