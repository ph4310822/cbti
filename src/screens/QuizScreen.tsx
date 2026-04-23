import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Question } from '../data/questions';
import { Result } from '../data/questions';
import { HeaderBar } from '../components/HeaderBar';

interface QuizScreenProps {
  questions: Question[];
  onComplete: (result: Result) => void;
  onBack: () => void;
}

const DIMENSION_KEYS: Record<string, 'quiz.dimensionChain' | 'quiz.dimensionRisk' | 'quiz.dimensionDecision' | 'quiz.dimensionHabit'> = {
  chain: 'quiz.dimensionChain',
  risk: 'quiz.dimensionRisk',
  decision: 'quiz.dimensionDecision',
  habit: 'quiz.dimensionHabit',
};

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onComplete, onBack }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex + 1) / questions.length;
  const dimensionKey = DIMENSION_KEYS[currentQuestion.dimension];

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      import('../utils/calculator').then(({ calculateResult }) => {
        const result = calculateResult(newAnswers);
        onComplete(result);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack onBack={onBack} />
      <View style={styles.innerContainer}>
        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {t('quiz.progress', { current: currentIndex + 1, total: questions.length })}
          </Text>
        </View>

        {/* Dimension Badge */}
        <View style={styles.dimensionBadge}>
          <Text style={styles.dimensionText}>
            {t('quiz.dimension', { number: Math.floor(currentIndex / 2) + 1, label: t(dimensionKey) })}
          </Text>
        </View>

        {/* Question */}
        <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.questionText}>{t(`questions.q${currentIndex + 1}`)}</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.optionKeys.map((key, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleSelect(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{t(key)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0066CC',
    borderRadius: 2,
  },
  progressText: {
    color: '#6E6E73',
    fontSize: 14,
    marginLeft: 12,
    fontWeight: '500',
  },
  dimensionBadge: {
    backgroundColor: '#E8E8ED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  dimensionText: {
    color: '#0066CC',
    fontSize: 14,
    fontWeight: '600',
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    color: '#1D1D1F',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  optionText: {
    color: '#1D1D1F',
    fontSize: 16,
    lineHeight: 24,
  },
});
