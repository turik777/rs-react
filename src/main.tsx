import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import About from './components/About/About.tsx';
import NotFound from './components/NotFound/NotFound.tsx';
import Details from './components/Details/Details.tsx';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Missing container');
}

createRoot(container).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Details />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
