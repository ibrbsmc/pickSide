import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import '../css/LandingPage.css';
import Avatar from '@mui/material/Avatar';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import quizListEn from '../quizList.json';
import quizListTr from '../quizListe.json';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Edit from '../components/Edit';

const LandingPage = ({ t, language, setLanguage }) => {
  const navigate = useNavigate();
  const [allQuizzesEn, setAllQuizzesEn] = useState([]);
  const [allQuizzesTr, setAllQuizzesTr] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'tr' ? 'en' : 'tr'));
  };

  useEffect(() => {
    setAllQuizzesEn(quizListEn);
    setAllQuizzesTr(quizListTr);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (language === 'tr') {
      setQuizzes(allQuizzesTr);
      setFilteredQuizzes(allQuizzesTr);
    } else {
      setQuizzes(allQuizzesEn);
      setFilteredQuizzes(allQuizzesEn);
    }
  }, [language, allQuizzesEn, allQuizzesTr]);

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
        quizzes={quizzes}
        setFilteredQuizzes={setFilteredQuizzes}
        language={language}
        toggleLanguage={toggleLanguage}
        t={t}
      />
      {/* <Edit t={t} /> */}

      <div className='l-page'>
        <Container className="lp-container">
          {filteredQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className='lp-card'
              style={{ cursor: 'pointer', borderRadius: '2px' }}
              onClick={() => navigate(`/quiz/${quiz.id}`)}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img variant="top" src={quiz.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <Card.Body className='quiz-body'>
                <div className="creator">
                  <Avatar className='avatar'>{quiz.creator[0]}</Avatar>
                  {quiz.creator}
                </div>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text className='categories'>
                  <CategoryIcon sx={{ fontSize: '18px', marginRight: '5px' }} />
                  {quiz.category}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
    </>
  );
};

export default LandingPage;