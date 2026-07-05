import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Login = () => {
    const { login, navigate } = useApp();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        login({
            name: formData.name || formData.email.split('@')[0],
            email: formData.email
        });
        navigate('/');
    };

    return (
        <div className="container" style={styles.container}>
            <div style={styles.card} className="animate-slide-up">
                <h1 style={styles.logo}>FindIt</h1>
                <p style={styles.subtitle}>{isSignup ? 'Create an account to start' : 'Welcome back!'}</p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {isSignup && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            style={styles.input}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        style={styles.input}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        style={styles.input}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button type="submit" className="btn-primary btn" style={styles.submitBtn}>
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <p style={styles.switchText}>
                    {isSignup ? "Already have an account?" : "Don't have an account?"}
                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        style={styles.switchBtn}
                    >
                        {isSignup ? 'Login' : 'Sign Up'}
                    </button>
                </p>
                <p style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Admin entry: admin@findit.com
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'var(--primary-soft)',
    },
    card: {
        background: 'var(--surface)',
        padding: '40px 30px',
        borderRadius: 'var(--radius-lg)',
        width: '100%',
        textAlign: 'center',
        boxShadow: 'var(--shadow-lg)',
    },
    logo: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: 'var(--primary)',
        marginBottom: '8px',
    },
    subtitle: {
        color: 'var(--text-muted)',
        marginBottom: '32px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    submitBtn: {
        marginTop: '8px',
    },
    switchText: {
        marginTop: '24px',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    },
    switchBtn: {
        color: 'var(--primary)',
        fontWeight: '600',
        marginLeft: '8px',
    }
};

export default Login;
