/**
 * Two converter types:
 * 1) "factor" → multiplicative conversion via base unit (most categories)
 * 2) "affine" → needs custom toBase/fromBase (temperature)
 */

export const UNIT_CATEGORIES = {
  area: {
    label: "Area",
    base: "m2",
    type: "factor",
    units: {
      m2: { label: "Square meter", factor: 1 },
      km2: { label: "Square kilometer", factor: 1e6 },
      in2: { label: "Square inch", factor: 0.00064516 },
      ft2: { label: "Square foot", factor: 0.09290304 },
      yd2: { label: "Square yard", factor: 0.83612736 },
      mi2: { label: "Square mile", factor: 2_589_988.110336 },
      acre: { label: "Acre", factor: 4046.8564224 },
    },
  },

  distance: {
    label: "Distance",
    base: "m",
    type: "factor",
    units: {
      m: { label: "Meter", factor: 1 },
      km: { label: "Kilometer", factor: 1000 },
      cm: { label: "Centimeter", factor: 0.01 },
      mm: { label: "Millimeter", factor: 0.001 },
      in: { label: "Inch", factor: 0.0254 },
      ft: { label: "Foot", factor: 0.3048 },
      yd: { label: "Yard", factor: 0.9144 },
      mi: { label: "Mile", factor: 1609.344 },
    },
  },

  mass: {
    label: "Mass",
    base: "kg",
    type: "factor",
    units: {
      kg: { label: "Kilogram", factor: 1 },
      g: { label: "Gram", factor: 0.001 },
      mg: { label: "Milligram", factor: 0.000001 },
      lb: { label: "Pound", factor: 0.45359237 },
      oz: { label: "Ounce", factor: 0.028349523125 },
    },
  },

  time: {
    label: "Time",
    base: "s",
    type: "factor",
    units: {
      s: { label: "Second", factor: 1 },
      min: { label: "Minute", factor: 60 },
      hr: { label: "Hour", factor: 3600 },
      day: { label: "Day", factor: 86400 },
      week: { label: "Week", factor: 604800 },
    },
  },

  volume: {
    label: "Volume",
    base: "L",
    type: "factor",
    units: {
      L: { label: "Liter", factor: 1 },
      mL: { label: "Milliliter", factor: 0.001 },
      gal: { label: "Gallon (US)", factor: 3.785411784 },
      qt: { label: "Quart (US)", factor: 0.946352946 },
      pt: { label: "Pint (US)", factor: 0.473176473 },
      cup: { label: "Cup (US)", factor: 0.2365882365 },
      floz: { label: "Fluid ounce (US)", factor: 0.0295735295625 },
    },
  },

  temperature: {
    label: "Temperature",
    base: "C",
    type: "affine",
    units: {
      C: {
        label: "Celsius",
        toBase: (c) => c,
        fromBase: (c) => c,
      },
      F: {
        label: "Fahrenheit",
        toBase: (f) => (f - 32) * (5 / 9),
        fromBase: (c) => c * (9 / 5) + 32,
      },
      K: {
        label: "Kelvin",
        toBase: (k) => k - 273.15,
        fromBase: (c) => c + 273.15,
      },
    },
  },
};