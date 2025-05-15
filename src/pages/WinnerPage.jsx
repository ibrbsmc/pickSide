import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/QuizPage.css';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';

const WinnerPage = ({ language, t }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const winner = location.state?.winner;

  if (!winner) {
    return (
      <div className="quiz-page">
        <Header title={t('header.winner')} t={t} language={language} minimal={true} />
        <div className="text-center mt-5">
          {language === 'tr' ? 'Kazanan bulunamadı' : 'Winner not found'}
        </div>
      </div>
    );
  }

  const exitButtonText = language === 'tr' ? 'Çıkış' : 'Exit';

  return (
    <div className="quiz-page">
      <Header title={t('header.winner')} t={t} language={language} minimal={true} />
      <Button onClick={() => navigate('/')} className="exitButton">
        {exitButtonText}
      </Button>

      {/* Blurlu arka plan */}
      <div className="background-wrapper">
        <div
          className="bg-half left-blur"
          style={{ backgroundImage: `url(${winner.image})` }}
        />
        <div
          className="bg-half right-blur"
          style={{ backgroundImage: `url(${winner.image})` }}
        />
      </div>

      <div className="rounded-pairs">
        <div className="option-wrapper selected-left">
          <div className="option-card">
            <img src={winner.image || "/images/default.jpg"} alt={winner.title} />
            <h5 className="option-title">🏆 {winner.title}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerPage;
