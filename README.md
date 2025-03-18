# Guess What Song

[Play the game](guesswhatsong.com): guesswhatsong.com

Song guessing game with your favorite artist! Currently in Chinese and English.

## Motives

Heardle was a popular game but it doesn't have non english songs. As someone that loves listening to Chinese songs, I would like to play the game with artists from all over the world! Also, it's a lot easier and more fun if you're guessing songs from your favorite artist, especially before their concert.

## How to play

1. Search for an Artist – Start by entering the name of a singer or band. We’ll pick a random song from their catalog!
2. Listen to the Snippet – We’ll play a short clip of the song.
3. Make Your Guess – Type your answer in the search bar, where possible song titles will be listed to help you out.
4. More Time with Each Guess –

- 1st Guess → You hear 1 second
- 2nd Guess → You hear 3 seconds
- 3rd Guess → You hear 6 seconds
- and so on, following the pattern (1 + guess number) seconds.

5. Skip or Keep Guessing – Not sure? You can skip a turn or keep trying until you run out of guesses.
6. Win by Guessing the Song before your 6th attempt!

## Stack

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A fast, opinionated frontend build tool.
- **TypeScript** - A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS** - A utility-first CSS framework.
- **Tailwind Prettier Plugin** - A Prettier plugin for formatting Tailwind CSS classes.
- **ESLint** - A pluggable linting utility for JavaScript and TypeScript.
- **PostCSS** - A tool for transforming CSS with JavaScript.
- **Autoprefixer** - A PostCSS plugin to parse CSS and add vendor prefixes.
- **shadcn/ui** - Beautifully designed components that you can copy and paste into your apps.

## Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 16 or above)
- pnpm (package manager)

## Getting Started

Follow these steps to get started with the react-vite-ui template:

1. Clone the repository:

   ```bash
   git clone https://github.com/dan5py/react-vite-ui.git
   ```

2. Navigate to the project directory:

   ```bash
   cd react-vite-ui
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

## Available Scripts

- pnpm dev - Starts the development server.
- pnpm build - Builds the production-ready code.
- pnpm lint - Runs ESLint to analyze and lint the code.
- pnpm preview - Starts the Vite development server in preview mode.

## Project Structure

The project structure follows a standard React application layout:

```python
react-vite-ui/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── locales/           # Language json files
  ├── src/               # Application source code
  │   ├── common/        # Common constants
  │   │   └── types.tsx  # Common types
  │   ├── hooks/         # Custom hooks
  │   ├── components/    # React components
  │   │   └── ui/        # shadc/ui components
  │   ├── styles/        # CSS stylesheets
  │   ├── lib/           # Utility functions
  │   ├── App.tsx        # Application entry point
  │   └── index.tsx      # Main rendering file
  ├── eslint.config.js     # ESLint configuration
  ├── index.html         # HTML entry point
  ├── postcss.config.js  # PostCSS configuration
  ├── tailwind.config.ts # Tailwind CSS configuration
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.
