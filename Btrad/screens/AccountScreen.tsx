import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

export default function AccountScreen() {
  const navigation = useNavigation();

const handleNavigation = (screen: string): void => {
    Alert.alert(
        "Navigate",
        `Go to ${screen}?`,
        [
            { text: "Cancel", style: "cancel" },
            { text: "OK", onPress: () => navigation.navigate(screen as never) }
        ]
    );
};

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => console.log("User Logged Out") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={28} color="#00FF9D" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Account</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>U</Text>
          </View>
          <Text style={styles.profileName}>Mr Sujeewa Peiris</Text>
          <Text style={styles.profileEmail}>sujeewapeiris@bartleetit.com</Text>
          <TouchableOpacity style={styles.editProfileButton} onPress={() => handleNavigation('EditProfile')}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Section */}
        <SettingsSection title="Account Settings" options={[
          { icon: "shield-account", title: "Security", screen: "Security" },
          { icon: "bell-outline", title: "Notifications", screen: "Notifications" },
          { icon: "credit-card", title: "Payment Methods", screen: "Payments" },
          { icon: "theme-light-dark", title: "Dark Mode", screen: "Theme", rightText: "On" }
        ]} handleNavigation={handleNavigation} />

        {/* Support Section */}
        <SettingsSection title="Support" options={[
          { icon: "help-circle", title: "Help Center", screen: "Help" },
          { icon: "email-outline", title: "Contact Us", screen: "Contact" },
          { icon: "file-document-outline", title: "Terms & Privacy", screen: "Terms" }
        ]} handleNavigation={handleNavigation} />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

interface SettingsSectionProps {
  title: string;
  options: { icon: "shield-account" | "bell-outline" | "credit-card" | "theme-light-dark" | "help-circle" | "email-outline" | "file-document-outline"; title: string; screen: string; rightText?: string }[];
  handleNavigation: (screen: string) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, options, handleNavigation }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {options.map(({ icon, title, screen, rightText }, index) => (
      <TouchableOpacity key={index} style={styles.settingItem} onPress={() => handleNavigation(screen)}>
        <View style={styles.settingLeft}>
          <MaterialCommunityIcons name={icon} size={24} color="#FFD700" />
          <Text style={styles.settingText}>{title}</Text>
        </View>
        <View style={styles.settingRight}>
          {rightText && <Text style={styles.rightText}>{rightText}</Text>}
          <Feather name="chevron-right" size={20} color="#9B9B9B" />
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: 32 },
  backButton: { padding: 4 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  profileContainer: { alignItems: 'center', marginVertical: 24, paddingHorizontal: 16 },
  profileIcon: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFD700', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  profileInitial: { color: '#000', fontSize: 42, fontWeight: 'bold' },
  profileName: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  profileEmail: { color: '#9B9B9B', fontSize: 16, marginBottom: 16 },
  editProfileButton: { borderWidth: 1, borderColor: '#FFD700', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 24 },
  editProfileText: { color: '#FFD700', fontSize: 14, fontWeight: '500' },
  section: { marginBottom: 24, backgroundColor: '#1C1C1C', borderRadius: 12, marginHorizontal: 16, paddingVertical: 8 },
  sectionTitle: { color: '#9B9B9B', fontSize: 14, fontWeight: '500', marginLeft: 16, marginBottom: 8, marginTop: 12 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#2A2A2A' },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  settingText: { color: '#fff', fontSize: 16, marginLeft: 12 },
  settingRight: { flexDirection: 'row', alignItems: 'center' },
  rightText: { color: '#9B9B9B', fontSize: 14, marginRight: 8 },
  logoutButton: { backgroundColor: '#2A2A2A', borderRadius: 12, padding: 16, marginHorizontal: 16, marginTop: 24, marginBottom: 40, alignItems: 'center' },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold' }
});
