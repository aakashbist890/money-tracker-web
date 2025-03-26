/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/recharts/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      primary: "#4f46e5",
      success: "#4ade80",
      danger: "#f87171",
    },
  },
};
export const plugins = [];
