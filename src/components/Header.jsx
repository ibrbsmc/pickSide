import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';

import '../css/Header.css';

const Header = ({ title = "PickSide", minimal = false, quizzes, setFilteredQuizzes, language, toggleLanguage, t }) => {
  const [isSearchActive, setIsSearchActive] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    filterQuizzes(newSearchTerm);
  };

  const filterQuizzes = (term) => {
    if (!term) {
      setFilteredQuizzes(quizzes);
      return;
    }

    const filtered = quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(term.toLowerCase()) ||
      quiz.category.toLowerCase().includes(term.toLowerCase()) ||
      quiz.options.some(option => option.title.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredQuizzes(filtered);
  };

  const handleSearchBlur = () => {};

  return (
    <Navbar className="header-navbar" expand="lg">
      <Container className="header-container">
        <Navbar.Brand className={`header-title ${minimal ? 'header-title-center' : ''}`}>
          {title}
        </Navbar.Brand>
        {!minimal && (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
              <Nav className="header-links">
<Nav.Link as={Link} to="/"><HouseSidingIcon fontSize="small" /> {t('header.home')}</Nav.Link>
<Nav.Link as={Link} to="/categories"><CategoryIcon fontSize="small" /> {t('header.categories')}</Nav.Link>
      <Nav.Link as={Link} to="/popularity"><TrendingUpIcon fontSize="small" /> {t('header.popular')}</Nav.Link>

              </Nav>

              <div className="header-right">
                <div className="header-language">
                  <Button variant="outline-info" onClick={toggleLanguage} className="language-button">
                    {language?.toUpperCase()}
                  </Button>
                </div>
                <div className="header-search">
                  {!isSearchActive ? (
                    <SearchIcon fontSize="small" onClick={handleSearchClick} style={{ cursor: 'pointer' }} />
                  ) : (
                    <input
                      type="text"
                      placeholder={t('header.search')}
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                      onBlur={handleSearchBlur}
                      className="search-input"
                    />
                  )}
                </div>
              </div>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
