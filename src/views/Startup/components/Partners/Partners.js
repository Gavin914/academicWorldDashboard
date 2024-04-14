import React from 'react';
import Slider from 'react-slick';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

const mock = [
  // https://commons.wikimedia.org/wiki/Category:SVG_logos_of_universities_and_colleges_in_the_United_States
  'https://download.logo.wine/logo/Yale_University/Yale_University-Logo.wine.png',
  'https://download.logo.wine/logo/Massachusetts_Institute_of_Technology/Massachusetts_Institute_of_Technology-Logo.wine.png',
  'https://download.logo.wine/logo/University_of_Pennsylvania/University_of_Pennsylvania-Logo.wine.png',
  'https://download.logo.wine/logo/Duke_University/Duke_University-Logo.wine.png',
  'https://download.logo.wine/logo/California_Institute_of_Technology/California_Institute_of_Technology-Logo.wine.png',
  'https://download.logo.wine/logo/University_of_California%2C_Berkeley/University_of_California%2C_Berkeley-Logo.wine.png',
  'https://download.logo.wine/logo/University_of_California%2C_Los_Angeles/University_of_California%2C_Los_Angeles-Logo.wine.png',
];

const Partners = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.up('xs'), {
    defaultMatches: true,
  });
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const isLg = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  let slidesToShow = 2;
  if (isXs) {
    slidesToShow = 2;
  }
  if (isSm) {
    slidesToShow = 3;
  }
  if (isMd) {
    slidesToShow = 4;
  }
  if (isLg) {
    slidesToShow = 5;
  }

  const sliderOpts = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Box>
      <Slider {...sliderOpts}>
        {mock.map((item, i) => (
          <Box maxWidth={120} key={i} marginX={3}>
            <Box
              component="img"
              height={1}
              width={1}
              src={item}
              alt="..."
              sx={{
                filter: 'brightness(0) invert(1)',
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Partners;
