import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Persistent initial state for user
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('findit_user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (e) {
            return null;
        }
    });

    // Persistent initial state for items
    const [items, setItems] = useState(() => {
        try {
            const savedItems = localStorage.getItem('findit_items');
            return savedItems ? JSON.parse(savedItems) : [
                {
                    id: 1,
                    title: 'iPhone 13 Pro',
                    category: 'Electronics',
                    location: 'College Cafeteria',
                    date: '2026-02-10',
                    status: 'Lost',
                    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=300&fit=crop',
                    contact: '9876543210',
                    description: 'Blue iPhone 13 Pro with a clear case. Lost near the coffee machine.'
                },
                {
                    id: 2,
                    title: 'Black Leather Wallet',
                    category: 'Wallet',
                    location: 'Library, 2nd Floor',
                    date: '2026-02-11',
                    status: 'Found',
                    image: 'https://images.unsplash.com/photo-1624855020412-23f2b43b6e8a?w=400&h=300&fit=crop',
                    contact: 'Admin',
                    description: 'Black leather wallet containing some cash and a student library card.'
                },
                {
                    id: 3,
                    title: 'Student ID Card',
                    category: 'ID Card',
                    location: 'Main Gate',
                    date: '2026-02-12',
                    status: 'Found',
                    image: 'https://images.unsplash.com/photo-1610332858313-0941ad2ea874?w=400&h=300&fit=crop',
                    contact: 'Security Office',
                    description: 'ID card for a first-year student. Found lying near the entrance.'
                }
            ];
        } catch (e) {
            return [];
        }
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    // Persistence Effects
    useEffect(() => {
        if (user) {
            localStorage.setItem('findit_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('findit_user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('findit_items', JSON.stringify(items));
    }, [items]);

    // Navigation Helper
    const navigate = (path) => {
        window.history.pushState({}, '', path);
        setCurrentPath(path);
    };

    // Global listener for back button
    useEffect(() => {
        const handlePopState = () => setCurrentPath(window.location.pathname);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const login = (userData) => setUser(userData);
    const logout = () => {
        setUser(null);
        localStorage.removeItem('findit_user');
        navigate('/');
    };

    const addItem = (newItem) => {
        setItems((prev) => [{ id: Date.now(), ...newItem }, ...prev]);
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter(item => item.id !== id));
    };

    const isAdmin = user?.email === 'admin@findit.com';

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <AppContext.Provider value={{
            user, login, logout, isAdmin,
            items: filteredItems,
            allItems: items,
            addItem, removeItem,
            searchQuery, setSearchQuery,
            filterCategory, setFilterCategory,
            currentPath, navigate
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
