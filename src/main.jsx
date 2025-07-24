import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import setupLocatorUI from "@locator/runtime";
import './index.css'
import App from './App.jsx'
// import * as    serviceWorkerRegistration from './serviceWorkerRegistration'

// if (process.env.NODE_ENV === "development") {
//   setupLocatorUI();
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// serviceWorkerRegistration.register();