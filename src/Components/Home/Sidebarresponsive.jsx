import React from 'react';
import { MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

function Sidebarresponsive() {
  return (
    <motion.div 
      className='fixed top-4 left-4 z-100 pointer-events-none'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className='h-10 w-10 bg-white rounded-lg shadow-md flex items-center justify-center cursor-pointer pointer-events-auto'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9, backgroundColor: '#e6e6ff' }}
      >
        <MoreVertical size={24} color="#394DFD" />
      </motion.div>
    </motion.div>
  );
}

export default Sidebarresponsive;