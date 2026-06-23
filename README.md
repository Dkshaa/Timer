# Timer

A lightweight browser timer for focused work sessions, quick breaks, and repeatable countdowns.

## Features

- Start, pause, reset, and complete a countdown
- Quick presets for common focus sessions
- Custom minute input for ad hoc timers
- Local preference storage for the last selected duration
- Browser notification when a timer finishes, when permission is granted
- No build step required for everyday use

## Run Locally

Open `index.html` in a browser, or serve the folder with any static file server.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Test

The pure timer helpers can be tested with Node.js.

```bash
npm test
```

## Project Structure

- `index.html` contains the app markup
- `styles.css` contains the responsive layout and visual styling
- `src/timer.js` wires browser events to countdown behavior
- `src/timer-core.js` contains testable timer helpers
- `src/storage.js` keeps the selected duration between visits
- `src/notifications.js` handles optional completion notifications
