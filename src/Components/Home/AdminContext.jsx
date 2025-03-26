import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // This endpoint should verify if the user is an admin
          // You may need to adjust this based on your actual API
          const response = await axios.get('https://monilmeh.pythonanywhere.com/api/user-profile/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          // Set admin status based on user role from backend
          setIsAdmin(response.data.is_staff || response.data.is_superuser || false);
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
