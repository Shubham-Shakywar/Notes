import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
  ActivityIndicator,
} from 'react-native';

const { SpeechModule } = NativeModules;

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  const handleStart = async () => {
    try {
      setError('');
      setTranscript('');
      setIsListening(true);

      // This opens the Android speech dialog.
      // It resolves when the user finishes speaking (acting as "stop").
      const result = await SpeechModule.startSpeech();
      setTranscript(result);
    } catch (e: any) {
      setError(e?.message || 'Speech recognition failed');
    } finally {
      setIsListening(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech to Text</Text>

      <View style={styles.resultBox}>
        {isListening ? (
          <View style={styles.listeningRow}>
            <ActivityIndicator size="small" color="#6200ee" />
            <Text style={styles.listeningText}>  Listening...</Text>
          </View>
        ) : transcript ? (
          <Text style={styles.transcriptText}>{transcript}</Text>
        ) : (
          <Text style={styles.placeholderText}>
            Press the button and start speaking
          </Text>
        )}
        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.button, isListening && styles.buttonDisabled]}
        onPress={handleStart}
        disabled={isListening}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {isListening ? '🎙️ Listening...' : '🎤 Start Speaking'}
        </Text>
      </TouchableOpacity>

      {transcript !== '' && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => setTranscript('')}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
    color: '#1a1a1a',
  },
  resultBox: {
    minHeight: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  listeningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listeningText: {
    fontSize: 16,
    color: '#6200ee',
  },
  transcriptText: {
    fontSize: 18,
    color: '#1a1a1a',
    lineHeight: 28,
  },
  placeholderText: {
    fontSize: 15,
    color: '#aaa',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: '#d32f2f',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 16,
    borderRadius: 50,
    alignItems: 'center',
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#b39ddb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  clearButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#6200ee',
    fontSize: 15,
  },
});

export default SpeechToText;