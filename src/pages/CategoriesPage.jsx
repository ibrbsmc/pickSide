import React, { useState, useEffect, useCallback, useMemo } from 'react';
import quizList from '../quizList.json';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Header from '../components/Header';
import '../css/CategoriesPage.css';
import Card from 'react-bootstrap/Card';
import Avatar from '@mui/material/Avatar';
import CategoryIcon from '@mui/icons-material/Category';
import Loading from '../components/Loading';

const CategoriesPage = ({ t, language, setLanguage }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = useMemo(() => [...new Set(quizList.map(q => q.category))], [quizList]);

  const handleCategoryClick = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  useEffect(() => {
    setLoading(true);
    const newFilteredQuizzes = quizList.filter(
      (q) => selectedCategory === null || q.category === selectedCategory
    );
    setFilteredQuizzes(newFilteredQuizzes);
    setLoading(false);
  }, [selectedCategory, quizList]);

  useEffect(() => {
    if (categories.length > 0 && selectedCategory === null) {
      handleCategoryClick(categories[0]);
    }
  }, [categories, handleCategoryClick, selectedCategory]);

  return (
    <div className="categories-page">
      <Header title={t('header.categories') || "Categories"} language={language} toggleLanguage={() => setLanguage(prevLang => (prevLang === 'tr' ? 'en' : 'tr'))} t={t} />

      <Container className="mt-4">
        <Row>
          <Col md={3} sm={12} className="category-sidebar mb-4">
            <h5 className="cat-text">{t('categories.title') || 'Categories'}</h5>
            <ListGroup>
              {categories.map((cat, idx) => (
                <ListGroup.Item
                  key={idx}
                  action
                  active={selectedCategory === cat}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {t(`categoryNames.${cat}`)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={9} sm={12}>
            <h5 className="foods-text">
              {selectedCategory ? `${t(`categoryNames.${selectedCategory}`) || selectedCategory} Quizzes` : t('categories.select') || 'Select a category'}
            </h5>

            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '40vh' }}>
                <Loading />
              </div>
            ) : (
              <div className="quiz-list">
                {filteredQuizzes.map((quiz) => (
                  <Card
                    key={quiz.id}
                    className="lp-card"
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  >
                    <Card.Img variant="top" src={quiz.image} />
                    <Card.Body className="quiz-body">
                      <div className="creator">
                        <Avatar className="avatar">{t(`quizzes.${quiz.id}.creator`)[0]}</Avatar>
                        {t(`quizzes.${quiz.id}.creator`)}
                      </div>
                      <Card.Title>{t(`quizzes.${quiz.id}.title`)}</Card.Title>
                      <Card.Text className="categories">
                        <CategoryIcon sx={{ fontSize: '18px', marginRight: '5px' }} />
                        {t(`quizzes.${quiz.id}.category`)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoriesPage;