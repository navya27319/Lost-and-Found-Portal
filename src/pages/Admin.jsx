import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

const Admin = () => {
    const { allItems, removeItem, isAdmin, navigate } = useApp();

    if (!isAdmin) {
        return (
            <Layout title="Access Denied">
                <div style={styles.denied} className="animate-fade-in">
                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🔒</div>
                    <h2>Admin Access Required</h2>
                    <p>Only authorized administrators can access this dashboard.</p>
                    <button className="btn-primary btn" onClick={() => navigate('/')} style={{ marginTop: '24px' }}>
                        Go Back Home
                    </button>
                    <p style={{ marginTop: '40px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Hint: Sign in with <strong>admin@findit.com</strong> to test admin features.
                    </p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Admin Dashboard">
            <div style={styles.stats}>
                <div className="card" style={styles.statCard}>
                    <h4>{allItems.length}</h4>
                    <p>Total Posts</p>
                </div>
                <div className="card" style={styles.statCard}>
                    <h4>{allItems.filter(i => i.status === 'Lost').length}</h4>
                    <p>Lost</p>
                </div>
                <div className="card" style={styles.statCard}>
                    <h4>{allItems.filter(i => i.status === 'Found').length}</h4>
                    <p>Found</p>
                </div>
            </div>

            <div className="section-title">Manage Posts</div>

            <div style={styles.list}>
                {allItems.length > 0 ? (
                    allItems.map(item => (
                        <div key={item.id} className="card" style={styles.manageCard}>
                            <div style={styles.manageInfo}>
                                <span className={`badge badge-${item.status.toLowerCase()}`} style={{ fontSize: '0.6rem' }}>
                                    {item.status}
                                </span>
                                <h4 style={styles.manageTitle}>{item.title}</h4>
                                <p style={styles.manageMeta}>{item.date} • {item.location}</p>
                            </div>
                            <button onClick={() => removeItem(item.id)} style={styles.deleteBtn} title="Delete Post">🗑️</button>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>No items to manage.</p>
                )}
            </div>
        </Layout>
    );
};

const styles = {
    stats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        margin: '10px 0 24px',
    },
    statCard: {
        textAlign: 'center',
        padding: '12px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    manageCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
    },
    manageInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    manageTitle: {
        fontSize: '0.95rem',
        fontWeight: '600',
    },
    manageMeta: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
    },
    deleteBtn: {
        padding: '8px',
        fontSize: '1.2rem',
        color: 'var(--error)',
    },
    denied: {
        textAlign: 'center',
        padding: '60px 20px',
        color: 'var(--text)',
    }
};

export default Admin;
