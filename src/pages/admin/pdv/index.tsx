import PageHeader from 'src/@core/components/page-header'
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import PDV from 'src/views/admin/pdv/PDV'
import DialogAddPDV from 'src/views/admin/pdv/DialogAddPDV'

function index() {
  const [show, setShow] = useState<boolean>(false)
  const [adminDataRow, setAdminDataRow] = useState<PDV[]>([])
  return (
    <div>
      <PageHeader title={<Typography variant='h1'>Point de Vente</Typography>} />
      <Button
        variant='contained'
        startIcon={<Icon fontSize='1.25rem' icon='tabler:plus' />}
        sx={{ marginTop: '15px', marginBottom: '15px' }}
        onClick={() => setShow(true)}
      >
        Point de Vente
      </Button>
      <PDV adminDataRow={adminDataRow} setAdminDataRow={setAdminDataRow} />
      <DialogAddPDV show={show} setShow={setShow} adminDataRow={adminDataRow} setAdminDataRow={setAdminDataRow}/>
    </div>
  )
}

export default index
