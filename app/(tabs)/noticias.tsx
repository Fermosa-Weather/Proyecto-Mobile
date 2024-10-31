import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from 'react-native';

interface Article {
  title: string;
  description: string;
  image?: string;
  url: string;
}

interface NewsWidgetProps {
  searchTerm?: string;
}

const Noticias: React.FC<NewsWidgetProps> = ({ searchTerm = '' }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/noticia/all')
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos:', data); // Log para verificar la respuesta
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error('Se esperaba un arreglo pero se obtuvo:', data);
          setArticles([]); // Establecer a un arreglo vacío si no es válido
        }
      })
      .catch(error => {
        console.error('Error al obtener los artículos:', error);
        setArticles([]); // Establecer a un arreglo vacío en caso de error
      });
  }, []);

  const filteredNews = Array.isArray(articles) ? articles.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const handleShowModal = (index: number) => {
    setCurrentNewsIndex(index);
    setShowModal(true);
  };

  const renderItem = ({ item, index }: { item: Article; index: number }) => (
    <TouchableOpacity
      key={index}
      style={styles.newsCard}
      onPress={() => handleShowModal(index)}
    >
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/150' }}
        style={styles.newsImage}
        onError={() => {}} // Fallback logic handled via the default image
      />
      <View style={styles.newsContent}>
        <Text style={styles.newsCardTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.newsWidget}>
      <Text style={styles.newsTitle}>Noticias sobre el Clima en Formosa</Text>
      <FlatList
        data={filteredNews}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.newsGrid}
      />

      {showModal && currentNewsIndex !== null && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {filteredNews[currentNewsIndex].title}
              </Text>
              <View style={styles.modalBody}>
                <Text>{filteredNews[currentNewsIndex].description}</Text>
              </View>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setShowModal(false)}
              >
                <Text style={{ color: 'white' }}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  newsWidget: {
    backgroundColor: '#6a1b9a',
    padding: 20,
    borderRadius: 10,
    minHeight: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  newsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  newsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  newsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  newsImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  newsContent: {
    padding: 10,
    backgroundColor: '#f3e5f5',
  },
  newsCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a148c',
    marginBottom: 5,
  },
  newsDescription: {
    color: '#424242',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f3e5f5',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 600,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  modalBody: {
    paddingVertical: 10,
  },
  modalClose: {
    backgroundColor: '#1e88e5',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Noticias;
