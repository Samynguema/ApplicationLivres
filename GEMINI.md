# ApplicationLivres - GEMINI Context

## Project Overview
**ApplicationLivres** is a React-based web application designed as a book store prototype. It allows users to browse a collection of books, search for specific titles or authors, filter by categories, and manage a shopping cart for simulated orders.

### Main Technologies
- **React 19**: Core framework for building the UI.
- **Vanilla CSS**: Used for styling the application (`App.css`, `index.css`).
- **React Scripts**: Standard build and development toolset.

### Architecture
The application is currently structured as a single-page application (SPA) where most of the logic resides in `App.js`.
- **Data Source**: A hardcoded list of books (`BOOKS`) is defined directly in `App.js`.
- **State Management**: Uses React's `useState` and `useMemo` hooks to manage the catalog, search filters, cart state, and checkout process.
- **Components**: The main `App` component handles the header, toolbar (filters), catalog grid, and the cart/checkout sidebar.

## Building and Running
The following commands are available via `npm` (as defined in `package.json`):

- **Development Server**: `npm start` or `npm run server`
  Starts the app in development mode on [http://localhost:3000](http://localhost:3000).
- **Production Build**: `npm run build`
  Bundles the app into static files for production in the `build` folder.
- **Testing**: `npm test`
  Launches the interactive test runner.
- **Eject**: `npm run eject`
  Removes the single build dependency from the project.

## Development Conventions
- **State Logic**: Derived state (like filtered books or cart totals) should be calculated using `useMemo` to optimize performance.
- **Styling**: Prefer updating `App.css` for component-specific styles. The layout uses a combination of Flexbox and CSS Grid.
- **Hardcoded Data**: The book list is in `App.js`. If the project grows, consider moving this to a separate JSON file or an API service.
- **Language**: The UI and data are currently in **French**.
- **Testing**: The project includes `@testing-library/react` for component testing. Existing tests are in `App.test.js`.

## Key Files
- `src/App.js`: Main application logic, data, and UI structure.
- `src/App.css`: Styles for the storefront, catalog, and cart.
- `src/index.js`: Entry point that renders the React tree.
- `package.json`: Project dependencies and scripts.
