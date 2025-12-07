module.exports = {
    darkMode: 'class',
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
          typography: (theme) => ({
            DEFAULT: {
              css: {
                code: { color: theme("colors.pink.500"), fontWeight: "500" },
                h1: { color: theme("colors.blue.800") },
              },
            },
            dark: {
              css: {
                color: theme("colors.gray.200"),
                a: { color: theme("colors.blue.400") },
              },
            },
          }),
        },
    plugins: [require('@tailwindcss/typography')],
  }
}
  