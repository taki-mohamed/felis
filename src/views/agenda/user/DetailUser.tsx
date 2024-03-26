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
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Column {
  id: 'poste' | 'nom' | 'prenom' | 'email' | 'telephone' // Utiliser des minuscules pour correspondre aux noms des propriétés dans Marshandiser
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'poste', label: 'Poste', minWidth: 170 },
  { id: 'nom', label: 'Nom', minWidth: 100 }, // Utiliser 'nom' au lieu de 'Nom'
  { id: 'prenom', label: 'Prénom', minWidth: 170 }, // Utiliser 'prenom' au lieu de 'Prenom'
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'telephone', label: 'Téléphone', minWidth: 170 }
]

interface Marshandiser {
  poste: string // Utiliser 'poste' au lieu de 'post'
  nom: string
  prenom: string
  email: string
  telephone: string
}

function createMarshandisers(
  poste: string,
  nom: string,
  prenom: string,
  email: string,
  telephone: string
): Marshandiser {
  return { poste, nom, prenom, email, telephone } // Utiliser 'poste' au lieu de 'post'
}

const rows = [
  createMarshandisers('soumia zahir', 'zahir', 'soumia', 'soumiazh@gmail.com', '+212710458502'),
  createMarshandisers('soumia zahir', 'zahir', 'soumia', 'soumiazh@gmail.com', '+212710458502'),
  createMarshandisers('soumia zahir', 'zahir', 'soumia', 'soumiazh@gmail.com', '+212710458502'),
  createMarshandisers('soumia zahir', 'zahir', 'soumia', 'soumiazh@gmail.com', '+212710458502'),
  createMarshandisers('soumia zahir', 'zahir', 'soumia', 'soumiazh@gmail.com', '+212710458502')
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

const DetailUser = ({ showDetail, setShowDetail }: { showDetail: any; setShowDetail: any }) => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

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
        open={showDetail}
        maxWidth='md'
        scroll='body'
        onClose={() => setShowDetail(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowDetail(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShowDetail(false)}>
            {' '}
            {/* Utilisation de setShowDetail au lieu de setShow */}
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
            Rechercher Un Merchandiser
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ width: '100%', height: '400px' }}>
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
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.telephone}>
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

export default DetailUser
