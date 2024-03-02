import { Layout } from './components/layout/Layout';
import { DesignProvider } from './contexts/DesignContext';
import { NailServiceProvider } from './contexts/NailServiceContext';

function App() {

  return (
    <NailServiceProvider>
      <DesignProvider>
        <Layout />
      </DesignProvider>
    </NailServiceProvider>
  )
}

export default App
