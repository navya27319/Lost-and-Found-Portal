import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

const ItemDetail = ({ id }) => {
    const { allItems, navigate } = useApp();
    const item = allItems.find(i => i.id === parseInt(id));
    const [showContact, setShowContact] = useState(false);

    if (!item) {
        return (
            <Layout title="Item Not Found" showBack={true}>
                <div style={styles.error}>
                    <p>The item you are looking for does not exist or has been removed.</p>
                    <button className="btn-primary btn" onClick={() => navigate('/listing')}>
                        Back to Listing
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Item Details" showBack={true}>
            <div className="animate-slide-up" style={styles.container}>
                <div style={styles.imageContainer}>
                    <img src={item.image} alt={item.title} style={styles.image} />
                    <span className={`badge badge-${item.status.toLowerCase()}`} style={styles.badge}>
                        {item.status}
                    </span>
                </div>

                <div style={styles.content}>
                    <div style={styles.header}>
                        <h2 style={styles.title}>{item.title}</h2>
                        <span style={styles.category}>{item.category}</span>
                    </div>

                    <div style={styles.infoRow}>
                        <span style={styles.infoItem}>📍 {item.location}</span>
                        <span style={styles.infoItem}>📅 {item.date}</span>
                    </div>

                    <div style={styles.descriptionSection}>
                        <h4 style={styles.sectionHeading}>Description</h4>
                        <p style={styles.description}>
                            {item.description || "No additional description provided for this item."}
                        </p>
                    </div>

                    {!showContact ? (
                        <button
                            className="btn-primary btn"
                            style={styles.actionBtn}
                            onClick={() => setShowContact(true)}
                        >
                            {item.status === 'Lost' ? 'I found this' : 'Contact Owner'}
                        </button>
                    ) : (
                        <div className="card animate-fade-in" style={styles.contactCard}>
                            <h4 style={styles.sectionHeading}>Contact Information</h4>
                            <p style={styles.contactVal}>{item.contact}</p>
                            <p style={styles.contactSub}>Please mention you found this on **FindIt**</p>
                            <button
                                className="btn-soft btn"
                                style={{ marginTop: '12px' }}
                                onClick={() => setShowContact(false)}
                            >
                                Hide Contact
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

const styles = {
    container: {
        marginTop: '10px',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '250px',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    badge: {
        position: 'absolute',
        top: '16px',
        right: '16px',
        boxShadow: 'var(--shadow)',
    },
    content: {
        padding: '24px 0',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '4px',
    },
    title: {
        fontSize: '1.6rem',
        fontWeight: '800',
        color: 'var(--text)',
    },
    category: {
        fontSize: '0.9rem',
        color: 'var(--primary)',
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    infoRow: {
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
    },
    descriptionSection: {
        marginBottom: '32px',
    },
    sectionHeading: {
        fontSize: '1rem',
        fontWeight: '700',
        marginBottom: '8px',
        color: 'var(--text)',
    },
    description: {
        fontSize: '1rem',
        lineHeight: '1.6',
        color: 'var(--text-muted)',
    },
    actionBtn: {
        padding: '16px',
        fontSize: '1.1rem',
    },
    contactCard: {
        textAlign: 'center',
        background: 'var(--primary-soft)',
        borderColor: 'var(--primary)',
    },
    contactVal: {
        fontSize: '1.4rem',
        fontWeight: '700',
        color: 'var(--primary)',
        margin: '8px 0',
    },
    contactSub: {
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
    },
    error: {
        textAlign: 'center',
        padding: '60px 20px',
        color: 'var(--text-muted)',
    }
};

export default ItemDetail;
