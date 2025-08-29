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
    backgroundColor: '#F8F9FA',
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#20AB7D',
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  separator: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#20AB7D',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: '#6C757D',
    fontSize: 14,
  },
  signUpText: {
    color: '#20AB7D',
    fontSize: 14,
    fontWeight: '700',
  },
  legalFooter: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  legalText: {
    color: '#6C757D',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  termsText: {
    color: '#20AB7D',
    fontSize: 12,
    fontWeight: '700',
  },
}); 