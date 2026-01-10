import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Dimensions, 
  Modal,
  TextInput,
  Image,
  Animated,
  Alert,
  Platform
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { 
  Home, 
  Scan, 
  Bot, 
  User, 
  Ticket, 
  Wallet, 
  ChevronRight, 
  ArrowLeft,
  LayoutDashboard,
  Hotel,
  Fingerprint,
  ShieldCheck,
  Bell,
  Lock
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

// Notification Configuration
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const COLORS = {
  primary: '#2563eb',
  secondary: '#10b981',
  accent: '#f59e0b',
  bg: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a',
  textSoft: '#64748b',
  danger: '#ef4444'
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // null, 'attendee', 'organizer'
  const [view, setView] = useState('home'); // home, tickets, assistant
  const [balance, setBalance] = useState(1200);
  const [activeModal, setActiveModal] = useState(null);
  
  // Animation for the lock screen
  const lockAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    registerForPushNotificationsAsync();
    
    // Animate the lock icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(lockAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(lockAnim, { toValue: 0, duration: 1500, useNativeDriver: true })
      ])
    ).start();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        return;
      }
    }
  };

  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      // Fallback for simulators or devices without biometrics
      setIsAuthenticated(true);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access FinAxis Premium',
      fallbackLabel: 'Use Passcode',
    });

    if (result.success) {
      setIsAuthenticated(true);
    } else {
      Alert.alert('Authentication Failed', 'Please try again.');
    }
  };

  const sendTransactionNotification = async (amount, vendor) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Payment Authorized 💳",
        body: `R ${amount} spent at ${vendor}. New balance: R ${balance - amount}`,
      },
      trigger: null, // send immediately
    });
  };

  const [vendorSales, setVendorSales] = useState([
    { id: 1, name: 'Tech Merch Store', totalSales: 21400, transactions: 62, color: '#6366f1' },
    { id: 2, name: 'Summit Cafe', totalSales: 11200, transactions: 248, color: '#f59e0b' },
    { id: 3, name: 'Mainstage Lounge', totalSales: 24200, transactions: 254, color: '#ec4899' }
  ]);

  const totalRevenue = useMemo(() => vendorSales.reduce((acc, v) => acc + v.totalSales, 0), [vendorSales]);

  // 1. LOCK SCREEN (Biometrics)
  if (!isAuthenticated) {
    return (
      <View style={styles.authScreen}>
        <Animated.View style={{ 
          transform: [{ 
            scale: lockAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] }) 
          }],
          opacity: lockAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] })
        }}>
          <View style={styles.lockCircle}>
            <ShieldCheck color="white" size={48} />
          </View>
        </Animated.View>
        <Text style={styles.authTitle}>FinAxis Secure</Text>
        <Text style={styles.authSubtitle}>Institutional Grade Entry</Text>
        
        <TouchableOpacity style={styles.biometricBtn} onPress={handleBiometricAuth}>
          <Fingerprint color="white" size={24} />
          <Text style={styles.biometricBtnText}>Authenticate</Text>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>Secured by FinAxis Core v2.4</Text>
      </View>
    );
  }

  // 2. ROLE SELECTION
  if (!role) {
    return (
      <View style={styles.setupScreen}>
        <View style={styles.setupLogo}>
          <Bot color={COLORS.primary} size={40} />
        </View>
        <Text style={styles.setupTitle}>FinAxis Eco</Text>
        <Text style={styles.setupSubtitle}>Enterprise Event Ledger</Text>
        
        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={[styles.roleBtn, role === 'attendee' && styles.roleBtnActive]} 
            onPress={() => setRole('attendee')}
          >
            <User color={COLORS.primary} size={24} />
            <Text style={styles.roleBtnText}>Attendee</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.roleBtn, role === 'organizer' && styles.roleBtnActive]} 
            onPress={() => setRole('organizer')}
          >
            <LayoutDashboard color={COLORS.primary} size={24} />
            <Text style={styles.roleBtnText}>Organizer</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.primaryBtn} onPress={() => {}}>
          <Text style={styles.primaryBtnText}>Initialize Application</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>{role === 'organizer' ? 'Admin Portal' : 'Event Active'}</Text>
          <Text style={styles.headerTitle}>Hi, Raphasha!</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerAction}>
            <Bell color={COLORS.text} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerAction} onPress={() => setIsAuthenticated(false)}>
            <Lock color={COLORS.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {role === 'organizer' ? (
          <View style={styles.organizerSection}>
            <View style={[styles.walletCard, styles.adminCard]}>
              <Text style={styles.walletLabel}>Gross Transaction Volume</Text>
              <Text style={styles.walletBalanceAtop}>R {totalRevenue.toLocaleString()}</Text>
              <Text style={styles.walletTrend}>↑ 22% from last Summit</Text>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Vendor Performance</Text>
            </View>
            
            {vendorSales.map(v => (
              <View key={v.id} style={styles.vendorCard}>
                <View style={styles.vendorRow}>
                  <Text style={styles.vendorName}>{v.name}</Text>
                  <Text style={styles.vendorSales}>R {v.totalSales.toLocaleString()}</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${(v.totalSales/totalRevenue)*100}%`, backgroundColor: v.color }]} />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.attendeeSection}>
            <View style={styles.walletCard}>
              <Text style={styles.walletLabel}>Available Credits</Text>
              <Text style={styles.walletBalance}>R {balance.toLocaleString()}</Text>
              <TouchableOpacity style={styles.loadPill} onPress={() => setBalance(b => b + 500)}>
                <Wallet color="white" size={14} />
                <Text style={styles.loadText}>Top Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>

            <View style={styles.grid}>
              <TouchableOpacity style={styles.card} onPress={() => setView('assistant')}>
                <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
                  <Bot color={COLORS.primary} size={22} />
                </View>
                <Text style={styles.cardText}>Event AI</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.card} onPress={() => setActiveModal('scan')}>
                <View style={[styles.iconBox, { backgroundColor: '#fff7ed' }]}>
                  <Scan color={COLORS.accent} size={22} />
                </View>
                <Text style={styles.cardText}>Scan Pay</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.card} onPress={() => setView('tickets')}>
                <View style={[styles.iconBox, { backgroundColor: '#f0fdf4' }]}>
                  <Ticket color={COLORS.secondary} size={22} />
                </View>
                <Text style={styles.cardText}>Tickets</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.card}>
                <View style={[styles.iconBox, { backgroundColor: '#faf5ff' }]}>
                  <Hotel color="#a855f7" size={22} />
                </View>
                <Text style={styles.cardText}>Lodging</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Activity Feed</Text>
            </View>
            <View style={styles.activityFeed}>
              <View style={styles.feedItem}>
                <View style={styles.feedIcon}>
                  <Wallet color={COLORS.textSoft} size={18} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.feedName}>Summit Cafe</Text>
                  <Text style={styles.feedTime}>Just now</Text>
                </View>
                <Text style={styles.feedPrice}>-R 145</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.nav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setView('home')}>
          <Home color={view === 'home' ? COLORS.primary : COLORS.textSoft} size={24} />
          <Text style={[styles.navText, view === 'home' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.scanBtn} onPress={() => setActiveModal('scan')}>
          <Scan color="white" size={28} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setView('assistant')}>
          <Bot color={view === 'assistant' ? COLORS.primary : COLORS.textSoft} size={24} />
          <Text style={[styles.navText, view === 'assistant' && styles.navTextActive]}>Assistant</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={activeModal === 'scan'}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.modalTitle}>Confirm Purchase</Text>
            <Text style={styles.modalSubtitle}>Institutional Wallet authorization required.</Text>
            <View style={styles.modalReview}>
              <View>
                <Text style={styles.reviewMain}>Summit Cafe</Text>
                <Text style={styles.reviewSub}>Exclusive Event Entry</Text>
              </View>
              <Text style={styles.reviewPrice}>R 150.00</Text>
            </View>
            <TouchableOpacity 
              style={styles.primaryBtn} 
              onPress={() => {
                setBalance(b => b - 150);
                sendTransactionNotification(150, 'Summit Cafe');
                setActiveModal(null);
              }}
            >
              <Text style={styles.primaryBtnText}>Confirm & Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: '#f1f5f9', marginTop: 10 }]} onPress={() => setActiveModal(null)}>
              <Text style={[styles.primaryBtnText, { color: COLORS.text }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  // Auth Screen
  authScreen: { flex: 1, backgroundColor: COLORS.text, justifyContent: 'center', alignItems: 'center', padding: 40 },
  lockCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: 40, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20 },
  authTitle: { fontSize: 28, fontWeight: '800', color: 'white', marginBottom: 8 },
  authSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 60 },
  biometricBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: COLORS.primary, paddingHorizontal: 40, paddingVertical: 20, borderRadius: 100 },
  biometricBtnText: { color: 'white', fontWeight: '800', fontSize: 16 },
  footerText: { position: 'absolute', bottom: 40, color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },

  setupScreen: { flex: 1, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', padding: 40 },
  setupLogo: { width: 80, height: 80, backgroundColor: '#eff6ff', borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  setupTitle: { fontSize: 28, fontWeight: '800', color: COLORS.text, marginBottom: 8 },
  setupSubtitle: { fontSize: 14, color: COLORS.textSoft, marginBottom: 40 },
  roleContainer: { flexDirection: 'row', gap: 12, marginBottom: 40 },
  roleBtn: { flex: 1, backgroundColor: COLORS.surface, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#f1f5f9', alignItems: 'center' },
  roleBtnActive: { borderColor: COLORS.primary, backgroundColor: '#eff6ff' },
  roleBtnText: { marginTop: 12, fontWeight: '700', fontSize: 13 },
  primaryBtn: { backgroundColor: COLORS.primary, width: '100%', padding: 18, borderRadius: 18, alignItems: 'center' },
  primaryBtnText: { color: 'white', fontWeight: '800', fontSize: 15 },
  
  header: { padding: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLabel: { fontSize: 12, color: COLORS.textSoft },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  headerIcons: { flexDirection: 'row', gap: 10 },
  headerAction: { width: 44, height: 44, backgroundColor: 'white', borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' },
  
  content: { flex: 1 },
  walletCard: { margin: 20, padding: 24, backgroundColor: COLORS.text, borderRadius: 28, overflow: 'hidden' },
  adminCard: { backgroundColor: COLORS.text },
  walletLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  walletBalance: { color: 'white', fontSize: 32, fontWeight: '800', marginVertical: 8 },
  walletBalanceAtop: { color: 'white', fontSize: 28, fontWeight: '800', marginVertical: 6 },
  walletTrend: { color: COLORS.secondary, fontSize: 12, fontWeight: '700' },
  loadPill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, gap: 6, marginTop: 8 },
  loadText: { color: 'white', fontSize: 12, fontWeight: '700' },
  
  sectionHeader: { paddingHorizontal: 24, paddingVertical: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.text },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 14 },
  card: { width: (width - 60) / 2, backgroundColor: 'white', margin: 6, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: '#f1f5f9' },
  iconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  cardText: { fontSize: 13, fontWeight: '800', color: COLORS.text },
  
  vendorCard: { backgroundColor: 'white', padding: 20, borderRadius: 24, marginHorizontal: 20, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9' },
  vendorRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  vendorName: { fontWeight: '800', fontSize: 14 },
  vendorSales: { fontWeight: '800', fontSize: 14 },
  progressBarBg: { height: 8, backgroundColor: '#f1f5f9', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  
  activityFeed: { paddingHorizontal: 20 },
  feedItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 16, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: '#f1f5f9', gap: 16 },
  feedIcon: { width: 40, height: 40, backgroundColor: '#f8fafc', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  feedName: { fontWeight: '800', fontSize: 14 },
  feedTime: { fontSize: 11, color: COLORS.textSoft },
  feedPrice: { fontWeight: '800', fontSize: 14 },
  
  nav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 90, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#f1f5f9', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 20 },
  navItem: { alignItems: 'center', gap: 4 },
  navText: { fontSize: 10, fontWeight: '700', color: COLORS.textSoft },
  navTextActive: { color: COLORS.primary },
  scanBtn: { width: 64, height: 64, backgroundColor: COLORS.primary, borderRadius: 32, marginTop: -45, borderHeight: 5, borderColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8, borderWidth: 4 },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: 'white', padding: 32, borderTopLeftRadius: 40, borderTopRightRadius: 40 },
  sheetHandle: { width: 40, height: 4, backgroundColor: '#eee', borderRadius: 2, alignSelf: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalSubtitle: { fontSize: 13, color: COLORS.textSoft, marginBottom: 24 },
  modalReview: { backgroundColor: '#f8fafc', padding: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  reviewMain: { fontWeight: '800', fontSize: 15 },
  reviewSub: { fontSize: 11, color: COLORS.textSoft },
  reviewPrice: { fontSize: 18, fontWeight: '800' }
});
