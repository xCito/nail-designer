import { DesignBuilder } from './components/DesignBuilder';
import { DesignProvider } from './contexts/DesignContext';

function App() {

  return (
    <DesignProvider>
      <DesignBuilder />
    </DesignProvider>
  )
}

export default App
