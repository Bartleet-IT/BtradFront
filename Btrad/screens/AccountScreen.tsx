import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>
        
        <View style={styles.profileContainer}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>U</Text>
          </View>
          <Text style={styles.profileName}>User Name</Text>
          <Text style={styles.profileEmail}>user@example.com</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {/* Settings options would go here */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    paddingTop: 32,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00FF9D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    color: '#000',
    fontSize: 36,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    color: '#9B9B9B',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
});