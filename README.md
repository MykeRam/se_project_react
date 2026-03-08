# WTWR (What to Wear?)

WTWR (What to Wear?) is a React-based web application that helps users decide what clothes to wear based on the current weather conditions. The app displays the current temperature, suggests clothing items appropriate for the weather, and allows users to preview clothing items in a modal.

---

## Functionality

- Displays the current date and location
- Shows the current temperature in Fahrenheit
- Filters and displays clothing items based on weather conditions
- Opens a preview modal when a clothing item is clicked
- Opens a form modal to add new garments (UI only)
- Supports closing modals by button, overlay click, or Escape key

---

## Technologies & Techniques Used

- **React** (functional components, hooks)
- **Vite** (project setup and build tool)
- **JavaScript (ES6+)**
- **CSS with BEM methodology**
- **OpenWeatherMap API** (weather data logic)
- **Component-based architecture**
- **State lifting and prop drilling**
- **Conditional rendering**

---

## Project Structure

The project is organized using a component-based structure:

- `components/` — React components (App, Header, Main, Footer, etc.)
- `utils/` — utility files (API logic, constants, default clothing items)
- `vendor/` — third-party styles (normalize.css, fonts.css)
- `assets/` — static assets (images, icons)
- `index.html` — entry HTML file
- `main.jsx` — React entry point

---

## Screenshots

<img width="3400" height="1740" alt="143B653D-921D-4E3C-9AA2-7E5755F2CAC8" src="https://github.com/user-attachments/assets/d9f7df00-5ac3-4cbb-a47c-3ffc0b46b54e" />

---

## Project Pitch Video
 
 Check out https://drive.google.com/file/d/1pckEEI9oSwydi9T9UUqyeMLUNgQ7gxQm/view?usp=sharing, where I describe my 
 project and some challenges I faced while building it.

```bash
npm run build
npm run preview
```
