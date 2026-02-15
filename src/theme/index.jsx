const theme = {};

theme.palette = {
  primary:   ['#E7EAF0'],   // main text on dark surfaces
  secondary: ['#AAB3C2'],   // muted text
  tertiary:  ['#6E7687'],   // subtle labels / disabled
  accent:    ['#4CC9F0'],   // cyan highlight (focus, active, links)
  alert:     ['#FF3B30'],

  background: ['#0B0F14'],  // desktop background
  bluebutton: ['#2563EB'],  // strong CTA (resume/download)
  graybutton: ['#2A3340'],  // secondary buttons

  grays: [
    '#0B0F14', // 0 darkest (desktop)
    '#0F1620', // 1 surface
    '#141D2A', // 2 surface-alt
    '#1B2636', // 3 window chrome
    '#243246', // 4 borders / dividers
    '#2F3F57', // 5 hover surface
    '#3A4D6B', // 6 active surface
    '#516A90', // 7 subtle emphasis
    '#7E8DA5', // 8 muted text-ish
    '#E7EAF0', // 9 light text
  ],

  shadow: [
    'rgba(0,0,0,0.12)',
    'rgba(0,0,0,0.18)',
    'rgba(0,0,0,0.24)',
    'rgba(0,0,0,0.30)',
    'rgba(0,0,0,0.36)',
    'rgba(0,0,0,0.42)',
    'rgba(0,0,0,0.48)',
    'rgba(0,0,0,0.54)',
    'rgba(0,0,0,0.60)',
  ],

  light: [
    'rgba(255,255,255,0.04)',
    'rgba(255,255,255,0.06)',
    'rgba(255,255,255,0.08)',
    'rgba(255,255,255,0.10)',
    'rgba(255,255,255,0.12)',
    'rgba(255,255,255,0.14)',
    'rgba(255,255,255,0.16)',
    'rgba(255,255,255,0.18)',
    'rgba(255,255,255,0.22)',
  ],

  white: ['#FFFFFF'],
  black: ['#000000'],
};

export default theme;
