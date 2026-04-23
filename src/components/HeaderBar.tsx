import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, LANGUAGE_NAMES } from '../i18n/index';

const LANGUAGE_FLAGS: Record<string, string> = {
  zh: '🇨🇳',
  en: '🇺🇸',
  ko: '🇰🇷',
  ja: '🇯🇵',
  vi: '🇻🇳',
  ar: '🇸🇦',
  ru: '🇷🇺',
  es: '🇪🇸',
  pt: '🇧🇷',
};

interface HeaderBarProps {
  showBack?: boolean;
  onBack?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ showBack, onBack }) => {
  const { i18n } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const selectLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  return (
    <>
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
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
            style={styles.langButton}
          >
            <Text style={styles.langText}>🌐 {LANGUAGE_NAMES[i18n.language] ?? 'EN'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.dialog} onPress={(e) => e.stopPropagation()}>
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>🌐 Select Language</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} activeOpacity={0.7}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            {LANGUAGES.map((lang) => {
              const isSelected = i18n.language === lang;
              return (
                <TouchableOpacity
                  key={lang}
                  style={[styles.langItem, isSelected && styles.langItemSelected]}
                  onPress={() => selectLanguage(lang)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.langFlag}>{LANGUAGE_FLAGS[lang]}</Text>
                  <Text style={[styles.langName, isSelected && styles.langNameSelected]}>
                    {LANGUAGE_NAMES[lang]}
                  </Text>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
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
  langButton: {
    padding: 8,
    marginRight: 4,
  },
  langText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0066CC',
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dialog: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 320,
  },
  dialogHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D1D1F',
  },
  closeButton: {
    fontSize: 20,
    color: '#86868B',
    padding: 4,
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  langItemSelected: {
    backgroundColor: '#0066CC15',
  },
  langFlag: {
    fontSize: 22,
    marginRight: 14,
  },
  langName: {
    fontSize: 16,
    color: '#1D1D1F',
    flex: 1,
  },
  langNameSelected: {
    color: '#0066CC',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '700',
  },
});
