import React, { useState, useEffect } from 'react';

const App = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [balance, setBalance] = useState(145250.75);
  const [isSpending, setIsSpending] = useState(false);
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Starbucks Coffee', amount: -85.50, date: 'Just now', positive: false },
    { id: 2, title: 'Salary Deposit', amount: 45000.00, date: 'Yesterday', positive: true },
    { id: 3, title: 'Global Settlement', amount: -12500.00, date: '2 days ago', positive: false },
  ]);

  const [weeklySpending, setWeeklySpending] = useState([40, 70, 30, 90, 50, 110, 60]);

  const handleUnlock = () => {
    setTimeout(() => setIsLocked(false), 1000);
  };

  const executeSpend = () => {
    if (!merchant || !amount) return;
    const spendAmount = parseFloat(amount);
    setBalance(prev => prev - spendAmount);
    setTransactions(prev => [
      { id: Date.now(), title: merchant, amount: -spendAmount, date: 'Just now', positive: false },
      ...prev
    ]);
    
    const newWeekly = [...weeklySpending];
    newWeekly[6] += (spendAmount / 100);
    setWeeklySpending(newWeekly);
    
    setIsSpending(false);
    setMerchant('');
    setAmount('');
  };

  if (isLocked) {
    return (
      <div className="mobile-container">
        <div className="auth-screen">
          <div className="pulse" style={{ width: 80, height: 80, background: '#2563eb10', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: 24, margin: '0 auto' }}>
             <span style={{ fontSize: 40 }}>👤</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>FinAxis Secure</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Biometric Authentication Required</p>
          <button onClick={handleUnlock} style={{ marginTop: 60, background: '#2563eb', color: 'white', border: 'none', padding: '16px 32px', borderRadius: 20, fontWeight: 700 }}>Tap to Unlock</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-container" style={{ position: 'relative' }}>
      <div className="screen">
        <div className="header">
          <div>
            <div style={{ color: '#64748b', fontSize: 12 }}>Welcome back,</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>Senior Analyst</div>
          </div>
          <div style={{ padding: 10, background: 'white', borderRadius: 12, border: '1px solid #f1f5f9' }}>🔔</div>
        </div>

        <div className="balance-card">
          <div style={{ fontSize: 14, opacity: 0.7 }}>Institutional Core Balance</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>R {balance.toLocaleString()}</div>
          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', opacity: 0.5, fontSize: 14, letterSpacing: 2 }}>
            <span>**** **** **** 8827</span>
            <span>💳</span>
          </div>
        </div>

        <div className="chart-container">
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Weekly Velocity</div>
          <div className="bar-wrapper">
            {weeklySpending.map((v, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div className={`bar ${i === 6 ? 'active' : ''}`} style={{ height: Math.max(v, 10) }}></div>
                <div style={{ fontSize: 10, color: i === 6 ? '#2563eb' : '#94a3b8', fontWeight: 700 }}>{['M','T','W','T','F','S','S'][i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <div className="action-btn">
            <div className="action-icon">📤</div>
            <span style={{ fontSize: 11, fontWeight: 600 }}>Transfer</span>
          </div>
          <div className="action-btn" onClick={() => setIsSpending(true)}>
            <div className="action-icon" style={{ background: '#0f172a', color: 'white' }}>🛍️</div>
            <span style={{ fontSize: 11, fontWeight: 600 }}>Spend</span>
          </div>
          <div className="action-btn">
            <div className="action-icon">📊</div>
            <span style={{ fontSize: 11, fontWeight: 600 }}>Insights</span>
          </div>
          <div className="action-btn">
            <div className="action-icon">🔒</div>
            <span style={{ fontSize: 11, fontWeight: 600 }}>Vault</span>
          </div>
        </div>

        <div className="transaction-list">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
             <span style={{ fontWeight: 800 }}>Ledger Audit</span>
             <span style={{ fontSize: 12, color: '#2563eb' }}>See all</span>
          </div>
          {transactions.map(tx => (
            <div key={tx.id} className="tx-item">
              <div className="tx-icon" style={{ background: tx.positive ? '#ecfdf5' : '#fef2f2' }}>
                {tx.positive ? '📉' : '💸'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{tx.title}</div>
                <div style={{ fontSize: 10, color: '#94a3b8' }}>{tx.date}</div>
              </div>
              <div style={{ fontWeight: 800, color: tx.positive ? '#10b981' : '#0f172a' }}>
                {tx.positive ? '+' : '-'}{Math.abs(tx.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`spending-panel ${isSpending ? 'open' : ''}`}>
        <div style={{ width: 40, height: 4, background: '#e2e8f0', borderRadius: 2, margin: '0 auto 24px' }}></div>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Authorize Expenditure</h2>
        
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 8 }}>Merchant Name</label>
          <input 
            type="text" 
            placeholder="e.g. Amazon" 
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            style={{ width: '100%', padding: '12px', background: '#f8fafc', border: 'none', borderRadius: 12 }}
          />
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 8 }}>Amount (ZAR)</label>
          <input 
            type="number" 
            placeholder="0.00" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: '100%', padding: '12px', background: '#f8fafc', border: 'none', borderRadius: 12 }}
          />
        </div>

        <button className="btn-primary" onClick={executeSpend}>Confirm Authorization</button>
        <button onClick={() => setIsSpending(false)} style={{ width: '100%', padding: '16px', background: 'transparent', border: 'none', color: '#64748b', fontWeight: 600, marginTop: 8 }}>Cancel</button>
      </div>
    </div>
  );
};

export default App;
