import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // First check localStorage for admin status
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus) {
      setIsAdmin(adminStatus === 'true');
      setLoading(false);
    } else {
      // Fallback to API call if not found in localStorage
      const checkAdminStatus = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await fetch('https://monilmeh.pythonanywhere.com/api/isAdmin/', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              setIsAdmin(data.is_admin);
              localStorage.setItem('isAdmin', data.is_admin);
            }
          } catch (error) {
            console.error('Error checking admin status:', error);
            setIsAdmin(false);
          } finally {
            setLoading(false);
          }
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      };
      
      checkAdminStatus();
    }
    
    // Listen for changes in localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'isAdmin') {
        setIsAdmin(e.newValue === 'true');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <AdminContext.Provider value={{ isAdmin, loading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
