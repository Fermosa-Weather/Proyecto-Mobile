import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Article {
  title: string;
  description: string;
  image?: string;
  url: string;
}

interface NewsWidgetProps {
  searchTerm?: string;
}

export default function Component({ searchTerm = '' }: NewsWidgetProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNewsIndex, setCurrentNewsIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]);
        }
      })
      .catch(() => {
        setArticles([]);
      });
  }, []);

  const filteredNews = articles.filter(news =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowModal = (index: number) => {
    setCurrentNewsIndex(index);
    setShowModal(true);
  };

  const renderItem = ({ item, index }: { item: Article; index: number }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => handleShowModal(index)}
    >
      <Image
        source={{ uri: item.image || 'https://via.placeholder.com/150' }}
        style={styles.newsImage}
        onError={() => {}} // Handle error with a placeholder
      />
      <View style={styles.newsContent}>
        <Text style={styles.newsCardTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#1a237e', '#4a148c']}
      style={styles.gradientBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.newsWidget}>
          <Text style={styles.newsTitle}>Noticias sobre el Tiempo en Formosa</Text>
          <FlatList
            data={filteredNews}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.newsGrid}
            numColumns={2}
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
                    <Text style={styles.closeText}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  newsWidget: {
    padding: 20,
    minHeight: Dimensions.get('window').height * 0.6,
  },
  newsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    padding: 15,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  newsGrid: {
    paddingBottom: 20,
  },
  newsCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 5,
    flex: 1,
    maxWidth: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'column',
  },
  newsImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  newsContent: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f3e5f5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a1b9a',
  },
  modalBody: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  modalClose: {
    backgroundColor: '#1976d2',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
});