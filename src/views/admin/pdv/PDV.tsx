import React, { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, useMediaQuery } from '@mui/material';
import { ThemeColor } from 'src/@core/layouts/types';
import { DataRowsUser } from 'src/@fake-db/types';
import QuickSearchToolbar from 'src/views/QuickSearchToolbar';
// import { Adminrow } from 'src/@fake-db/admin/PDV/static-data';
import { PDV } from 'src/@fake-db/types';



const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const PDV = ({adminDataRow, setAdminDataRow}:{adminDataRow:any, setAdminDataRow:any}) => {

  const [searchText, setSearchText] = useState<string>('');

  const [filteredData, setFilteredData] = useState<PDV[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  const columns: GridColDef[] = [
    {
      flex: 1,
      minWidth: 200,
      field: 'nom',
      headerName: 'Nom',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.nom}
            </Typography>

        );
      },
    },
    {
      flex: 1,
      minWidth: 110,
      field: 'ville',
      headerName: 'Ville',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.ville}
        </Typography>
      ),
    },
    {
      flex: 1,
      field: 'enseigne',
      minWidth: 200,
      headerName: 'Enseigne',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.enseigne}
        </Typography>
      ),
    },
    {
      flex: 1,
      field: 'localisation',
      minWidth: 320,
      headerName: 'Localisation',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.localisation}
        </Typography>
      ),
    },
    {
      flex: 1,
      field:"region",
      minWidth: 300,
      headerName: 'Region',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.region}
        </Typography>
      ),
    },
  ];


  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = adminDataRow.filter((row:any) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field].toString());
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    }
  };



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Card sx={{ flex: 1, marginBottom: '1rem' }}>
        <DataGrid
          autoHeight
          columns={columns}
          pageSizeOptions={[7, 10, 25, 50]}
          paginationModel={paginationModel}
          slots={{ toolbar: QuickSearchToolbar }}
          onPaginationModelChange={setPaginationModel}
          rows={filteredData.length ? filteredData : adminDataRow}
          sx={{ '& .MuiSvgIcon-root': { fontSize: '1.125rem' } }}
          slotProps={{
            baseButton: { size: 'medium', variant: 'outlined' },
            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(''),
              onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value),
            },
          }}
        />
      </Card>
    </Box>
  );
};

export default PDV;
