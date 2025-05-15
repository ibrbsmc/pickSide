import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../css/Edit.css';
import quizList from '../quizList.json';

const Edit = ({ t }) => { // t fonksiyonunu prop olarak alın
  const navigate = useNavigate();
  const favoriteQuizIds = ['best-char', 'best-films', 'best-tec'];
  const favoriteQuizzes = quizList.filter(quiz => favoriteQuizIds.includes(quiz.id));

  return (
    <Container>
      <div className='edit-div'>
        <div className='one-sec'>
          <p>{t('homePage.favouritesTitle') || 'Welcome'}</p>
        </div>
        {/* <div className='two-sec'>
          <div className="favorite-cards-wrapper">
            <div className="image-cards">
              {favoriteQuizzes.map(quiz => (
                <div
                  key={quiz.id}
                  className="image-card"
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={quiz.image} alt={quiz.title} className="card-image" />
                  <div className="overlay">
                    <div className="card-title">{quiz.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
      <div className="animated-divider" />
    </Container>
  );
};

export default Edit;