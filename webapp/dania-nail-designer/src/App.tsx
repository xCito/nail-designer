import { DesignBuilder } from './components/DesignBuilder';
import { Layout } from './components/layout/Layout';
import { DesignProvider } from './contexts/DesignContext';

function App() {

  return (
    <DesignProvider>
      {/* <DesignBuilder /> */}
      <Layout />
    </DesignProvider>
  )
}

export default App
