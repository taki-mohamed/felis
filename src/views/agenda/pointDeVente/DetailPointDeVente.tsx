// ** React Imports
import { ChangeEvent, useState, forwardRef, ReactElement, Ref } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'


// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Column {
  id: 'nomPointDeVente' | 'ville' | 'localisation' | 'region' | 'enseigne' // Champs mis à jour
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'nomPointDeVente', label: 'Nom de Point de Vente', minWidth: 300 },
  { id: 'ville', label: 'Ville', minWidth: 150 },
  { id: 'localisation', label: 'Localisation', minWidth: 150 },
  { id: 'region', label: 'Région', minWidth: 150 },
  { id: 'enseigne', label: 'Enseigne', minWidth: 150 }
]

interface PointDeVente {
  nomPointDeVente: string
  ville: string
  localisation: string
  region: string
  enseigne: string
}

function createPointDeVente(
  nomPointDeVente: string,
  ville: string,
  localisation: string,
  region: string,
  enseigne: string
): PointDeVente {
  return { nomPointDeVente, ville, localisation, region, enseigne }
}

const rows = [
  createPointDeVente('Point de Vente 1', 'Paris', 'France', 'Île-de-France', 'Enseigne 1'),
  createPointDeVente('Point de Vente 2', 'New York', 'USA', 'New York', 'Enseigne 2'),
  createPointDeVente('Point de Vente 3', 'London', 'UK', 'London', 'Enseigne 3'),
  createPointDeVente('Point de Vente 4', 'Berlin', 'Germany', 'Berlin', 'Enseigne 4'),
  createPointDeVente('Point de Vente 5', 'Tokyo', 'Japan', 'Tokyo', 'Enseigne 5')
]

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const DetailPoint = ({ showDetailPoint, setShowDetailPoint }: { showDetailPoint: any; setShowDetailPoint: any }) => {
  // ** States
  const [data] = useState<PointDeVente[]>(rows)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<PointDeVente[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)


  /**Search function */
  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Card>
      <Dialog
        fullWidth
        open={showDetailPoint}
        maxWidth='md'
        scroll='body'
        onClose={() => setShowDetailPoint(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowDetailPoint(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShowDetailPoint(false)}>
            {' '}
            {/* Utilisation de setShowDetail au lieu de setShow */}
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
            Rechercher Une Point De Vente
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ width: '100%', height: '400px' }} >
            <Table >
              <TableHead sx={{ backgroundColor: '#EBDEF0' }}>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth,color: "#9B59B6" }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>

                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.localisation}>
                      {columns.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DetailPoint
