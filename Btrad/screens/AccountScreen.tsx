import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Feather name="chevron-left" size={28} color="#00FF9D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
          <View style={{ width: 28 }} /> {/* Spacer for alignment */}
        </View>
        
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>U</Text>
          </View>
          <Text style={styles.profileName}>Mr Eshantha Jayathilleke</Text>
          <Text style={styles.profileEmail}>eshanthajayathilleke@bartleetit.com</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        
        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <SettingOption 
            icon={<MaterialCommunityIcons name="shield-account" size={24} color="#00FF9D" />}
            title="Security"
            onPress={() => console.log("Security pressed")}
          />
          
          <SettingOption 
            icon={<Ionicons name="notifications-outline" size={24} color="#00FF9D" />}
            title="Notifications"
            onPress={() => console.log("Notifications pressed")}
          />
          
          <SettingOption 
            icon={<Feather name="credit-card" size={24} color="#00FF9D" />}
            title="Payment Methods"
            onPress={() => console.log("Payment pressed")}
          />
          
          <SettingOption 
            icon={<MaterialCommunityIcons name="theme-light-dark" size={24} color="#00FF9D" />}
            title="Dark Mode"
            rightText="On"
            onPress={() => console.log("Theme pressed")}
          />
        </View>
        
        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <SettingOption 
            icon={<Feather name="help-circle" size={24} color="#00FF9D" />}
            title="Help Center"
            onPress={() => console.log("Help pressed")}
          />
          
          <SettingOption 
            icon={<MaterialCommunityIcons name="email-outline" size={24} color="#00FF9D" />}
            title="Contact Us"
            onPress={() => console.log("Contact pressed")}
          />
          
          <SettingOption 
            icon={<MaterialCommunityIcons name="file-document-outline" size={24} color="#00FF9D" />}
            title="Terms & Privacy"
            onPress={() => console.log("Terms pressed")}
          />
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const SettingOption = ({ icon, title, rightText, onPress }: any) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingLeft}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.settingText}>{title}</Text>
    </View>
    <View style={styles.settingRight}>
      {rightText && <Text style={styles.rightText}>{rightText}</Text>}
      <Feather name="chevron-right" size={20} color="#9B9B9B" />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00FF9D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    color: '#000',
    fontSize: 42,
    fontWeight: 'bold',
  },
  profileName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    color: '#9B9B9B',
    fontSize: 16,
    marginBottom: 16,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#00FF9D',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  editProfileText: {
    color: '#00FF9D',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
  },
  settingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    color: '#9B9B9B',
    fontSize: 14,
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 40,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
  },
});