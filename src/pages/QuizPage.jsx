import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import quizListEn from '../quizList.json'; // İngilizce liste
import quizListTr from '../quizListe.json'; // Türkçe liste
import '../css/QuizPage.css';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Loading from '../components/Loading'; // Loading component'ini içeri aktar

const QuizPage = ({ language }) => { // language prop'unu alın
  const { id } = useParams();
  const navigate = useNavigate();
  const quizEn = quizListEn.find(q => q.id === id);
  const quizTr = quizListTr.find(q => q.id === id);
  const quiz = language === 'tr' ? quizTr : quizEn; // Seçilen dile göre quiz'i belirle

  const [round, setRound] = useState(0);
  const [pairs, setPairs] = useState([]);
  const [winners, setWinners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchNumber, setMatchNumber] = useState(1);
  const [matchesInThisRound, setMatchesInThisRound] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true); // Başlangıçta true

  useEffect(() => {
    if (!quiz) {
      setLoading(false); // Quiz bulunamazsa loading'i kapat
      return;
    }

    const shuffled = [...quiz.options].sort(() => Math.random() - 0.5);
    const initialPairs = [];

    for (let i = 0; i < shuffled.length; i += 2) {
      initialPairs.push([shuffled[i], shuffled[i + 1]]);
    }

    setPairs(initialPairs);
    setMatchesInThisRound(initialPairs.length);
    setRound(shuffled.length);
    setLoading(false); // Veriler işlendikten sonra loading'i kapat
  }, [quiz]);

  const handleSelect = (selected) => {
    if (selectedItem) return;

    const index = pairs[currentIndex].findIndex(item => item.title === selected.title);
    setSelectedItem(selected);
    setSelectedIndex(index);

    setTimeout(() => {
      const updatedWinners = [...winners, selected];

      if (currentIndex + 1 < pairs.length) {
        setWinners(updatedWinners);
        setCurrentIndex(currentIndex + 1);
        setMatchNumber(matchNumber + 1);
      } else if (updatedWinners.length === 1) {
        navigate('/winner', { state: { winner: updatedWinners[0] } });
      } else {
        const nextRoundPairs = [];
        for (let i = 0; i < updatedWinners.length; i += 2) {
          nextRoundPairs.push([updatedWinners[i], updatedWinners[i + 1]]);
        }
        setPairs(nextRoundPairs);
        setWinners([]);
        setCurrentIndex(0);
        setRound(updatedWinners.length);
        setMatchNumber(1);
        setMatchesInThisRound(nextRoundPairs.length);
      }

      setSelectedItem(null);
      setSelectedIndex(null);
    }, 1000);
  };

  if (!quiz) return <div>Quiz bulunamadı</div>;

  if (loading) {
    return (
      <div className='quiz-page'>
        <Header title={quiz?.title || "PickSide"} minimal />
        <Button onClick={() => navigate('/')} className="exitButton">Exit</Button>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <Loading />
        </div>
      </div>
    );
  }

  const currentPair = pairs[currentIndex];
  const roundText = round > 0 ? `Round of ${round} • ${matchNumber}/${matchesInThisRound}` : '';

  return (
    <div className='quiz-page'>
      <Header title={quiz?.title || "PickSide"} minimal />
      <Button onClick={() => navigate('/')} className="exitButton">Exit</Button>

      <div className='vs-div'><img src="/vs4.png" alt="vs" /></div>

      {roundText && (
        <div className='title-tour'>
          <h5 className="round-text mt-4">{roundText}</h5>
        </div>
      )}

      <div className="background-wrapper">
        {currentPair && (
          <>
            <div
              className="bg-half left-blur"
              style={{ backgroundImage: `url(${currentPair[0]?.image})` }}
            />
            <div
              className="bg-half right-blur"
              style={{ backgroundImage: `url(${currentPair[1]?.image})` }}
            />
            <div className="vertical-line" />
          </>
        )}
      </div>

      <div className="rounded-pairs">
        {currentPair?.map((item, idx) => (
          <Card
            key={idx}
            item={item}
            onClick={() => handleSelect(item)}
            isSelected={selectedItem?.title === item.title}
            isFaded={selectedItem && selectedItem?.title !== item.title}
            selectedPosition={selectedIndex === 0 ? 'left' : 'right'}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};

const Card = ({ item, onClick, isSelected, isFaded, selectedPosition, index }) => {
  const getAnimationClass = () => {
    if (isSelected) {
      return selectedPosition === 'left' ? 'selected-left' : 'selected-right';
    }
    if (isFaded) return 'faded';
    return '';
  };

  return (
    <div className={`option-wrapper ${getAnimationClass()}`} onClick={onClick}>
      <div className="option-card">
        <img src={item.image || "/images/default.jpg"} alt={item.title} />
        <h5 className="option-title">{item.title}</h5>
      </div>
    </div>
  );
};

export default QuizPage;