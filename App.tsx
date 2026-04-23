import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { QUESTIONS } from './src/data/questions';
import { Result } from './src/data/questions';

type Screen = 'home' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [result, setResult] = useState<Result | null>(null);

  const handleStart = () => {
    setScreen('quiz');
  };

  const handleComplete = (calculatedResult: Result) => {
    setResult(calculatedResult);
    setScreen('result');
  };

  const handleRestart = () => {
    setResult(null);
    setScreen('home');
  };

  return (
    <>
      <StatusBar style="light" />
      {screen === 'home' && <HomeScreen onStart={handleStart} />}
      {screen === 'quiz' && <QuizScreen questions={QUESTIONS} onComplete={handleComplete} onBack={handleRestart} />}
      {screen === 'result' && result && <ResultScreen result={result} onRestart={handleRestart} />}
    </>
  );
}