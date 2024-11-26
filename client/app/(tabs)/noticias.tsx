import React, { useState, useEffect } from 'react';
import { NewsItem } from '../../types/news';
import NewsCard from '../../components/NewsCard.tsx';
import Modal from '../../components/Modal.tsx';
import styles from '../../styles/NewsWidget.module.css';

interface NewsWidgetProps {
  searchTerm?: string;
}

const NewsWidget: React.FC<NewsWidgetProps> = ({ searchTerm = '' }) => {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/noticia/all');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = articles.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (index: number) => {
    setCurrentNewsIndex(index);
    setShowModal(true);
  };

  return (
    <div className={styles.newsWidget}>
      <h2 className={styles.newsTitle}>Noticias sobre el Tiempo en Formosa</h2>
      <div className={styles.newsGrid}>
        {filteredNews.map((item, index) => (
          <NewsCard
            key={index}
            news={item}
            onClick={() => handleShowModal(index)}
          />
        ))}
      </div>

      {showModal && currentNewsIndex !== null && (
        <Modal
          title={filteredNews[currentNewsIndex].title}
          onClose={() => setShowModal(false)}
        >
          {/* Replace with your Comentario component */}
          <div>Comentario component goes here</div>
        </Modal>
      )}
    </div>
  );
};

export default NewsWidget;

