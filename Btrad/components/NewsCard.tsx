import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface NewsCardProps {
  title: string;
  description: string;
  source: string;
  url: string;
  urlToImage?: string;
  onPress: () => void;
}

const NewsCard = ({ title, description, source, urlToImage, onPress }: NewsCardProps) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.saveButton}>
      <Text style={styles.saveButtonText}>Save</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        {urlToImage && (
          <Image source={{ uri: urlToImage }} style={styles.image} />
        )}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.description} numberOfLines={3}>{description}</Text>
          <Text style={styles.source}>{source}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#9B9B9B',
    fontSize: 14,
    marginBottom: 8,
  },
  source: {
    color: '#00FF9D',
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: '#00FF9D',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default NewsCard;