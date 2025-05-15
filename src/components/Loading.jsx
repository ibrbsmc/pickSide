import React from 'react';
import '../css/Loading.css'; // İsteğe bağlı stil dosyası
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const Loading = () => {
  return (
    <div className='loa-div'>
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
    <p>Loading ...</p>
    </div>
  );
};

export default Loading;