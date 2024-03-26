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
import { Visite } from '../TableStickyHeader'

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

// interface Visite {
//   h_db: string
//   h_fin: string
//   pointDeVente: string
//   statut: string
//   date: string
//   conform: boolean | null
// }

interface ProduitVisite {
  visite: Visite
  showProduit: any
  setShowProduit: any
}

interface Family {
  id: number
  name: string
  subfamilies: (string | null)[]
}

const families: Family[] = [
  { id: 1, name: 'Family 1', subfamilies: ['Subfamily 1.1', 'Subfamily 1.2', 'Subfamily 1.3'] },
  { id: 2, name: 'Family 2', subfamilies: ['Subfamily 2.1', 'Subfamily 2.2'] },
  { id: 3, name: 'Family 3', subfamilies: [null] }
]

const SidebarProduit = ({ visite, showProduit, setShowProduit }: ProduitVisite) => {
  // ** States
  const [selectedFamily, setSelectedFamily] = useState<string>('')
  const [selectedSubFamily, setSelectedSubFamily] = useState<string>('')
  const [img, setImg] = useState<boolean>(false)
  const [url, setUrl] = useState<string>('/images/agenda/calendar.png')
  const [open,setOpen]=useState<boolean>(false)

  const handleFamilyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedFamily(event.target.value as string)
    setSelectedSubFamily('') // Reset selected subfamily when family changes
    setImg(true)
  }

  const handleSubFamilyChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedSubFamily(event.target.value as string)
  }

  const handleClose = () => {
    setShowProduit(false)
  }

  // Filtered rows based on selected family and subfamily
  // const filteredRows = rows.filter(row => {
  //   if (!selectedFamily && !selectedSubFamily) return true
  //   if (selectedSubFamily) return row.sub_family === selectedSubFamily && row.family === selectedFamily
  //   return row.family === selectedFamily
  // })

  return (
    <Drawer
      open={showProduit} // Contrôle l'ouverture et la fermeture du Drawer
      anchor='right' // Ancre le Drawer à droite
      variant='temporary' // Permet au Drawer de s'ouvrir et de se fermer
      onClose={handleClose} // Appelé lorsque le Drawer est fermé
      ModalProps={{ keepMounted: true }} // Permet au Drawer d'être rendu dans le DOM même s'il est fermé
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: 1300, sm: 1300 }, // Largeur du Drawer pour les tailles d'écran xs et sm
          marginTop: '90px', // Marge haute du Drawer
          paddingBottom: '20px', // Marge basse du Drawer
          height: '86%' // Hauteur du Drawer
        }
      }}
    >
      <div>

        <Header>
          <PageHeader title={<Typography variant='h1' marginLeft={10}>Detail & Informations sur l'evenement</Typography>} />
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
        <Card>
          <CardContent style={{ justifyContent: 'space-between' }}>
            <Grid container spacing={2} alignItems='center'>
              {/* Point de Vente */}
              <Grid item xs={12} md={4}>
                {visite.conform ? (
                  <Card
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      paddingLeft: '0%',
                      backgroundColor: '#BEF264',
                      width: '40px',
                      height:'40%'
                    }}
                  >
                    <p
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        color: 'white',
                        position: 'absolute',
                        bottom: '30%',
                        left: '-68%',
                        fontSize:"30px"
                      }}
                    >
                      Conforme
                    </p>
                  </Card>
                ) : visite.conform === false ? (
                  <Card
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      paddingLeft: '0%',
                      backgroundColor: 'red',
                      width: '40px',
                      height:'40%'
                    }}
                  >
                    <p
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        color: 'white',
                        position: 'absolute',
                        bottom: '30%',
                        left: '-68%',
                        fontSize:"25px",
                      }}
                    >
                      Non Conforme
                    </p>
                  </Card>
                ) : null}

                <Typography variant='h2' style={{ color: '#800080' }} marginLeft={10}>
                  {visite.pointDeVente.nom}
                </Typography>
                <Typography marginLeft={10}>
                  <span style={{ fontSize: '15px', fontWeight: 'bold' }}>Date de visite :</span> {visite.date}
                  <br />
                  <span style={{ fontSize: '15px', fontWeight: 'bold' }}> L'heure de visite : </span>{' '}
                  {`${visite.h_db}-${visite.h_fin}`}
                </Typography>
              </Grid>

              {/* Select Famille */}
              <Grid item xs={12} md={4}>
                <CustomTextField
                  select
                  fullWidth
                  label='Select Family'
                  value={selectedFamily}
                  onChange={handleFamilyChange}
                >
                  <MenuItem value=''>Select Family</MenuItem>
                  {families.map(family => (
                    <MenuItem key={family.id} value={family.name}>
                      {family.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              {/* Select Sous-famille */}
              <Grid item xs={12} md={4}>
                {selectedFamily && (
                  <CustomTextField
                    select
                    fullWidth
                    label='Select Subfamily'
                    value={selectedSubFamily}
                    onChange={handleSubFamilyChange}
                    sx={{ '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
                  >
                    <MenuItem value=''>Select Sous-family</MenuItem>
                    {/* Conditionally render subfamilies menu items */}
                    {selectedFamily &&
                      families
                        .find(family => family.name === selectedFamily)
                        ?.subfamilies.map(subfamily =>
                          subfamily !== null ? (
                            <MenuItem key={subfamily} value={subfamily}>
                              {subfamily}
                            </MenuItem>
                          ) : null
                        )}
                  </CustomTextField>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
       

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
            <TableColumns />
          </Grid>

          {img ? (
            <Grid item xs={4}>
              <Grid container direction='column' spacing={1}>
                <Grid container justifyContent='center' alignItems='center' marginBottom={5}>
                  <Grid item>
                    <Box sx={{ minWidth: 275 }}>
                      <Typography align='center' variant='h5'>
                        Image Avant:
                      </Typography>
                      <Box sx={{ marginBottom: 2 }}>
                        <Card variant='outlined'>
                          <ImageComponent url={url}/>
                        </Card>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Grid container justifyContent='center' alignItems='center' marginBottom={5}>
                  <Grid item>
                    <Box sx={{ minWidth: 275 }}>
                      <Typography align='center' variant='h5'>
                        Image Apres:
                      </Typography>
                      <Box sx={{ marginBottom: 2 }}>
                        <Card variant='outlined'>

                          <ImageComponent url={url}  />

                        </Card>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </div>
    </Drawer>
  )
}

export default SidebarProduit
