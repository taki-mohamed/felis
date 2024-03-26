import React, { useState } from 'react'
import ProduitInfo from "src/views/admin/produit/produitInfo"
import PageHeader from 'src/@core/components/page-header';
import Button from '@mui/material/Button';
import Icon from 'src/@core/components/icon';
import Typography from '@mui/material/Typography';
import DialogAddProduit from 'src/views/admin/produit/DialogAddProduit';



function index() {
  const [toggle,setToggle]=useState<boolean>(false)
  return (
    <>
    <PageHeader title={<Typography variant='h1'>Produit</Typography>} />
      <Button
              variant='contained'
              startIcon={<Icon fontSize='1.25rem' icon='tabler:plus' />}
              sx={{ marginTop: '15px',marginBottom:'15px' }}
              onClick={()=>setToggle(true)}

            >
              Produit
            </Button>
      <ProduitInfo/>
      <DialogAddProduit setToggle={setToggle} toggle={toggle} />
      </>
  )
}

export default index


