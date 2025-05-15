// App.jsx
import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage'; // Sadece LandingPage doğrudan yüklenecek
import Loading from './components/Loading'; // Suspense için fallback

import trTranslations from './locales/tr.json';
import enTranslations from './locales/en.json';

// Lazy-loaded pages
const QuizPage = lazy(() => import('./pages/QuizPage'));
const WinnerPage = lazy(() => import('./pages/WinnerPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const PopularPage = lazy(() => import('./pages/PopularPage'));

function App() {
  const [language, setLanguage] = useState('en');

  const translations = {
    tr: trTranslations,
    en: enTranslations,
  };

  const t = (key) => {
    const keys = key.split('.');
    return keys.reduce((obj, k) => (obj && obj[k] ? obj[k] : key), translations[language]);
  };

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={<LandingPage t={t} language={language} setLanguage={setLanguage} />}
          />
          <Route
            path="/quiz/:id"
            element={<QuizPage language={language} />}
          />
          <Route
            path="/winner"
            element={<WinnerPage language={language} t={t} />}
          />
          <Route
            path="/categories"
            element={<CategoriesPage t={t} language={language} setLanguage={setLanguage} />}
          />
          <Route
            path="/popularity"
            element={<PopularPage t={t} language={language} setLanguage={setLanguage} />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
