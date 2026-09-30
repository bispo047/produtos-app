import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../theme/cores';

export function Tela({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={styles.area} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.area}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.conteudo}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 16, gap: 16 },
});