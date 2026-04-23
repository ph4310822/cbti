import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { HeaderBar } from '../components/HeaderBar';

const HOME_LOGO = require('../../assets/logo.png');

interface HomeScreenProps {
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar />
      <View style={styles.content}>
        {/* Logo / Title */}
        <View style={styles.header}>
          <Image source={HOME_LOGO} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>CBTI</Text>
          <Text style={styles.subtitle}>Crypto MBTI</Text>
          <Text style={styles.description}>
            发现你的币圈人格类型
          </Text>
        </View>

        {/* Intro Cards */}
        <View style={styles.introContainer}>
          <Text style={styles.introTitle}>测试包含 8 道场景题</Text>
          <Text style={styles.introSubtitle}>涵盖四个核心维度</Text>

          <View style={styles.dimensionsGrid}>
            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionEmoji}>⛓️</Text>
              <Text style={styles.dimensionName}>公链信仰</Text>
              <Text style={styles.dimensionDesc}>EVM / Solana / Bitcoin / Tron</Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionEmoji}>🎲</Text>
              <Text style={styles.dimensionName}>风险偏好</Text>
              <Text style={styles.dimensionDesc}>Degen / Hodler</Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionEmoji}>🔬</Text>
              <Text style={styles.dimensionName}>决策依据</Text>
              <Text style={styles.dimensionDesc}>Researcher / Fomo</Text>
            </View>

            <View style={styles.dimensionCard}>
              <Text style={styles.dimensionEmoji}>🌐</Text>
              <Text style={styles.dimensionName}>交互习惯</Text>
              <Text style={styles.dimensionDesc}>Native / CEXer</Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={onStart}
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>开始测试</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>约 3 分钟完成</Text>
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
});