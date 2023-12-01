import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


/**
 * GOALS
 * 
 * [x] Complexity calculator
 * [ ] Disabled options in Shape or Length
 * [ ] Apply design elements onto INDIVIDUAL nails 
 *      - Click on finger to focus on it, then apply design elements to it.
 *      - Click on same finger to unfocus, continue applying designs to all.
 * [ ] Switch between left & right hand
 *      ? Two page carousel for left and right hand
 *      ? Split design option into 2 sections (left | right)
 * [x] Display total cost as floating element
 *     Upon click, scroll to bottom to see price summary
 * [ ] Repair
 * [ ] Gel/design removal
 * [ ] Design images
 * [ ] More SVGs
 * [ ] Color for base nail (optional)
 * [ ] Apply color to applicable designs (gradient, dots, marble, magnetic)
 *      - hide color options non-applicable (charms, gem, sticker)
 *
 * 
 * NICE TO HAVE
 * - Visually show applied design elements
 * 
 */