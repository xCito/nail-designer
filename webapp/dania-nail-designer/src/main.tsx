import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import './index.css'
import '@/styles/style.css';
import { DesignProvider } from './contexts/DesignContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { DesignBuilder } from './components/DesignBuilder.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <DesignProvider>
        <DesignBuilder />
      </DesignProvider>
    </ThemeProvider>
  </React.StrictMode>,
)


/*
GOALS
  #1: Consultation will be like chat bot help instead of flat page w lists

  #2:
  (new) Consultation options -> Desired Service; Basic Manicure, 
  Gel Manicure, Extensions/Enhancements, New Set, Take-Down Removal

  Gel Manicure is Basic Manicure w BaseGel in “Foundation” ON. 
  Base gel is same as Gel Manicure

  #3:
  Consultation; Removing prior design or set?, 
  what is your “Desired Service”? show options, 
  (add) “Desired Base” next using the bubbles from “Foundation”,
  include manicure?, Is your desired service: xyz?, 
  if yes; Consultation Complete button appears & move on to “Design”

  #4:
  Add “Add-Ons”; Gems, Charms, Extra Skin Smoothing 
  or Dry Skin Treatment (or both? as individual services)

  #5:
  Manicure is $20 again 👀

  #6:
  If click “Take Down”, include manicure, base gel 
  turns on but there are no pre or during service shaping options 

  #7:
  Put “Consultation”, “Foundation”, “Design” as tabs under the title & úña

*/

/*
 * [x] Form asking for clients current nail details:
 *      - LENGTH 
 *      - SHAPE
 * [ ] Consulation Form: 
 *      - [x] Basic manicure: (ON or OFF), <-- applies $$$
 *      - [ ] Enhancement options: (Maintenance, New Set, or Takedown) <-- applies $$$
 *            - Maintenance options: (Refill or Rebalance)   
 *                  - Design removal: (ON or OFF) <-- applied $$$  
 *                  - Refill: *display suboptions*
 *                  - Rebalance: *display suboptions*
 *            - New Set
 *            
 *            
 * 
 * 
 * [x] Merge Base, Shape, and Length section in respective order.
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