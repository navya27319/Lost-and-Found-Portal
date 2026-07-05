import React from 'react';
import { useApp } from '../context/AppContext';

const ItemCard = ({ item }) => {
    const { navigate } = useApp();

    return (
        <div className="card animate-slide-up" style={styles.card} onClick={() => navigate(`/item/${item.id}`)}>
            <img src={item.image} alt={item.title} style={styles.image} />
            <div style={styles.content}>
                <div style={styles.header}>
                    <span className={`badge badge-${item.status.toLowerCase()}`}>
                        {item.status}
                    </span>
                    <span style={styles.category}>{item.category}</span>
                </div>
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.location}>📍 {item.location}</p>
                <div style={styles.footer}>
                    <span style={styles.date}>{item.date}</span>
                    <button className="btn-soft" style={styles.contactBtn}>View Details</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: {
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'pointer',
    },
    image: {
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        borderRadius: 'var(--radius-md)',
        background: '#eee',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    category: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        fontWeight: '500',
    },
    title: {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'var(--text)',
    },
    location: {
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '4px',
    },
    date: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
    },
    contactBtn: {
        padding: '6px 16px',
        fontSize: '0.8rem',
        width: 'auto',
    }
};

export default ItemCard;
