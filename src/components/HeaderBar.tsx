import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

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
        <Text style={styles.logoEmoji}>🪙</Text>
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
    backgroundColor: '#0D1117',
    borderBottomWidth: 1,
    borderBottomColor: '#30363D',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  right: {
    alignItems: 'flex-end',
  },
  logoEmoji: {
    fontSize: 24,
  },
  domain: {
    color: '#58A6FF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 4,
  },
  backText: {
    color: '#58A6FF',
    fontSize: 20,
    fontWeight: '600',
  },
});
