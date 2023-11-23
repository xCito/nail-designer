import { useReducer } from 'react';
import './App.css'
import { DesignList } from './components/DesignList';
import { DESIGN_COMPLEXITY_SCORES } from './variables/variables';

function getDefaultDesign() {
  return {
    left: [],
    right: []
  }
}

function reducer(prevState, action) {
  console.log(action);
  switch(action.type) {
    case 'AddDesign': {
      const { designElem, hand } = action;
      if (hand === 'left') {
        return {...prevState, left: [...prevState.left, designElem]};
      } else if (hand === 'right') {
        return {...prevState, right: [...prevState.right, designElem]};
      } else {
        return {
          ...prevState,
           right: [...prevState.right, designElem],
           left: [...prevState.left, designElem]
        };
      }
    }
    case 'RemoveDesign': {
      const { designElem, hand } = action; 
      if (hand === 'left') {
        const leftH = [...prevState.left].filter(d => d.id !== designElem.id);
        return {...prevState, left: leftH};
      } else if (hand === 'right') {
        const rightH = [...prevState.right].filter(d => d.id !== designElem.id);
        return {...prevState, right: rightH};
      } else {
        return {
          ...prevState,
           right: [...prevState.right].filter(d => d.id !== designElem.id),
           left: [...prevState.left].filter(d => d.id !== designElem.id)
        };
      }
    }
    default: return prevState;
  }
}

function calcComplexity(design) {
  const addComplexity = function(total, designElem) {
    return total + designElem.complexity;
  } 
  const leftComplexity = design.left.reduce(addComplexity, 0);
  const rightComplexity = design.right.reduce(addComplexity, 0);
  const totalComplexity = leftComplexity + rightComplexity;

  if (totalComplexity >= DESIGN_COMPLEXITY_SCORES.Expertise) {
    return 'Expertise';
  } else if (totalComplexity >= DESIGN_COMPLEXITY_SCORES.Complex) {
    return 'Complex';
  } else {
    return 'Simple';
  }
}

function printReciept(design) {
  const print = '';
  const count = {};
  
  for (let d of design.left) {
    count[d.id] ? count[d.id]++ : count[d.id] = 1; 
  }
  for (let d of design.right) {
    count[d.id] ? count[d.id]++ : count[d.id] = 1; 
  }

  if ()
}

function App() {
  const [design, dispatch] = useReducer(reducer, null, getDefaultDesign);

  return (<div className='layout'>
    <h1 className='text-center'>Dania Nail Design Calculator</h1>

    <h3>Both Hands</h3>
    <div className='w-50 mx-auto'>
      <DesignList hand='both' design={design} dispatch={dispatch} />
    </div>

    {/* <hr className='my-5'/> */}

    {/* <h3>Right Hand</h3>
    <div className='w-50 me-auto'>
      <DesignList hand='right' design={design} dispatch={dispatch} />
    </div> */}

    <div className='mx-auto w-50 border rounded p-3'>
      Dania
    </div>
    <label>{calcComplexity(design)}</label>
  </div>);
}

export default App
