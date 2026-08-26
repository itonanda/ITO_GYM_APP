import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function MemberVerifyEmailScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key: string, index: number) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const otpValue = code.join('');

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Please verify your email address</Text>
      <Text style={styles.subtitle}>
        We've sent an email to{' '}
        <Text style={styles.bold}>becca@gmail.com</Text>, please enter the
        code below.
      </Text>

      {/* OTP */}
      <Text style={styles.label}>Enter Code</Text>

      <View style={styles.otpRow}>
        {code.map((value, index) => (
        <TextInput
            key={index}
            ref={(ref) => {
            inputs.current[index] = ref;
            }}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
            handleBackspace(nativeEvent.key, index)
            }
        />
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { opacity: otpValue.length === 6 ? 1 : 0.5 },
        ]}
        disabled={otpValue.length !== 6}
        onPress={() => router.replace('/signin')}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Resend */}
      <Text style={styles.resendText}>
        Didn't see your email?{' '}
        <Text style={styles.resend} onPress={() => router.replace('/+not-found')}>Resend</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#777',
    marginBottom: 24,
    lineHeight: 20,
  },
  bold: {
    fontWeight: '600',
    color: '#000',
  },
  label: {
    marginBottom: 10,
    fontWeight: '500',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpBox: {
    width: 48,
    height: 52,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#e53935',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  resendText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
  },
  resend: {
    color: '#e53935',
    fontWeight: '600',
  },
});