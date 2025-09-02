import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import IngredientHighlighter from '../IngredientHighlighter';

interface HebDocAiPageProps {
  onGoBack?: () => void;
}

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function HebDocAiPage({ onGoBack }: HebDocAiPageProps) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: 'Hello, I am HebDocAI. How can I help you today?'
      ,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isSending, setIsSending] = useState(false);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thinkingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<ScrollView | null>(null);

  const handleBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      router.back();
    }
  };

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  const extractTextAfterInst = (raw: string): string => {
    try {
      const marker = '[/INST]';
      const idx = raw.indexOf(marker);
      if (idx === -1) return raw.trim();
      return raw.substring(idx + marker.length).trim();
    } catch {
      return raw;
    }
  };

  const formatAsNumberedList = (raw: string): string => {
    const text = raw.replace(/\r\n/g, '\n').trim();
    let items: string[] = [];

    // Split by common list delimiters first
    if (/[•\-\u2022]/.test(text)) {
      items = text.split(/[•\-\u2022]/g);
    } else if (text.includes('\n')) {
      items = text.split('\n');
    } else {
      // Fallback: split by sentence boundaries
      items = text.split(/(?<=\.)\s+(?=[A-Z])/g);
    }

    const cleaned = items
      .map(s => s.replace(/^\s*\d+\.\s*/, '').trim()) // remove existing numbering
      .filter(s => s.length > 0);

    if (cleaned.length === 0) {
      return text; // nothing to format
    }

    return cleaned.map((s, i) => `${i + 1}. ${s}`).join('\n');
  };

  const clearTypingTimer = () => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  };

  const clearThinkingTimer = () => {
    if (thinkingIntervalRef.current) {
      clearInterval(thinkingIntervalRef.current);
      thinkingIntervalRef.current = null;
    }
  };

  const typeOutTextIntoMessage = (messageId: number, fullText: string, speedMs: number = 20) => {
    let currentIndex = 0;
    clearTypingTimer();

    typingIntervalRef.current = setInterval(() => {
      currentIndex += 1;
      const next = fullText.slice(0, currentIndex);
      setChatMessages(prev => prev.map(m => m.id === messageId ? { ...m, text: next } : m));
      scrollToEnd();

      if (currentIndex >= fullText.length) {
        clearTypingTimer();
      }
    }, speedMs);
  };

  useEffect(() => {
    return () => {
      clearTypingTimer();
      clearThinkingTimer();
    };
  }, []);

  const startThinkingDots = (messageId: number) => {
    clearThinkingTimer();
    let dots = 0;
    // Seed with one dot immediately for instant feedback
    setChatMessages(prev => prev.map(m => m.id === messageId ? { ...m, text: '.' } : m));
    thinkingIntervalRef.current = setInterval(() => {
      dots = (dots % 3) + 1; // 1..3
      const text = '.'.repeat(dots);
      setChatMessages(prev => prev.map(m => m.id === messageId ? { ...m, text } : m));
      scrollToEnd();
    }, 500);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: message.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setMessage('');
    scrollToEnd();

    // Add placeholder AI message to show thinking then type response
    const aiMessageId = Date.now() + 1;
    const aiPlaceholder: ChatMessage = {
      id: aiMessageId,
      text: '',
      isUser: false,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, aiPlaceholder]);
    scrollToEnd();

    setIsSending(true);
    startThinkingDots(aiMessageId);

    try {
      const response = await axios.post(
        'http://10.10.45.109:8080/generate',
        { instruction: userMessage.text },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 20000,
        }
      );

      const rawResult = response?.data?.result ?? '';
      const aiText = extractTextAfterInst(String(rawResult));
      const formatted = formatAsNumberedList(aiText);

      // Stop thinking indicator and start typing effect
      clearThinkingTimer();
      typeOutTextIntoMessage(aiMessageId, formatted, 15);
    } catch (error: any) {
      clearThinkingTimer();
      const fallback = 'Sorry, I could not reach the server. Please try again.';
      setChatMessages(prev => prev.map(m => m.id === aiMessageId ? { ...m, text: fallback } : m));
    } finally {
      setIsSending(false);
      scrollToEnd();
    }
  };

  const handleIngredientPress = (ingredient: string) => {
    console.log('Navigating to ingredient search with:', ingredient);
    try {
      // Use the new route structure
      router.push({
        pathname: '/ingredient',
        params: { ingredient }
      });
    } catch (error) {
      console.error('Navigation error:', error);
      // Try alternative navigation
      try {
        router.push('/homepage');
        setTimeout(() => {
          router.push({
            pathname: '/ingredient',
            params: { ingredient }
          });
        }, 500);
      } catch (fallbackError) {
        console.error('Fallback navigation also failed:', fallbackError);
        alert(`Navigation failed: ${error}`);
      }
    }
  };

  const renderMessage = (msg: ChatMessage) => {
    return (
      <View key={msg.id} style={[
        styles.messageContainer,
        msg.isUser ? styles.userMessageContainer : styles.aiMessageContainer
      ]}>
        <View style={[
          styles.messageBubble,
          msg.isUser ? styles.userBubble : styles.aiBubble
        ]}>
          {msg.isUser ? (
            <Text style={[
              styles.messageText,
              styles.userMessageText
            ]}>
              {msg.text}
            </Text>
          ) : (
            <IngredientHighlighter
              text={msg.text}
              onIngredientPress={handleIngredientPress}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HEBDOC</Text>
        <Text style={styles.headerSubtitle}>AI</Text>
      </View>

      {/* Chat Messages */}
      <ScrollView 
        ref={scrollRef}
        style={styles.chatContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatContent}
        onContentSizeChange={scrollToEnd}
      >
        {chatMessages.map(renderMessage)}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="How do you feel today..?"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
          editable={!isSending}
        />
        <TouchableOpacity 
          style={[styles.sendButton, { opacity: !message.trim() || isSending ? 0.6 : 1 }]} 
          onPress={handleSendMessage}
          disabled={!message.trim() || isSending}
        >
          <Text style={styles.sendIcon}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#20AB7D',
    paddingVertical: 20,
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  chatContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  aiBubble: {
    backgroundColor: '#20AB7D',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#2C3E50',
  },
  aiMessageText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  inputField: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    color: '#2C3E50',
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  sendButton: {
    width: 44,
    height: 44,
    backgroundColor: '#20AB7D',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sendIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
