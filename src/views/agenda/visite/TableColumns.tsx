// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridRenderCellParams } from '@mui/x-data-grid'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '3.5rem', height: '3.5rem' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ mr: 3, fontSize: '.8rem', width: '3.5rem', height: '3.5rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

// ** Full Name Getter
const getFullName = (params: GridRenderCellParams) =>
  toast(
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {renderClient(params)}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
          {params.row.full_name}
        </Typography>
      </Box>
    </Box>
  )

  const TableColumns = () => {
    // ** States
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
    const [hideNameColumn, setHideNameColumn] = useState<GridColumnVisibilityModel>({ full_name: true })

    const columns: GridColDef[] = [
      {
        flex: 0.275, // Ajustement de la valeur de flex
        minWidth: 200,
        field: 'produit',
        headerName: 'Produit',
        renderCell: (params: GridRenderCellParams) => {
          const { row } = params
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {renderClient(params)}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                  {row.produit}
                </Typography>
              </Box>
            </Box>
          )
        }
      },
      {

        flex: 0.275, // Ajustement de la valeur de flex
        type: 'number',
        minWidth: 200,
        headerName: 'Shelf Sharing',
        field: 'shelf_sharing',
        renderCell: (params: GridRenderCellParams) => (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {params.row.shelf_sharing}
          </Typography>
        )
      },
      {
        flex: 0.275,
        minWidth: 150,
        field: 'prix',
        headerName: 'Prix',
        renderCell: (params: GridRenderCellParams) => {
          const textColor = params.row.prix < 100 ? 'red' : null;
          return (
            <Typography variant='body2' sx={{ color: textColor }}>
              {params.row.prix}
            </Typography>
          );
        }
      },
      {
        flex: 0.3,
        minWidth: 140,
        field: 'stock',
        headerName: 'Stock Rayon',
        renderCell: (params: GridRenderCellParams) => {
          const [minStock, maxStock] = params.row.stock;
          let sliderColor = maxStock < 250 ? 'red' : null;
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {maxStock < 250 ?
                  <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'red' }}></div>
                  :   <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'transparent' }}></div>}
                <input
                  type="range"
                  min={minStock}
                  max={maxStock}
                  value={params.row.stock}
                />
              </div>
            </>
          )
        }
      }


    ]

    return (
      <Card>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          columnVisibilityModel={hideNameColumn}
          onPaginationModelChange={setPaginationModel}
          onColumnVisibilityModelChange={newValue => setHideNameColumn(newValue)}
          rowHeight={90}
        />
      </Card>
    )
  }

export default TableColumns
