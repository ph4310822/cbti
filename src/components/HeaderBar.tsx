import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';

interface HeaderBarProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ showBack, onBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.left}
        onPress={() => Linking.openURL('https://cbti.one')}
        activeOpacity={0.7}
      >
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.domain}>cbti.one</Text>
      </TouchableOpacity>
      <View style={styles.right}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://x.com/cbti_1')}
          activeOpacity={0.7}
          style={styles.xButton}
        >
          <Text style={styles.xIcon}>𝕏</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  right: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 40,
    height: 40,
  },
  domain: {
    color: '#0066CC',
    fontSize: 22,
    fontWeight: '700',
  },
  xButton: {
    padding: 8,
  },
  xIcon: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  backButton: {
    padding: 6,
  },
  backText: {
    color: '#0066CC',
    fontSize: 24,
    fontWeight: '700',
  },
});
