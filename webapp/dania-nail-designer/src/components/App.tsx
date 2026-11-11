import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import logoDark from '@/assets/SDF-transparent-logo-black.png';
import logoLight from '@/assets/SDF-transparent-logo-glow-purple.png';
import { useReceipt } from "@/receipt/ReceiptContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Finger } from "./hand/Finger";
import { HairPage } from "./pages/HairPage";
import { HandsPage } from "./pages/HandsPage";
import { ToesPage } from "./pages/ToesPage";
import { ReceiptDrawer } from "./receipt/ReceiptDrawer";

const PAGES = [
  { id: 'hands', label: 'Hands' },
  { id: 'toes', label: 'Toes' },
  { id: 'hair', label: 'Hair' },
] as const;
type PageId = typeof PAGES[number]['id'];

function readPage(): PageId {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return PAGES.find(p => p.id === hash)?.id ?? 'hands';
}

/** Pages live in the URL hash (#/toes), so they work on GitHub Pages and with the back button. */
function useHashPage(): PageId {
  const [page, setPage] = useState<PageId>(readPage);
  useEffect(() => {
    const onChange = () => setPage(readPage());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return page;
}

export function App() {
  const page = useHashPage();
  const { visit } = useReceipt();
  const { themeMode, resolvedTheme, setThemeMode } = useContext(ThemeContext);
  const isDarkMode = themeMode === 'system' ? resolvedTheme === 'dark' : themeMode === 'dark';

  return <div className="h-100 p-2">
    <div className="layout d-flex flex-column mx-auto">
      <header className="d-flex align-items-center justify-content-between gap-2 mb-2">
        <div className="d-flex align-items-center gap-2">
          <img src={isDarkMode ? logoLight : logoDark} alt="Stardust Factory Logo" width="40" />
          <h2 className="page-title fancy-font my-0">Stardust Factory</h2>
        </div>
        <div className="d-flex align-items-center gap-2">
          {page === 'hands' && <Finger length={visit.length} shape={visit.shape} />}
          <button
            type="button"
            className={`theme-toggle ${isDarkMode ? 'theme-toggle-dark' : 'theme-toggle-light'}`}
            onClick={() => setThemeMode(isDarkMode ? 'light' : 'dark')}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            aria-pressed={isDarkMode}
          >
            <span className="theme-toggle-knob" />
          </button>
        </div>
      </header>

      <nav className="page-tabs" aria-label="Services">
        {PAGES.map(p =>
          <a key={p.id} href={`#/${p.id}`}
            className={classNames({ active: page === p.id })}
            aria-current={page === p.id ? 'page' : undefined}>
            {p.label}
          </a>
        )}
      </nav>

      <main className="page-body">
        {page === 'hands' && <HandsPage />}
        {page === 'toes' && <ToesPage />}
        {page === 'hair' && <HairPage />}
      </main>
    </div>

    <ReceiptDrawer />
  </div>;
}
