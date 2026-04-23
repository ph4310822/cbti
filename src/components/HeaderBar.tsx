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
        {showBack && onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
        ) : null}
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
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  right: {
    alignItems: 'flex-end',
  },
  logo: {
    width: 28,
    height: 28,
  },
  domain: {
    color: '#0066CC',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 4,
  },
  backText: {
    color: '#0066CC',
    fontSize: 20,
    fontWeight: '600',
  },
});
