import React from 'react';
import Layout from '../components/Layout';
import ItemCard from '../components/ItemCard';
import { useApp } from '../context/AppContext';

const Home = () => {
    const { items, navigate } = useApp();
    const recentItems = items.slice(0, 3);

    return (
        <Layout title="Find what you lost">
            <div style={styles.hero}>
                <div className="card" style={styles.actionCard} onClick={() => navigate('/report')}>
                    <div style={{ ...styles.iconBadge, background: '#fee2e2' }}>🚫</div>
                    <h3>Lost Item</h3>
                    <p>Report something you lost</p>
                </div>
                <div className="card" style={styles.actionCard} onClick={() => navigate('/report')}>
                    <div style={{ ...styles.iconBadge, background: '#dcfce7' }}>✅</div>
                    <h3>Found Item</h3>
                    <p>Report something you found</p>
                </div>
            </div>

            <div className="section-title">
                <span>Recent Posts</span>
                <button onClick={() => navigate('/listing')} style={styles.viewAll}>View All →</button>
            </div>

            <div style={styles.list}>
                {recentItems.length > 0 ? (
                    recentItems.map(item => <ItemCard key={item.id} item={item} />)
                ) : (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No recent posts.</p>
                )}
            </div>
        </Layout>
    );
};

const styles = {
    hero: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        margin: '20px 0',
    },
    actionCard: {
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },
    iconBadge: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        marginBottom: '4px',
    },
    viewAll: {
        fontSize: '0.9rem',
        color: 'var(--primary)',
        fontWeight: '600',
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    }
};

export default Home;
