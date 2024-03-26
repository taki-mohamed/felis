import PageHeader from 'src/@core/components/page-header';
import Button from '@mui/material/Button';
import Icon from 'src/@core/components/icon';
import Typography from '@mui/material/Typography';

import React, { useState } from 'react'
import User from "src/views/admin/user/user_info"
import DialogAddUser from 'src/views/admin/user/DialogAddUser';


function index() {
  const [toggle,setToggle]=useState<boolean>(false)
  return (
    <div>
      <PageHeader title={<Typography variant='h1'>User Profile</Typography>} />
      <Button
              variant='contained'
              startIcon={<Icon fontSize='1.25rem' icon='tabler:plus' />}
              sx={{ marginTop: '15px',marginBottom:'15px' }}
              onClick={()=>setToggle(true)}

            >
              Marshandiser
            </Button>
      <User />
      <DialogAddUser toggle={toggle} setToggle={setToggle} />
    </div>
  )
}

export default index

