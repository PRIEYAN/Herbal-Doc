import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
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

interface SignupPageProps {
  onGoToLogin?: () => void;
  onSuccessfulAuth: () => void;
}

export default function SignupPage({ onGoToLogin, onSuccessfulAuth }: SignupPageProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // DOB validation
    if (!dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 13 || age > 100) {
        newErrors.dateOfBirth = 'Age must be between 13 and 100 years';
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const signupData = {
        name: fullName.trim(),
        email: email.trim(),
        PhoneNumber: phoneNumber.trim(),
        dob: dateOfBirth.trim(),
        password: password
      };

      const response = await axios.post('http://10.10.45.109:5001/consumer/auth/signup', signupData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setIsLoading(false);
      
      if (response.status === 201) {
        // Store token in AsyncStorage
        const { token, user } = response.data;
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => onSuccessfulAuth() }
        ]);
      } else {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    } catch (error: any) {
      setIsLoading(false);
      
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        if (status === 400 && data.message === 'Email already exists') {
          Alert.alert('Error', 'An account with this email already exists. Please use a different email or try logging in.');
        } else if (status === 400) {
          Alert.alert('Error', data.message || 'Invalid request. Please check your information and try again.');
        } else if (status === 500) {
          Alert.alert('Error', 'Server error. Please try again later.');
        } else {
          Alert.alert('Error', data.message || 'Registration failed. Please try again.');
        }
      } else if (error.request) {
        // Network error
        Alert.alert('Error', 'Network error. Please check your connection and try again.');
      } else {
        // Other error
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleGoToLogin = () => {
    if (onGoToLogin) {
      onGoToLogin();
    }
  };

  const handleTerms = () => {
    Alert.alert('Terms of Service', 'Terms of service will be displayed here');
  };

  const handleBack = () => {
    if (onGoToLogin) {
      onGoToLogin();
    } else {
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
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
                style={[styles.input, errors.fullName && styles.inputError]}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  if (errors.fullName) setErrors({...errors, fullName: ''});
                }}
                autoCapitalize="words"
                autoComplete="name"
              />
            </View>
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            <View style={styles.separator} />
            <View style={styles.inputField}>
              <Text style={styles.inputIcon}></Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({...errors, email: ''});
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <View style={styles.separator} />
            <View style={styles.inputField}>
              <Text style={styles.inputIcon}></Text>
              <TextInput
                style={[styles.input, errors.phoneNumber && styles.inputError]}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text);
                  if (errors.phoneNumber) setErrors({...errors, phoneNumber: ''});
                }}
                keyboardType="phone-pad"
                autoComplete="tel"
                maxLength={10}
              />
            </View>
            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
            <View style={styles.separator} />
            <View style={styles.inputField}>
              <Text style={styles.inputIcon}></Text>
              <TextInput
                style={[styles.input, errors.dateOfBirth && styles.inputError]}
                placeholder="Date of Birth (YYYY-MM-DD)"
                placeholderTextColor="#999"
                value={dateOfBirth}
                onChangeText={(text) => {
                  setDateOfBirth(text);
                  if (errors.dateOfBirth) setErrors({...errors, dateOfBirth: ''});
                }}
                autoComplete="birthdate-full"
              />
            </View>
            {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
            <View style={styles.separator} />
            <View style={styles.inputField}>
              <Text style={styles.inputIcon}></Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({...errors, password: ''});
                }}
                secureTextEntry
                autoComplete="password-new"
              />
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <View style={styles.separator} />
            <View style={styles.inputField}>
              <Text style={styles.inputIcon}></Text>
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                }}
                secureTextEntry
                autoComplete="password-new"
              />
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          <TouchableOpacity 
            style={[styles.signupButton, isLoading && styles.signupButtonDisabled]} 
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleGoToLogin}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.legalFooter}>
          <Text style={styles.legalText}>By creating an account, you agree to our</Text>
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButtonText: {
    color: '#20AB7D',
    fontSize: 14,
    fontWeight: '700',
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
  inputError: {
    borderColor: '#E74C3C',
    borderWidth: 1,
  },
  errorText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 20,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 20,
  },
  signupButton: {
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
  signupButtonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
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
  loginText: {
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
