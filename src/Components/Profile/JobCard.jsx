import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Briefcase, Trash2, Building, FileText } from 'lucide-react';

function JobCard({ job, onDelete, isAdmin }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ViewJob/${job.job_id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigation when delete icon is clicked
    onDelete(job.job_id);
  };

  const getModeColor = (mode) => {
    switch(mode.toLowerCase()) {
      case 'remote':
        return 'bg-green-100 text-green-700';
      case 'hybrid': 
        return 'bg-yellow-100 text-yellow-700';
      case 'offline':
      case 'online':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer h-full'
    >
      <div className='p-4 bg-gray-50 flex justify-between items-center border-b'>
        <div className="flex items-center">
          <Building className="mr-2 text-custom-blue" size={18} />
          <h3 className='font-bold text-lg text-gray-800'>{job.company}</h3>
        </div>
        <Trash2 
          size={18}
          className='text-gray-400 hover:text-red-500 cursor-pointer transition-colors' 
          onClick={handleDeleteClick}
        />
      </div>
      
      <div className='p-4 flex flex-col flex-grow'>
        <div className='mb-3'>
          <h4 className='text-lg font-semibold text-custom-blue mb-1'>{job.job_title}</h4>
        </div>
        
        <p className='text-gray-700 mb-4 line-clamp-4 flex-grow'>{job.description}</p>
        
        <div className="mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <FileText size={14} className="mr-1 text-custom-blue" />
            <span className="font-medium">Requirements:</span>
          </div>
          <p className="text-xs text-gray-500 line-clamp-2 ml-5 mt-1">{job.requirements}</p>
        </div>
        
        <div className='border-t border-gray-200 pt-3 mt-auto'>
          <p className='text-sm text-gray-600 mb-2'>
            <span className='font-medium'>Contact:</span> {job.contact_no}
          </p>
          
          <div className='grid grid-cols-2 gap-2 mt-3'>
            <div className='flex items-center text-gray-600 text-sm'>
              <Calendar className="w-4 h-4 mr-1 text-custom-blue" size={16} />
              {job.duration_in_months} months
            </div>
            <div className='flex items-center text-gray-600 text-sm'>
              <MapPin className="w-4 h-4 mr-1 text-custom-blue" size={16} />
              {job.location}
            </div>
            <div className='flex items-center text-gray-600 text-sm'>
              <Clock className="w-4 h-4 mr-1 text-custom-blue" size={16} />
              {new Date(job.upload_time).toLocaleDateString()}
            </div>
            <div className='flex items-center justify-end'>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${job.subtype === 'internship' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {job.subtype}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ml-2 ${getModeColor(job.mode)}`}>
                {job.mode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
