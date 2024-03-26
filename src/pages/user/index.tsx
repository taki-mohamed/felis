import Typography from '@mui/material/Typography';
import React from 'react'
import PageHeader from 'src/@core/components/page-header'
import InfoUsers from "src/views/user/InfoUsers"
import Button from '@mui/material/Button';
import Icon from 'src/@core/components/icon';
import { Box } from '@mui/system';


function Index() {
  return (
    <>
    <Box sx={{ marginBottom: 8 }}>
      <PageHeader title={<Typography variant='h1'>User Profile</Typography>} />
    </Box>
      <InfoUsers />
    </>
  )
}

export default Index
