import React from 'react';
import { useApp } from '../context/AppContext';

const Layout = ({ children, title, showBack = false }) => {
    const { user, logout, currentPath, navigate, isAdmin } = useApp();

    const handleNav = (e, path) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <div className="container animate-fade-in">
            <header style={styles.header}>
                <div style={styles.navTop}>
                    {showBack ? (
                        <button onClick={() => window.history.back()} style={styles.backBtn}>←</button>
                    ) : (
                        <div style={styles.logo} onClick={() => navigate('/')}>FindIt</div>
                    )}
                    {user && (
                        <div style={styles.userProfile}>
                            <span style={styles.userName}>{user.name}</span>
                            <button onClick={logout} style={styles.logoutBtn}>Logout</button>
                        </div>
                    )}
                </div>
                {title && <h1 style={styles.pageTitle}>{title}</h1>}
            </header>

            <main style={styles.main}>
                {children}

                <footer style={styles.footer}>
                    this website was completed designed by Navya
                </footer>
            </main>

            <nav style={styles.bottomNav}>
                <NavLink icon="🏠" label="Home" path="/" active={currentPath === '/'} onClick={handleNav} />
                <NavLink icon="🔍" label="Listing" path="/listing" active={currentPath === '/listing'} onClick={handleNav} />
                <NavLink icon="➕" label="Report" path="/report" active={currentPath === '/report'} onClick={handleNav} />
                <NavLink icon="⚙️" label="Admin" path="/admin" active={currentPath === '/admin'} onClick={handleNav} />
            </nav>
        </div>
    );
};

const NavLink = ({ icon, label, path, active, onClick }) => (
    <a href={path} style={{ ...styles.navItem, color: active ? 'var(--primary)' : 'var(--text-muted)' }} onClick={(e) => onClick(e, path)}>
        <span style={{ ...styles.navIcon, transform: active ? 'scale(1.2)' : 'scale(1)' }}>{icon}</span>
        <span style={{ ...styles.navLabel, fontWeight: active ? '700' : '500' }}>{label}</span>
    </a>
);

const styles = {
    header: {
        padding: '24px 20px',
        background: 'var(--surface)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    },
    navTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    logo: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--primary)',
        letterSpacing: '-0.5px',
        cursor: 'pointer',
    },
    pageTitle: {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: 'var(--text)',
    },
    userProfile: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    userName: {
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    },
    logoutBtn: {
        fontSize: '0.8rem',
        color: 'var(--error)',
        fontWeight: '500',
    },
    backBtn: {
        fontSize: '1.5rem',
        color: 'var(--text)',
        padding: '4px 8px',
        marginLeft: '-8px',
    },
    main: {
        padding: '0 20px 80px 20px',
    },
    footer: {
        textAlign: 'center',
        padding: '8px 0',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        opacity: 0.8,
    },
    bottomNav: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        maxWidth: '500px',
        height: '70px',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
    },
    navItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        transition: 'all 0.3s ease',
        flex: 1,
    },
    navIcon: {
        fontSize: '1.2rem',
        transition: 'transform 0.3s ease',
    },
    navLabel: {
        fontSize: '0.7rem',
    }
};

export default Layout;
