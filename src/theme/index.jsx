const theme = {};

theme.palette = {
  primary:   ['#E7EAF0'],   // main text on dark surfaces
  secondary: ['#AAB3C2'],   // muted text
  tertiary:  ['#6E7687'],   // subtle labels / disabled
  accent:    ['#52505c'],   // cyan highlight (focus, active, links)
  alert:     ['#FF3B30'],
  active:    ['#4CC9F0'],   // active window surfaces, active states

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
    'rgba(0,0,0,0.12)', // 0
    'rgba(0,0,0,0.18)', // 1
    'rgba(0,0,0,0.24)', // 2
    'rgba(0,0,0,0.30)', // 3
    'rgba(0,0,0,0.36)', // 4
    'rgba(0,0,0,0.42)', // 5
    'rgba(0,0,0,0.48)', // 6
    'rgba(0,0,0,0.54)', // 7
    'rgba(0,0,0,0.60)', // 8
    'rgba(0,0,0,0.75)', // 9
    'rgba(0,0,0,0.90)', // 10
    'rgba(0,0,0,1)', // 11
  ],

  light: [
    'rgba(255,255,255,0.04)', // 0
    'rgba(255,255,255,0.06)', // 1
    'rgba(255,255,255,0.08)', // 2
    'rgba(255,255,255,0.10)', // 3
    'rgba(255,255,255,0.12)', // 4
    'rgba(255,255,255,0.14)', // 5
    'rgba(255,255,255,0.16)', // 6
    'rgba(255,255,255,0.18)', // 7
    'rgba(255,255,255,0.22)', // 8
    'rgba(255,255,255,0.30)', // 9
    'rgba(255,255,255,0.78)', // 10
    'rgba(255,255,255,0.85)', // 11
    'rgba(255,255,255,0.9)', // 12
  ],

  white: ['#FFFFFF'],
  black: ['#000000'],
};

export default theme;
