import React, { useState, useEffect } from 'react';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Alert, Snackbar } from '@mui/material';
import BackButton from '../../assets/BackButton.png';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';

function UploadNotes() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    notesTitle: '',
    department: '',
    year: '',
    subject: '',
    notesDescription: '',
    rating: 4,
    document: null,
    type: '',
    user: '60004220207'
  });
  const [fileName, setFileName] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const token = localStorage.getItem('token');

  const DEPARTMENT_CHOICES = [
    {value: 'CS', label: 'Computer Science'},
    {value: 'IT', label: 'Information Technology'},
    {value: 'AIML', label: 'AI & Machine Learning'},
    {value: 'AIDS', label: 'AI & Data Science'},
    {value: 'DS', label: 'Data Science'},
    {value: 'IOT', label: 'Internet of Things'},
    {value: 'EXTC', label: 'Electronics & Telecommunication'},
    {value: 'ME', label: 'Mechanical Engineering'},
  ];

  const YEAR_CHOICES = [
    {value: '1', label: 'Year 1'},
    {value: '2', label: 'Year 2'},
    {value: '3', label: 'Year 3'},
    {value: '4', label: 'Year 4'},
  ];

  // Subject mapping by year
  const SUBJECTS_BY_YEAR = {
    '1': [
      'Mathematics I',
      'Mathematics II',
      'Physics I',
      'Physics II',
      'Chemistry',
      'Programming Fundamentals',
      'Computer Organization',
      'English Communication',
      'Engineering Drawing',
      'Environmental Science',
      'Workshop Practice',
      'Basic Electrical Engineering',
      'Basic Electronics Engineering',
      'Engineering Mechanics',
      'Engineering Thermodynamics',
      'Introduction to AI & ML',
      'Introduction to Cybersecurity',
      'Introduction to Quantum Computing',
      'Engineering Mathematics',
      'Technical Writing and Communication',
      'Other'
    ],
    '2': [
      'Data Structures',
      'Discrete Mathematics',
      'Digital Logic Design',
      'Object-Oriented Programming',
      'Database Management Systems',
      'Computer Networks',
      'Operating Systems',
      'Software Engineering',
      'Theory of Computation',
      'Web Technologies',
      'Design and Analysis of Algorithms',
      'Computer Graphics',
      'Numerical Methods',
      'Signals and Systems',
      'Embedded Systems',
      'Control Systems',
      'Microcontrollers and Interfacing',
      'Probability and Statistics',
      'Analog and Digital Communication',
      'Artificial Neural Networks',
      'Software Project Management',
      'Automata Theory',
      'Instrumentation and Measurement',
      'Digital Electronics',
      'Artificial Intelligence Ethics',
      'Introduction to Cloud Computing',
      'Virtual Reality and Augmented Reality',
      'Linear Algebra for Machine Learning',
      'Other'
    ],
    '3': [
      'Algorithm Design and Analysis',
      'Compiler Design',
      'Microprocessors and Microcontrollers',
      'Mobile App Development',
      'Artificial Intelligence',
      'Machine Learning',
      'Information Security',
      'Human-Computer Interaction',
      'Cloud Computing',
      'Data Mining',
      'Parallel and Distributed Computing',
      'Wireless Communication',
      'Bioinformatics',
      'Cybersecurity and Ethical Hacking',
      'Quantum Computing',
      'Natural Language Processing',
      'Soft Computing',
      'Pattern Recognition',
      'Simulation and Modeling',
      'Digital Image Processing',
      'Cryptography',
      'Intelligent Systems',
      'Software Design Patterns',
      'Deep Learning',
      'Social Network Analysis',
      'IoT Security and Privacy',
      'High-Performance Computing',
      'Blockchain and Smart Contracts',
      'Software Reliability Engineering',
      'Big Data Analytics',
      'Medical Image Processing',
      'Game Development and Simulation',
      'Human-AI Interaction',
      'Data Engineering',
      'Other'
    ],
    '4': [
      'Distributed Systems',
      'Big Data Technologies',
      'Blockchain Technology',
      'Internet of Things (IoT)',
      'Advanced Database Management',
      'Software Testing and Quality Assurance',
      'Project Management',
      'Capstone Project / Thesis',
      'Professional Ethics and Cyber Law',
      'Electives',
      'Cloud Security',
      'Virtualization and Cloud Computing',
      'Bio-Inspired Computing',
      'Computational Biology',
      'Game Theory',
      'High-Performance Computing',
      'Robotics and Automation',
      'Digital Forensics',
      'Automata Theory and Applications',
      'Digital Signal Processing',
      'Edge Computing',
      'Smart Grid Technologies',
      'Cognitive Computing',
      'Usability Engineering',
      'Knowledge Representation and Reasoning',
      'Quantum Cryptography',
      'Explainable AI',
      'Self-Driving Car Technologies',
      'Gesture Recognition',
      'Hardware Security and Trust',
      'Wireless Ad Hoc Networks',
      'Cyber-Physical Systems',
      'Computer-Aided Design (CAD)',
      'Neurocomputing',
      'Other'
    ],
    'electives': [
      'Natural Language Processing',
      'Computer Vision',
      'Robotics',
      'Augmented and Virtual Reality',
      'Game Development',
      'Network Security',
      'Data Visualization',
      'Embedded Systems',
      'Wearable Computing',
      'Reinforcement Learning',
      'Social Network Analysis',
      'Quantum Cryptography',
      'Human-Robot Interaction',
      'Computational Geometry',
      'Fuzzy Logic and Applications',
      'Bioinformatics Algorithms',
      'Software Defined Networking (SDN)',
      'Wireless Sensor Networks',
      'Internet Security and Privacy',
      'Ethical Hacking',
      'Swarm Intelligence',
      'Cognitive Radio Networks',
      'Human-Centered AI',
      'Digital Twins',
      'AI for Healthcare',
      'Speech Recognition and Processing',
      'Multimodal AI',
      'AI and Law',
      'Smart Cities and IoT',
      'Data Governance and Compliance',
      'Sustainable Computing',
      'Computational Neuroscience'
    ]
  };
  

  // Update available subjects when year changes
  useEffect(() => {
    if (formData.year) {
      setAvailableSubjects(SUBJECTS_BY_YEAR[formData.year] || []);
      setFormData(prev => ({ ...prev, subject: '' })); // Reset subject when year changes
    }
  }, [formData.year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({...notification, open: false});
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (limit to 25MB)
    const maxSize = 25 * 1024 * 1024; // 25MB in bytes
    if (file.size > maxSize) {
      showNotification('File is too large. Please select a file under 25MB.', 'error');
      return;
    }
    
    setFormData({
      ...formData,
      document: file
    });
    setFileName(file.name);
    
    // Create file preview
    const fileType = file.type;
    const reader = new FileReader();
    
    reader.onload = () => {
      setFilePreview({
        url: fileType.includes('image/') ? reader.result : null,
        type: fileType,
        size: (file.size / 1024 / 1024).toFixed(2), // in MB
        name: file.name
      });
    };
    
    if (fileType.includes('image/')) {
      reader.readAsDataURL(file);
    } else {
      reader.readAsArrayBuffer(file); // just to trigger onload
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.document) {
      showNotification('Please upload a document', 'error');
      return;
    }

    const endpoint = 'https://monilmeh.pythonanywhere.com/api/notes/';
    const form = new FormData();

    form.append('note_title', formData.notesTitle);
    form.append('subject', formData.subject);
    form.append('department', formData.department);
    form.append('note_description', formData.notesDescription);
    form.append('type', formData.type);
    form.append('document', formData.document);
    form.append('user', formData.user);

    try {
      const response = await axios.post(endpoint, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        showNotification('Notes uploaded successfully!');
        navigate('/');
        setFormData({
          notesTitle: '',
          subject: '',
          department: '',
          notesDescription: '',
          rating: 4,
          type: '',
          document: null,
          user: '60004220207'
        });
        setFileName('');
        setFilePreview(null);
      } else {
        showNotification('Failed to upload notes', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      
      // Check for specific error types
      if (error.response && error.response.data) {
        if (error.response.data.document && 
            error.response.data.document.includes('File too large')) {
          showNotification('File is too large. Please select a smaller file.', 'error');
        } else {
          showNotification('An error occurred while uploading. Please try again later.', 'error');
        }
      } else {
        showNotification('Network error. Please check your connection and try again.', 'error');
      }
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileUpload').click();
  };
  
  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  // Helper function to get icon based on file type
  const getFileIcon = (fileType) => {
    if (!fileType) return <InsertDriveFileIcon fontSize="large" />;
    
    if (fileType.includes('pdf')) {
      return <PictureAsPdfIcon fontSize="large" color="error" />;
    } else if (fileType.includes('word') || fileType.includes('doc')) {
      return <DescriptionIcon fontSize="large" color="primary" />;
    } else {
      return <InsertDriveFileIcon fontSize="large" color="action" />;
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <div className='flex flex-row items-center'>
        <Button className='h-20' onClick={handleGoBack}>
          <img src={BackButton} alt='Back' />
        </Button>
        <p className='flex items-center justify-center md:justify-start md:ml-6'>
          <span className='flex font-bold text-[35px]'>Upload Notes</span>
        </p>
      </div>
      <div className='ml-6 w-[78vw] border-b-2'></div>
      
      <div className='flex flex-col lg:flex-row gap-6 px-6 mt-4'>
        <div className='flex flex-col w-full lg:w-1/2'>
          <div className="mb-6">
            <p className='text-[20px] mb-2'>Notes Title</p>
            <TextField
              name='notesTitle'
              value={formData.notesTitle}
              onChange={handleChange}
              placeholder='Enter Notes title'
              variant="outlined"
              fullWidth
              className='inputarea'
            />
          </div>

          <div className="mb-6">
            <p className='text-[20px] mb-2'>Department</p>
            <FormControl fullWidth variant="outlined" className="inputarea">
              <Select
                name="department"
                value={formData.department}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Department</MenuItem>
                {DEPARTMENT_CHOICES.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="mb-6">
            <p className='text-[20px] mb-2'>Year</p>
            <FormControl fullWidth variant="outlined" className="inputarea">
              <Select
                name="year"
                value={formData.year}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>Select Year</MenuItem>
                {YEAR_CHOICES.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="mb-6">
            <p className='text-[20px] mb-2'>Subject</p>
            <FormControl fullWidth variant="outlined" className="inputarea" disabled={!formData.year}>
              <Select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  {formData.year ? 'Select Subject' : 'Please select a year first'}
                </MenuItem>
                {availableSubjects.map(subject => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="mb-6">
            <p className='text-[20px] mb-2'>Notes Description</p>
            <TextField
              name='notesDescription'
              value={formData.notesDescription}
              onChange={handleChange}
              placeholder='Enter Notes Description'
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              className='inputarea'
            />
          </div>
          
          <div className='mt-4 mb-6'>
            <p className='text-[20px] mb-2'>Upload Document</p>
            <div 
              className='flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50'
              onClick={handleButtonClick}
            >
              <div className='flex flex-col items-center'>
                <CloudUploadOutlinedIcon fontSize="large" />
                <p className='mt-2'>Click to upload</p>
                <p className='text-sm text-gray-500'>PDF, DOCX, or images</p>
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='hidden'
                  id='fileUpload'
                />
              </div>
            </div>
          </div>

          <button 
            onClick={handleSubmit} 
            className='w-full bg-custom-blue py-4 rounded-lg text-white mt-4'
          >
            Add New Notes
          </button>
        </div>
        
        <div className='flex flex-col w-full lg:w-1/2'>
          <div className='bg-gray-100 rounded-lg p-6 h-full'>
            <h3 className='text-xl font-semibold mb-4'>Document Preview</h3>
            
            {filePreview ? (
              <div className='flex flex-col items-center justify-center'>
                {filePreview.url ? (
                  <img 
                    src={filePreview.url} 
                    alt="Preview" 
                    className='max-w-full max-h-64 rounded-lg mb-4' 
                  />
                ) : (
                  <div className='flex flex-col items-center p-8 mb-4'>
                    {getFileIcon(filePreview.type)}
                    <p className='mt-2 text-lg'>Document Ready</p>
                  </div>
                )}
                
                <div className='w-full bg-white p-4 rounded-lg'>
                  <p className='font-medium mb-1 truncate'>{filePreview.name}</p>
                  <div className='flex justify-between text-sm text-gray-600'>
                    <span>{filePreview.type.split('/')[1].toUpperCase()}</span>
                    <span>{filePreview.size} MB</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center h-64 text-gray-400'>
                <InsertDriveFileIcon fontSize="large" />
                <p className='mt-2'>No document uploaded</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadNotes;
