import React from 'react';
import Layout from '../components/Layout';
import ItemCard from '../components/ItemCard';
import { useApp } from '../context/AppContext';

const Listing = () => {
    const { items, searchQuery, setSearchQuery, filterCategory, setFilterCategory } = useApp();

    const categories = ['All', 'Mobile', 'Wallet', 'ID Card', 'Pets', 'Electronics', 'Others'];

    return (
        <Layout title="Browse Items">
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.searchInput}
                />
                <div style={styles.filterScroll}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={filterCategory === cat ? 'btn-primary' : 'btn-soft'}
                            style={{ ...styles.filterTab, ...(filterCategory === cat ? styles.filterTabActive : {}) }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.list}>
                {items.length > 0 ? (
                    items.map(item => <ItemCard key={item.id} item={item} />)
                ) : (
                    <div style={styles.emptyState}>
                        <p>No items found matching your search.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

const styles = {
    searchContainer: {
        margin: '10px 0 24px',
        position: 'sticky',
        top: '20px',
        background: 'var(--surface)',
        zIndex: 10,
        paddingBottom: '10px',
    },
    searchInput: {
        marginBottom: '16px',
    },
    filterScroll: {
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        scrollbarWidth: 'none',
    },
    filterTab: {
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.85rem',
        whiteSpace: 'nowrap',
        fontWeight: '500',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px 0',
        color: 'var(--text-muted)',
    }
};

export default Listing;
