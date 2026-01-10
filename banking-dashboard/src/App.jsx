import React, { useState, useEffect } from 'react';

// Mock Microservices API Simulation
const API = {
  getAccounts: async () => {
    return [
      { id: 'acc-001', accountNumber: 'CH-1002934', balance: 145250.75, currency: 'ZAR', type: 'Primary' },
      { id: 'acc-002', accountNumber: 'SV-9923841', balance: 25000.00, currency: 'ZAR', type: 'Savings' }
    ];
  },
  getTransactions: async () => {
    return [
      { id: 'tx-1', desc: 'Internal Settlement (RTGS)', amount: -15000.00, date: '2026-01-09', status: 'COMPLETED' },
      { id: 'tx-2', desc: 'Salary Deposit', amount: 45000.00, date: '2026-01-08', status: 'COMPLETED' },
      { id: 'tx-3', desc: 'Azure Cloud Billing', amount: -1250.20, date: '2026-01-07', status: 'COMPLETED' },
      { id: 'tx-4', desc: 'Internal Transfer', amount: 5000.00, date: '2026-01-06', status: 'COMPLETED' }
    ];
  },
  getFraudAlerts: async () => {
    return [
      { id: 'f-1', severity: 'HIGH', reason: 'High Velocity Detection', timestamp: '10m ago' }
    ];
  }
};

function App() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [accs, txs, alerts] = await Promise.all([
        API.getAccounts(),
        API.getTransactions(),
        API.getFraudAlerts()
      ]);
      setAccounts(accs);
      setTransactions(txs);
      setFraudAlerts(alerts);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleTransfer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = formData.get('amount');
    
    // Simulate Saga Initiation
    alert(`Initiating Payment Saga for R${amount}. Posting to Ledger...`);
    
    // In real app, this would call our Payment Service /api/v1/payments/initiate
  };

  if (loading) return <div style={{ color: 'white', padding: '40px' }}>🔐 Authenticating with Secure Ledger...</div>;

  return (
    <div className="dashboard-layout fade-in">
      <aside className="sidebar">
        <div className="logo">FINAXIS</div>
        <nav className="nav-links">
          <a href="#" className="nav-item active">🏦 Dashboard</a>
          <a href="#" className="nav-item">📈 Markets</a>
          <a href="#" className="nav-item">💳 Accounts</a>
          <a href="#" className="nav-item">🛡️ Security</a>
          <a href="#" className="nav-item">📊 Reports</a>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <div className="panel" style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: 600, marginBottom: '8px' }}>AML ALERT</div>
            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Velocity threshold reached on ACC-001. System in observation mode.</div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Institutional Banking Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Welcome back, Senior Analyst. Real-time ACID monitoring enabled.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span className="badge badge-success">● Engine Live</span>
            <span className="badge badge-warning">● Kafka Connected</span>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Portfolio Balance</div>
            <div className="stat-value">R {(accounts[0].balance + accounts[1].balance).toLocaleString()}</div>
            <div style={{ color: 'var(--success)', fontSize: '12px', marginTop: '8px' }}>↑ 4.2% from last EOD</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Active Ledger Entries</div>
            <div className="stat-value">4,892</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '8px' }}>Consistency: 100.00%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Fraud Velocity (1m)</div>
            <div className="stat-value">0.02 tx/s</div>
            <div style={{ color: 'var(--success)', fontSize: '12px', marginTop: '8px' }}>Normal Range</div>
          </div>
        </section>

        <div className="content-grid">
          <article className="panel">
            <div className="panel-title">
              Recent Activity
              <span style={{ fontSize: '12px', color: 'var(--accent-primary)', cursor: 'pointer' }}>View Ledger Audit</span>
            </div>
            <div className="transaction-list">
              {transactions.map(tx => (
                <div key={tx.id} className="transaction-item">
                  <div className="tx-main">
                    <div className="tx-icon">{tx.amount > 0 ? '↓' : '↑'}</div>
                    <div className="tx-details">
                      <span className="tx-desc">{tx.desc}</span>
                      <span className="tx-date">{tx.date}</span>
                    </div>
                  </div>
                  <div className={`tx-amount ${tx.amount > 0 ? 'amount-positive' : 'amount-negative'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ZAR
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-title">Initiate Transfer (Saga)</div>
            <form className="transfer-form" onSubmit={handleTransfer}>
              <div className="input-group">
                <label>Source Account</label>
                <select name="source">
                  {accounts.map(acc => (
                    <option key={acc.id} value={acc.id}>{acc.accountNumber} (R{acc.balance})</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Recipient Account Number</label>
                <input type="text" placeholder="e.g. 1002934812" required name="recipient" />
              </div>
              <div className="input-group">
                <label>Amount (ZAR)</label>
                <input type="number" step="0.01" placeholder="0.00" required name="amount" />
              </div>
              <div className="input-group">
                <label>Reference</label>
                <input type="text" placeholder="Internal / EFT / Salary" name="reference" />
              </div>
              <button type="submit" className="btn-primary">Execute Payment</button>
            </form>
            <div style={{ marginTop: '20px', fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center' }}>
              ⚠️ Transactions are immutable once committed to Journal.
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

export default App;
