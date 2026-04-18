export const convert = {
  temp: {
    toF: (c: number) => ((c * 9) / 5 + 32).toFixed(),
  },
  speed: {
    toMph: (kmh: number) => (kmh * 0.621371).toFixed(),
  },
  length: {
    mmToInch: (mm: number) => (mm / 25.4).toFixed(),
  },
};
