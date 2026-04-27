import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Clipboard } from 'react-native';

const PERSONA_PORTRAITS: Record<string, ImageSourcePropType> = {
  'EDFC': require('../../assets/portraits/E-D-F-C.png'),
  'EDFN': require('../../assets/portraits/E-D-F-N.jpg'),
  'EDRC': require('../../assets/portraits/E-D-R-C.jpg'),
  'EDRN': require('../../assets/portraits/E-D-R-N.png'),
  'EHFC': require('../../assets/portraits/E-H-F-C.jpg'),
  'EHFN': require('../../assets/portraits/E-H-F-N.png'),
  'EHRC': require('../../assets/portraits/E-H-R-C.jpg'),
  'EHRN': require('../../assets/portraits/E-H-R-N.jpg'),
  'SDFC': require('../../assets/portraits/S-D-F-C.jpg'),
  'SDFN': require('../../assets/portraits/S-D-F-N.jpg'),
  'SDRC': require('../../assets/portraits/S-D-R-C.png'),
  'SDRN': require('../../assets/portraits/S-D-R-N.jpg'),
  'SHFC': require('../../assets/portraits/S-H-F-C.png'),
  'SHFN': require('../../assets/portraits/S-H-F-N.jpeg'),
  'SHRC': require('../../assets/portraits/S-H-R-C.png'),
  'SHRN': require('../../assets/portraits/S-H-R-N.jpg'),
  'BDFC': require('../../assets/portraits/B-D-F-C.jpg'),
  'BDFN': require('../../assets/portraits/B-D-F-N.jpg'),
  'BDRC': require('../../assets/portraits/B-D-R-C.jpg'),
  'BDRN': require('../../assets/portraits/B-D-R-N.jpg'),
  'BHFC': require('../../assets/portraits/B-H-F-C.jpg'),
  'BHFN': require('../../assets/portraits/B-H-F-N.jpg'),
  'BHRC': require('../../assets/portraits/B-H-R-C.jpg'),
  'BHRN': require('../../assets/portraits/B-H-R-N.webp'),
  'NDFC': require('../../assets/portraits/N-D-F-C.jpeg'),
  'NDFN': require('../../assets/portraits/N-D-F-N.jpg'),
  'NDRC': require('../../assets/portraits/N-D-R-C.jpg'),
  'NDRN': require('../../assets/portraits/N-D-R-N.png'),
  'NHFC': require('../../assets/portraits/N-H-F-C.png'),
  'NHFN': require('../../assets/portraits/N-H-F-N.jpg'),
  'NHRC': require('../../assets/portraits/N-H-R-C.jpg'),
  'NHRN': require('../../assets/portraits/N-H-R-N.jpg'),
};

const PERSONA_IMAGES: ImageSourcePropType[] = [
  require('../../assets/1.png'),
  require('../../assets/2.png'),
  require('../../assets/3.png'),
  require('../../assets/4.png'),
  require('../../assets/5.png'),
  require('../../assets/6.png'),
  require('../../assets/7.png'),
  require('../../assets/8.png'),
  require('../../assets/9.png'),
  require('../../assets/10.png'),
  require('../../assets/11.png'),
  require('../../assets/12.png'),
  require('../../assets/13.png'),
  require('../../assets/14.png'),
  require('../../assets/15.png'),
  require('../../assets/16.png'),
  require('../../assets/17.png'),
  require('../../assets/18.png'),
  require('../../assets/19.png'),
  require('../../assets/20.png'),
  require('../../assets/21.png'),
  require('../../assets/22.png'),
  require('../../assets/23.png'),
  require('../../assets/24.png'),
  require('../../assets/25.png'),
  require('../../assets/26.png'),
  require('../../assets/27.png'),
  require('../../assets/28.png'),
  require('../../assets/29.png'),
  require('../../assets/30.png'),
  require('../../assets/31.png'),
  require('../../assets/32.png'),
];
import { Result, CHAIN_INFO } from '../data/questions';
import { HeaderBar } from '../components/HeaderBar';
import { Linking } from 'react-native';

interface ResultScreenProps {
  result: Result;
  onRestart: () => void;
}

const getChainColor = (chain: string) => {
  const colors: Record<string, string> = {
    E: '#627EEA',
    S: '#9945FF',
    B: '#F7931A',
    N: '#F3BA2F',
  };
  return colors[chain] || '#58A6FF';
};

export const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  const { t } = useTranslation();
  const chainColor = getChainColor(result.chain);
  const chainInfo = CHAIN_INFO[result.chain];
  const [showToast, setShowToast] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

  useEffect(() => {
    setShowPromotion(true);
  }, []);

  const dimensionLabels = {
    risk: result.risk === 'D' ? t('result.riskDegen') : t('result.riskHodler'),
    decision: result.decision === 'R' ? t('result.decisionResearcher') : t('result.decisionFomo'),
    habit: result.habit === 'N' ? t('result.habitNative') : t('result.habitCEX'),
  };

  const dimensionChainLabel = t('result.dimensionChain');

  const handleShare = async () => {
    const shareText = t('result.shareText', {
      type: `${result.chain}${result.risk}${result.decision}${result.habit}`,
      title: t(result.titleKey),
    });

    Clipboard.setString(shareText);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleFollowUs = () => {
    Linking.openURL('https://x.com/cbti_1');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack onBack={onRestart} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={PERSONA_IMAGES[result.imageIndex - 1]}
            style={styles.personalityImage}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>{t('result.headerTitle')}</Text>
          <View style={[styles.resultBadge]} />
          <Text style={[styles.resultType, { color: '#000000' }]}>
            {result.chain}{result.risk}{result.decision}{result.habit}
          </Text>
          <Text style={[styles.chainName, { color: chainColor }]}>
            {t(result.titleKey)}
          </Text>
        </View>

        {/* Title & Description */}
        <View style={[styles.card, { borderLeftColor: chainColor }]}>
          <Text style={styles.title}>{chainInfo.name} · {t(chainInfo.descriptionKey)}</Text>
          <Text style={styles.description}>{t(result.descriptionKey)}</Text>
        </View>

        {/* Character Section */}
        <View style={[styles.characterCard, { borderColor: chainColor }]}>
          
          <View style={[styles.characterDot, { backgroundColor: chainColor }]} />
          <Text style={styles.characterLabel}>{t('result.characterFigure')}</Text>
<Image
            source={PERSONA_PORTRAITS[`${result.chain}${result.risk}${result.decision}${result.habit}`]}
            style={styles.characterPortrait}
            resizeMode="contain"
          />
          <Text style={styles.characterName}>{t(result.figureKey)}</Text>
          <Text style={styles.characterDesc}>{t(result.fullDescKey)}</Text>
        </View>

        {/* Tagline */}
        <View style={styles.taglineContainer}>
          <Text style={styles.taglineText}>{t(result.taglineKey)}</Text>
        </View>

        {/* Dimension Breakdown */}
        <View style={styles.dimensionsContainer}>
          <Text style={styles.sectionTitle}>{t('result.dimensionBreakdown')}</Text>

          <View style={styles.dimensionItem}>
            <View style={[styles.dot, { backgroundColor: '#627EEA' }]} />
            <Text style={styles.dimensionLabel}>{dimensionChainLabel}</Text>
            <Text style={styles.dimensionValue}>{result.chain} - {chainInfo.fullName}</Text>
          </View>

          <View style={styles.dimensionItem}>
            <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
            <Text style={styles.dimensionLabel}>{t('result.dimensionRisk')}</Text>
            <Text style={styles.dimensionValue}>{dimensionLabels.risk}</Text>
          </View>

          <View style={styles.dimensionItem}>
            <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.dimensionLabel}>{t('result.dimensionDecision')}</Text>
            <Text style={styles.dimensionValue}>{dimensionLabels.decision}</Text>
          </View>

          <View style={styles.dimensionItem}>
            <View style={[styles.dot, { backgroundColor: '#EC4899' }]} />
            <Text style={styles.dimensionLabel}>{t('result.dimensionHabit')}</Text>
            <Text style={styles.dimensionValue}>{dimensionLabels.habit}</Text>
          </View>
        </View>

        {/* Advice */}
        <View style={styles.adviceContainer}>
          <Text style={styles.adviceTitle}>{t('result.advice')}</Text>
          <Text style={styles.adviceText}>{t(result.adviceKey)}</Text>
        </View>

        {/* Share & Restart */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.shareButton]}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Text style={styles.shareButtonText}>{t('result.shareButton')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.restartButton]}
            onPress={onRestart}
            activeOpacity={0.8}
          >
            <Text style={styles.restartButtonText}>{t('result.restartButton')}</Text>
          </TouchableOpacity>
        </View>

        {/* Follow Us */}
        <TouchableOpacity
          style={styles.followUsButton}
          onPress={handleFollowUs}
          activeOpacity={0.8}
        >
          <Text style={styles.followUsButtonText}>Follow Us</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Toast */}
      {showToast && (
        <View style={styles.toastContainer}>
          <View style={styles.toast}>
            <Text style={styles.toastText}>{t('result.copiedToast')}</Text>
          </View>
        </View>
      )}

      {/* Promotion Modal */}
      <Modal
        visible={showPromotion}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPromotion(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowPromotion(false)}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalEmoji}>🪂</Text>
            <Text style={styles.modalTitle}>{t('result.promotionTitle')}</Text>
            <Text style={styles.modalText}>{t('result.promotionText')}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowPromotion(false);
              }}
            >
              <Text style={styles.modalButtonText}>{t('result.promotionButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalRemindMe}
              onPress={() => setShowPromotion(false)}
            >
              <Text style={styles.modalRemindMeText}>{t('result.promotionLater')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 8,
  },
  personalityImage: {
    width: 160,
    height: 160,
    marginBottom: 16,
  },
  headerTitle: {
    color: '#6E6E73',
    fontSize: 16,
    marginBottom: 16,
  },
  resultBadge: {},
  resultType: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 2,
    color: '#1D1D1F',
  },
  chainName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1D1D1F',
  },
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    marginBottom: 24,
  },
  characterCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    alignItems: 'center',
  },
  characterPortrait: {
    width: 120,
    height: 120,
    marginTop: 12,
    marginBottom: 6,
    borderRadius: 60,
  },
  characterDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 12,
  },
  characterLabel: {
    color: '#6E6E73',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  characterName: {
    color: '#1D1D1F',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  characterDesc: {
    color: '#6E6E73',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  title: {
    color: '#1D1D1F',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#6E6E73',
    fontSize: 16,
    lineHeight: 24,
  },
  taglineContainer: {
    backgroundColor: '#FAFAFA',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  taglineText: {
    color: '#0066CC',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  dimensionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#1D1D1F',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  dimensionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  dimensionLabel: {
    color: '#6E6E73',
    fontSize: 14,
    width: 80,
  },
  dimensionValue: {
    color: '#1D1D1F',
    fontSize: 14,
    fontWeight: '500',
  },
  adviceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
  },
  adviceTitle: {
    color: '#1D1D1F',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  adviceText: {
    color: '#6E6E73',
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#34C759',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  restartButton: {
    backgroundColor: '#E5E5EA',
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  restartButtonText: {
    color: '#1D1D1F',
    fontSize: 16,
    fontWeight: '600',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  followUsButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  followUsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    margin: 24,
    alignItems: 'center',
    width: '85%',
  },
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: 20,
    color: '#8E8E93',
    lineHeight: 22,
  },
  modalEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1D1D1F',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#6E6E73',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  modalButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalRemindMe: {
    paddingVertical: 8,
  },
  modalRemindMeText: {
    color: '#8E8E93',
    fontSize: 14,
  },
});
