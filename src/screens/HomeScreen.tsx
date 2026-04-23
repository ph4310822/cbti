import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { HeaderBar } from '../components/HeaderBar';

const HOME_LOGO = require('../../assets/logo.png');

interface HomeScreenProps {
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.content}>
        {/* Logo / Title */}
        <View style={styles.header}>
          <Image source={HOME_LOGO} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>{t('home.title')}</Text>
          <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
          <Text style={styles.description}>
            {t('home.description')}
          </Text>
        </View>

        {/* Intro Cards */}
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>{t('home.introTitle')}</Text>
          <Text style={styles.introSubtitle}>{t('home.introSubtitle')}</Text>

          <View style={styles.dimensionsGrid}>
            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionEmoji}>⛓️</Text>
              <Text style={styles.dimensionName}>{t('home.dimensionChain')}</Text>
              <Text style={styles.dimensionDesc}>{t('home.dimensionChainDesc')}</Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionEmoji}>🎲</Text>
              <Text style={styles.dimensionName}>{t('home.dimensionRisk')}</Text>
              <Text style={styles.dimensionDesc}>{t('home.dimensionRiskDesc')}</Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionEmoji}>🔬</Text>
              <Text style={styles.dimensionName}>{t('home.dimensionDecision')}</Text>
              <Text style={styles.dimensionDesc}>{t('home.dimensionDecisionDesc')}</Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionEmoji}>🌐</Text>
              <Text style={styles.dimensionName}>{t('home.dimensionHabit')}</Text>
              <Text style={styles.dimensionDesc}>{t('home.dimensionHabitDesc')}</Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={onStart}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>{t('home.startButton')}</Text>
        </TouchableOpacity>

        {/* X Follow Button */}
        <TouchableOpacity
          style={styles.xButton}
          onPress={() => Linking.openURL('https://x.com/cbti_1')}
          activeOpacity={0.8}
        >
          <Text style={styles.xIcon}>𝕏</Text>
          <Text style={styles.xButtonText}>{t('home.followUs')}</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>{t('home.footer')}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: '#1D1D1F',
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 8,
  },
  subtitle: {
    color: '#0066CC',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    color: '#6E6E73',
    fontSize: 16,
  },
  introContainer: {
    width: '100%',
    marginBottom: 48,
  },
  introTitle: {
    color: '#1D1D1F',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  introSubtitle: {
    color: '#6E6E73',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  dimensionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  dimensionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  dimensionEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  dimensionName: {
    color: '#1D1D1F',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  dimensionDesc: {
    color: '#6E6E73',
    fontSize: 11,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    color: '#86868B',
    fontSize: 14,
  },
  xButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  xIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  xButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
