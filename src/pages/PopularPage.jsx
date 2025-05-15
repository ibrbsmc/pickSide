import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '../css/LandingPage.css'; // Aynı kart stillerini kullanacağız
import Avatar from '@mui/material/Avatar';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import quizListEn from '../quizList.json'; // İngilizce quiz listesi
import quizListTr from '../quizListe.json'; // Türkçe quiz listesi
import Header from '../components/Header';
import Loading from '../components/Loading'; // Loading component'ini içeri aktar

const PopularPage = ({ t, language, setLanguage }) => { // Prop'ları alın
  const navigate = useNavigate();
  const [popularQuizzes, setPopularQuizzes] = useState([]);
  const [filteredPopularQuizzes, setFilteredPopularQuizzes] = useState([]); // Filtrelenmiş popüler quizler için yeni state
  const [loading, setLoading] = useState(true); // Başlangıçta true

  useEffect(() => {
    // Quizleri popularity değerine göre azalan sırada sırala
    const sortedQuizzesEn = [...quizListEn].sort((a, b) => b.popularity - a.popularity);
    const sortedQuizzesTr = [...quizListTr].sort((a, b) => b.popularity - a.popularity);
    setPopularQuizzes(language === 'tr' ? sortedQuizzesTr : sortedQuizzesEn);
    setFilteredPopularQuizzes(language === 'tr' ? sortedQuizzesTr : sortedQuizzesEn);
    setLoading(false); // Veriler yüklendikten hemen sonra loading'i kapat
  }, [language]);

  if (loading) {
    return (
      <div className='l-page'>
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Loading />
        </Container>
      </div>
    );
  }

  return (
    <>
      <Header
        quizzes={popularQuizzes}
        setFilteredQuizzes={setFilteredPopularQuizzes}
        title={t('header.popular') || 'Popular'} // Header başlığı için çeviri
        language={language}
        toggleLanguage={() => setLanguage(prevLang => (prevLang === 'tr' ? 'en' : 'tr'))}
        t={t}
      />
      <div className='l-page'>
      <Container className="lp-container">
      {filteredPopularQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className='lp-card'
              style={{ width: '21rem', cursor: 'pointer', borderRadius: '2px' }}
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              {/* Kart içeriği */}
              <Card.Img variant="top" src={quiz.image} />
              <Card.Body className='quiz-body'>
                <Card.Text className='creator'>
                  <Avatar className='avatar'>{quiz.creator[0]}</Avatar>
                  {quiz.creator}
                </Card.Text>
                <Card.Title>{t(`quizzes.${quiz.id}.title`) || quiz.title}</Card.Title>
                <Card.Text className='categories'>
                  <CategoryIcon sx={{ fontSize: '18px', marginRight: '5px' }} />
                  {t(`categoryNames.${quiz.category}`) || quiz.category}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
    </>
  );
};

export default PopularPage;