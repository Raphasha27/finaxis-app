import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'dart:math';

void main() {
  runApp(const FinAxisApp());
}

class FinAxisApp extends StatelessWidget {
  const FinAxisApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FinAxis Mobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2563EB),
          background: const Color(0xFFF8FAFC),
          surface: Colors.white,
          onSurface: const Color(0xFF0F172A),
        ),
        textTheme: GoogleFonts.interTextTheme(),
      ),
      home: const AuthLockScreen(),
    );
  }
}

class AuthLockScreen extends StatefulWidget {
  const AuthLockScreen({super.key});

  @override
  State<AuthLockScreen> createState() => _AuthLockScreenState();
}

class _AuthLockScreenState extends State<AuthLockScreen> {
  bool _isAuthenticating = false;

  void _authenticate() async {
    setState(() => _isAuthenticating = true);
    // Simulate FaceID/Biometric Processing
    await Future.delayed(const Duration(seconds: 2));
    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const DashboardScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.shield_rounded, size: 80, color: Color(0xFF2563EB)),
            const SizedBox(height: 24),
            const Text(
              'FinAxis Secure',
              style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, letterSpacing: -1),
            ),
            const SizedBox(height: 8),
            Text(
              'Biometric Authentication Required',
              style: TextStyle(color: Colors.grey[600], fontSize: 16),
            ),
            const SizedBox(height: 60),
            if (_isAuthenticating)
              const CircularProgressIndicator(color: Color(0xFF2563EB))
            else
              GestureDetector(
                onTap: _authenticate,
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: const Color(0xFF2563EB).withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.face_unlock_rounded, size: 48, color: Color(0xFF2563EB)),
                ),
              ),
            const SizedBox(height: 20),
            if (!_isAuthenticating)
              const Text('Tap to Unlock', style: TextStyle(fontWeight: FontWeight.w600, color: Color(0xFF2563EB))),
          ],
        ),
      ),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  double balance = 145250.75;
  final List<Map<String, dynamic>> transactions = [
    {'title': 'Starbucks Coffee', 'amount': -85.50, 'date': 'Just now', 'category': 'Food'},
    {'title': 'Salary Deposit', 'amount': 45000.00, 'date': 'Yesterday', 'category': 'Income'},
    {'title': 'Global Settlement', 'amount': -12500.00, 'date': '2 days ago', 'category': 'Bank'},
  ];

  final List<double> weeklySpending = [400, 700, 300, 900, 500, 1100, 600];

  void _initiateSpend(double amount, String merchant) {
    setState(() {
      balance -= amount;
      transactions.insert(0, {
        'title': merchant,
        'amount': -amount,
        'date': 'Just now',
        'category': 'Spend',
      });
      // Update chart simulation
      weeklySpending[6] += amount;
    });
    
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.verified_user_rounded, color: Colors.white, size: 20),
            const SizedBox(width: 12),
            Text('Ledger updated. R$amount debited for $merchant'),
          ],
        ),
        backgroundColor: const Color(0xFF10B981),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final currencyFormat = NumberFormat.currency(symbol: 'R ', decimalDigits: 2);

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),
              _buildHeader(),
              const SizedBox(height: 32),
              _buildBalanceCard(currencyFormat),
              const SizedBox(height: 32),
              _buildSpendingAnalytics(),
              const SizedBox(height: 32),
              _buildQuickActions(),
              const SizedBox(height: 40),
              _buildTransactionHeader(),
              _buildTransactionList(currencyFormat),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Welcome back,', style: TextStyle(color: Colors.grey[600], fontSize: 14)),
            const Text('Senior Analyst', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          ],
        ),
        Row(
          children: [
            _headerIconButton(Icons.search_rounded),
            const SizedBox(width: 12),
            _headerIconButton(Icons.notifications_outlined),
          ],
        )
      ],
    );
  }

  Widget _headerIconButton(IconData icon) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFF1F5F9)),
      ),
      child: Icon(icon, color: const Color(0xFF64748B), size: 22),
    );
  }

  Widget _buildBalanceCard(NumberFormat formatter) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(35),
        image: DecorationImage(
          image: NetworkImage('https://www.transparenttextures.com/patterns/carbon-fibre.png'), // Subtle texture
          opacity: 0.1,
        )
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Institutional Core Balance', style: TextStyle(color: Colors.white60, fontSize: 14, fontWeight: FontWeight.w500)),
          const SizedBox(height: 12),
          Text(
            formatter.format(balance),
            style: const TextStyle(color: Colors.white, fontSize: 30, fontWeight: FontWeight.w800, letterSpacing: -1),
          ),
          const SizedBox(height: 40),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('**** **** **** 8827', style: TextStyle(color: Colors.white54, fontSize: 16, letterSpacing: 2)),
              const Icon(Icons.contactless_outlined, color: Colors.white54),
            ],
          )
        ],
      ),
    );
  }

  Widget _buildSpendingAnalytics() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Weekly Velocity', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        const SizedBox(height: 16),
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(24),
            border: Border.all(color: const Color(0xFFF1F5F9)),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: weeklySpending.asMap().entries.map((entry) {
              double height = (entry.value / 1200) * 100;
              bool isToday = entry.key == 6;
              return Column(
                children: [
                  Container(
                    width: 30,
                    height: max(height, 8),
                    decoration: BoxDecoration(
                      color: isToday ? const Color(0xFF2563EB) : const Color(0xFFE2E8F0),
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(['M', 'T', 'W', 'T', 'F', 'S', 'S'][entry.key], 
                    style: TextStyle(fontSize: 10, color: isToday ? const Color(0xFF2563EB) : Colors.grey[400], fontWeight: FontWeight.w600)),
                ],
              );
            }).toList(),
          ),
        ),
      ],
    );
  }

  Widget _buildQuickActions() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _actionIcon(Icons.send_rounded, 'Transfer', () {}),
        _actionIcon(Icons.shopping_cart_checkout_rounded, 'Spend', () => _showSpendDialog()),
        _actionIcon(Icons.analytics_rounded, 'Insights', () {}),
        _actionIcon(Icons.settings_suggest_rounded, 'Vault', () {}),
      ],
    );
  }

  Widget _actionIcon(IconData icon, String label, VoidCallback onTap) {
    return Column(
      children: [
        InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(20),
          child: Container(
            width: 64,
            height: 64,
            decoration: BoxDecoration(
              color: const Color(0xFFF8FAFC),
              borderRadius: BorderRadius.circular(22),
              border: Border.all(color: const Color(0xFFF1F5F9)),
            ),
            child: Icon(icon, color: const Color(0xFF0F172A)),
          ),
        ),
        const SizedBox(height: 10),
        Text(label, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF64748B))),
      ],
    );
  }

  Widget _buildTransactionHeader() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Text('Ledger Audit', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          TextButton(onPressed: () {}, child: const Text('Export CSV')),
        ],
      ),
    );
  }

  Widget _buildTransactionList(NumberFormat formatter) {
    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: transactions.length,
      itemBuilder: (context, index) {
        final tx = transactions[index];
        final isNegative = tx['amount'] < 0;
        return Container(
          margin: const EdgeInsets.bottom(12),
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: const Color(0xFFF1F5F9)),
          ),
          child: Row(
            children: [
              CircleAvatar(
                backgroundColor: isNegative ? const Color(0xFFFEF2F2) : const Color(0xFFECFDF5),
                child: Icon(
                  isNegative ? Icons.payment_rounded : Icons.account_balance_wallet_rounded,
                  color: isNegative ? const Color(0xFFEF4444) : const Color(0xFF10B981),
                  size: 18,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(tx['title'], style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14)),
                    Text(tx['date'], style: TextStyle(color: Colors.grey[500], fontSize: 11)),
                  ],
                ),
              ),
              Text(
                '${isNegative ? "-" : "+"}${formatter.format(tx['amount'].abs()).replaceFirst('R ', '')}',
                style: TextStyle(
                  fontWeight: FontWeight.w800,
                  fontSize: 15,
                  color: isNegative ? const Color(0xFF0F172A) : const Color(0xFF10B981),
                ),
              )
            ],
          ),
        );
      },
    );
  }

  void _showSpendDialog() {
    String merchant = '';
    double amount = 0;
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Padding(
        padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
        child: Container(
          padding: const EdgeInsets.all(32),
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.vertical(top: Radius.circular(40)),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(2)))),
              const SizedBox(height: 24),
              const Text('Authorize Purchase', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, letterSpacing: -0.5)),
              const SizedBox(height: 24),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Merchant',
                  filled: true,
                  fillColor: const Color(0xFFF8FAFC),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                ),
                onChanged: (v) => merchant = v,
              ),
              const SizedBox(height: 16),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Amount (ZAR)',
                  filled: true,
                  fillColor: const Color(0xFFF8FAFC),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16), borderSide: BorderSide.none),
                ),
                keyboardType: TextInputType.number,
                onChanged: (v) => amount = double.tryParse(v) ?? 0,
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 60,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2563EB),
                    foregroundColor: Colors.white,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
                  ),
                  onPressed: () {
                    if (merchant.isNotEmpty && amount > 0) {
                      Navigator.pop(context);
                      _initiateSpend(amount, merchant);
                    }
                  },
                  child: const Text('Confirm Expenditure', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
