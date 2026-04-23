import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Question } from '../data/questions';
import { Result } from '../data/questions';

interface QuizScreenProps {
  questions: Question[];
  onComplete: (result: Result) => void;
}

const { width } = Dimensions.get('window');

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQuestion = questions[currentIndex];
  const progress = (currentIndex + 1) / questions.length;

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All questions answered, calculate result
      import('../utils/calculator').then(({ calculateResult }) => {
        const result = calculateResult(newAnswers);
        onComplete(result);
      });
    }
  };

  const getDimensionLabel = (dimension: string) => {
    const labels: Record<string, string> = {
      chain: '公链信仰',
      risk: '风险偏好',
      decision: '决策风格',
      habit: '交互习惯',
    };
    return labels[dimension] || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{currentIndex + 1} / {questions.length}</Text>
      </View>

      {/* Dimension Badge */}
      <View style={styles.dimensionBadge}>
        <Text style={styles.dimensionText}>
          维度 {Math.floor(currentIndex / 2) + 1}：{getDimensionLabel(currentQuestion.dimension)}
        </Text>
      </View>

      {/* Question */}
      <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleSelect(index)}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option.label}</Text>
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
    backgroundColor: '#0D1117',
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
    backgroundColor: '#21262D',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58A6FF',
    borderRadius: 2,
  },
  progressText: {
    color: '#8B949E',
    fontSize: 14,
    marginLeft: 12,
    fontWeight: '500',
  },
  dimensionBadge: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  dimensionText: {
    color: '#58A6FF',
    fontSize: 14,
    fontWeight: '600',
  },
  questionContainer: {
    flex: 1,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 30,
    marginBottom: 32,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  optionText: {
    color: '#E6EDF3',
    fontSize: 16,
    lineHeight: 24,
  },
});