# Employee Management System

Hello there! I am Ege Bercan HASKAYA. This is my case study project for ING Hubs Turkey. It's an employee management system built with web components and LitElement. First of all, i never used LitElement so this was a bit of learning and going from previous experiences. However, in the end after a lot of errors and creating a stable project, i actually liked LitElement. Also, using vanilla javascript really stretches your brain muscles. :D

## What I Built

Basically, it's a CRUD app for managing employees. You can add, edit, delete employees and search through them. Nothing too fancy, but it works well and covers almost all of the given requirements.

## Tech Stack

- **LitElement** for web components: First time using it seriously, pretty nice actually. It's similar to the vuejs in my opinion.
- **Vanilla JavaScript** (Why no typescript ? :D)
- **Redux** for state management: Forgot how verbose vanilla Redux is. Kept it simple, toolkit created a lot of problems so i decided not to use redux/toolkit.
- **Vaadin Router** for routing: Seems like a pretty straight forward router.
- **Web Test Runner/Playwright** for testing: ^bored face^
- **Local Storage** for persistence storage: Well since we dont have a backend
- **Local Message** for langauge change: i18n like libraries didnt want to work, so i asked myself how hard it can be? Turns out it is pretty easy to do...

## How to Run This Thing

```bash
# Install all packages with npm
npm install

# Run the dev server
npm run serve

# Please navigate to http://localhost:8000
```

Thats it. Should work out of the box.

## Project Structure

Well at the half point i just asked myself was this really necessary? But whatever here is a unnecessary root map...

```
├── index.html                  # Main HTML entry point (SPA root)
├── src/                        # Source code
│   ├── components/             # All the reusable UI components
│   │   ├── button-element.js         # Reusable button with variants
│   │   ├── input-element.js          # Text input with validation
│   │   ├── dropdown-element.js       # Select dropdown component
│   │   ├── phone-input-element.js    # Turkish phone number input
│   │   ├── search-input-element.js   # Search with clear/search buttons
│   │   ├── table-element.js          # Employee data table
│   │   ├── pagination-element.js     # Pagination with sliding window
│   │   ├── popup-element.js          # Confirmation dialogs
│   │   ├── checkbox-element.js       # Custom checkbox
│   │   ├── icon-element.js           # SVG icon component
│   │   ├── user-card-element.js      # Employee card for grid view
│   │   └── date-picker-element.js    # Date picker component
│   ├── layout/
│   │   └── header-element.js         # App header with navigation
│   ├── pages/                  # Main application pages
│   │   ├── employee-list.js          # Main employee listing page
│   │   └── employee-add-edit.js      # Add/edit employee form
│   ├── store/                  # State management
│   │   └── employee-store.js         # Redux store with all actions
│   ├── utils/                  # Helper functions
│   │   ├── translate.js              # Localization utilities
│   │   └── formatPhoneNumber.js      # Phone formatting logic
│   ├── locales/                # Internationalization files
│   │   ├── en.js                     # English translations
│   │   └── tr.js                     # Turkish translations
│   └── router/                 # Client-side routing
│       └── router.js                 # Vaadin router setup
└── test/                       # Test files
```

## Testing

I tried to cover everything that comes to my mind.

I covered:

- All components
- Store functionality
- Localization
- Form validation
- Edge cases

Go ahead and run the test command:

```bash
npm test
```

## Things I'd Improve

If I had more time:

- Better error handling for edge cases, maybe create a validation function and more robust handling. Maybe even a validation library can be used but i just wanted to keep things simple since we only have one form.
- More animations, transitions and nicer ui always appreciated. Maybe even add dark/light mode.
- Maybe more simpler redux store, thing got a little bit out of hand at the end. :D
- Optimization for pages and components. Since this is my first time using LitElement i am not %100 sure is unnecesary rendering happening or not...
- Better components for sure, for the sake of this case study i didn't go too far deep into "creating the perfect component" vibe, but if i had time i would definitely go for more robust/reusable components.

## Final Thoughts

This was a fun project! Web components are pretty cool once you get the hang of them. LitElement makes it much easier than vanilla web components.

The app is fully functional. It's not going to win any design awards, but it's clean, works well, and the code is maintainable.
