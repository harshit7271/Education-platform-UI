/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class', // Enforce class-based dark mode
    theme: {
        extend: {
            colors: {
                primary: "#6C5DD3",
            },
            fontFamily: {
                sans: ["var(--font-jakarta)", "sans-serif"],
            },
        },
    },
    plugins: [],
};
