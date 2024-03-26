// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import PageHeader from 'src/@core/components/page-header'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Icon from 'src/@core/components/icon'
import { ChangeEvent } from 'react'
import Slider from '@mui/material/Slider'

// ** MUI Import
import MenuItem from '@mui/material/MenuItem'
import TableColumns from './TableColumns'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import ImageComponent from './ImageComponent'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { Utilisateur } from '../TableStickyHeader'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

interface InfoMarshandiserProps {
  marshandiser?: Utilisateur; // Utilisateur ou undefined
  showMarshan: boolean;
  setShowMarshan: any;
}

const InfoMarshandiser = ({ marshandiser, showMarshan, setShowMarshan }: InfoMarshandiserProps) => {
  // ** States

  const handleClose = () => {
    setShowMarshan(false)
  }

  return (
    <Drawer
      open={showMarshan} // Contrôle l'ouverture et la fermeture du Drawer
      anchor='right' // Ancre le Drawer à droite
      variant='temporary' // Permet au Drawer de s'ouvrir et de se fermer
      onClose={handleClose} // Appelé lorsque le Drawer est fermé
      ModalProps={{ keepMounted: true }} // Permet au Drawer d'être rendu dans le DOM même s'il est fermé
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: 1000, sm: 1000 }, // Largeur du Drawer pour les tailles d'écran xs et sm
          marginTop: '200px', // Marge haute du Drawer
          paddingBottom: '20px', // Marge basse du Drawer
          height: '50%' // Hauteur du Drawer
        }
      }}
    >
      <div>
        <Header>
          <Icon icon="tabler:question-mark"/>
          <PageHeader title={<Typography variant='h1'>Detail & Informations</Typography>} />
          <IconButton
            size='small'
            onClick={handleClose}
            sx={{
              p: '0.438rem',
              borderRadius: 1,
              color: 'text.primary',
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
              }
            }}
          >
            <Icon icon='tabler:x' fontSize='1.125rem' />
          </IconButton>
        </Header>
            <Box marginLeft={6} >
        <Grid container spacing={6}>
          <Grid item sm={6} xs={12} sx={{ paddingRight: '16px' }}>
            <CustomTextField fullWidth label='Nom' placeholder='Nom' value={marshandiser?.nom || ''} />
          </Grid>
          <Grid item sm={6} xs={12} sx={{ paddingLeft: '16px' }}>
            <CustomTextField fullWidth label='Prenom' placeholder='Prenom' value={marshandiser?.prenom || ''} />
          </Grid>

          <Grid item sm={6} xs={12} sx={{ paddingRight: '16px' }}>
            <CustomTextField
              fullWidth
              label='Email'
              placeholder='johnDoe@email.com'
              value={marshandiser?.email || ''}
            />
          </Grid>
          <Grid item sm={6} xs={12} sx={{ paddingLeft: '16px' }}>
            <CustomTextField fullWidth label='Telephone' placeholder='Telephone' value={marshandiser?.telephone || ''} />
          </Grid>
        </Grid>
        </Box>
      </div>
    </Drawer>
  )
}

export default InfoMarshandiser
