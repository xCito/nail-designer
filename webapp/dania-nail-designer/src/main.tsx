import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import App from './App.tsx'
import './index.css'
import '@/styles/style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


/**
 * GOALS
 * 
 * [x] Form asking for clients current nail details:
 *      - LENGTH 
 *      - SHAPE
 * [ ] Consulation Form: 
 *      - Basic manicure: (ON or OFF), <-- applies $$$
 *      - Enhancement options: (Maintenance, New Set, or Takedown) <-- applies $$$
 *            - Maintenance options: (Refill or Rebalance)   
 *                  - Design removal: (ON or OFF) <-- applied $$$  
 *                  - Refill: *display suboptions*
 *                  - Rebalance: *display suboptions*
 *            - New Set
 *            
 *            
 * 
 * 
 * [ ] Merge Base, Shape, and Length section in respective order.
 * [ ] Disable length options depending on selected shape.
 * [ ] 
 * 
 * [ ] More SVGs
 *
 * 
 * NICE TO HAVE
 * - Visually show applied design elements
 * 
 */