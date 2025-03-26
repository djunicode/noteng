import React from 'react';
import { MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

function Sidebarresponsive() {
  return (
    <motion.div 
      className='flex w-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className='flex bg-custom-blue p-5 w-full'>
        <motion.div 
          className='h-8 w-8 bg-white flex items-center justify-center rounded-md shadow-sm'
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreVertical size={20} color="#394DFD" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Sidebarresponsive;