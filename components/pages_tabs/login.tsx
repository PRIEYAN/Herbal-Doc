import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface LoginPageProps {
  onGoToProfile?: () => void;
  onGoToSignup: () => void;
  onSuccessfulAuth: () => void;
}

export default function LoginPage({ onGoToProfile, onGoToSignup, onSuccessfulAuth }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onSuccessfulAuth();
    }, 1500);
  };

  const handleSignUp = () => {
    onGoToSignup();
  };

  const handleTerms = () => {
    Alert.alert('Terms of Service', 'Terms of service will be displayed here');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoHerbal}>HERBAL</Text>
            <Text style={styles.logoDoc}>DOC</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <Text style={styles.inputIcon}></Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.inputField}>
              <Text style={styles.inputIcon}></Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Logging In...' : 'Log In'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Not a member? </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign up now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legalFooter}>
          <Text style={styles.legalText}>By using Herbal Doc, you are agreeing to our</Text>
          <TouchableOpacity onPress={handleTerms}>
            <Text style={styles.termsText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoHerbal: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#20AB7D',
    marginBottom: -8,
  },
  logoDoc: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#3a3a3a',
    marginHorizontal: 16,
  },
  loginButton: {
    backgroundColor: '#20AB7D',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: '#999',
    fontSize: 14,
  },
  signUpText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  legalFooter: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  legalText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  termsText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
}); 