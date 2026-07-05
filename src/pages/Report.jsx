import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';

const Report = () => {
    const { addItem, user, navigate } = useApp();
    const fileInputRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Mobile',
        location: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Lost',
        contact: user?.email || '',
        image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703a0?w=400&h=300&fit=crop',
        description: ''
    });

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Layout title="Report Sent">
                <div style={styles.successState} className="animate-fade-in">
                    <div style={styles.successIcon}>🎉</div>
                    <h2>Thank you!</h2>
                    <p>Your report has been successfully posted. We hope you find what you're looking for.</p>
                    <button className="btn-primary btn" onClick={() => navigate('/')}>
                        Go Back Home
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Report Item" showBack={true}>
            <form onSubmit={handleSubmit} style={styles.form} className="animate-slide-up">
                <div style={styles.field}>
                    <label style={styles.label}>Item Status</label>
                    <div style={styles.toggleGroup}>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: 'Lost' })}
                            className={formData.status === 'Lost' ? 'btn-primary' : 'btn-soft'}
                            style={styles.toggleBtn}
                        > Lost </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, status: 'Found' })}
                            className={formData.status === 'Found' ? 'btn-primary' : 'btn-soft'}
                            style={styles.toggleBtn}
                        > Found </button>
                    </div>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Item Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Blue Backpack"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div style={styles.row}>
                    <div style={styles.field}>
                        <label style={styles.label}>Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option>Mobile</option>
                            <option>Wallet</option>
                            <option>ID Card</option>
                            <option>Electronics</option>
                            <option>Pets</option>
                            <option>Others</option>
                        </select>
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Date</label>
                        <input
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Location</label>
                    <input
                        type="text"
                        placeholder="e.g. Library Hall A"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Description (Optional)</label>
                    <textarea
                        placeholder="Describe the item in detail..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3"
                        style={{ resize: 'none' }}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Contact Detail</label>
                    <input
                        type="text"
                        placeholder="Phone number or email"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Item Photo</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                    <div
                        style={{
                            ...styles.uploadBox,
                            backgroundImage: formData.image.startsWith('data:') ? `url(${formData.image})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: formData.image.startsWith('data:') ? 'none' : '2px dashed var(--border)'
                        }}
                        onClick={handleFileClick}
                    >
                        {!formData.image.startsWith('data:') && <span>📷 Tap to upload photo</span>}
                        {formData.image.startsWith('data:') && (
                            <div style={styles.changePhotoOverlay}>
                                <span>Change Photo</span>
                            </div>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn-primary btn" style={styles.submitBtn}>
                    Submit Report
                </button>
            </form>
        </Layout>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '10px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
    },
    row: {
        display: 'flex',
        gap: '16px',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '600',
        color: 'var(--text)',
    },
    toggleGroup: {
        display: 'flex',
        gap: '8px',
    },
    toggleBtn: {
        flex: 1,
        padding: '10px',
        borderRadius: 'var(--radius-md)',
    },
    uploadBox: {
        height: '180px',
        border: '2px dashed var(--border)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        background: '#f1f5f9',
    },
    changePhotoOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0,0,0,0.5)',
        color: 'white',
        padding: '8px',
        textAlign: 'center',
        fontSize: '0.8rem',
    },
    submitBtn: {
        marginTop: '10px',
        padding: '16px',
    },
    successState: {
        textAlign: 'center',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    successIcon: {
        fontSize: '4rem',
    }
};

export default Report;
