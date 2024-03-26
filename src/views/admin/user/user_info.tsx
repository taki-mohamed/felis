import React, { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, useMediaQuery } from '@mui/material';
import { ThemeColor } from 'src/@core/layouts/types';
import { DataRowsUser } from 'src/@fake-db/types';
import { getInitials } from 'src/@core/utils/get-initials';
import { rows } from 'src/@fake-db/user/static-data';
import QuickSearchToolbar from 'src/views/QuickSearchToolbar';
import DialogEditUser from './DialogEditUser';

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const User = () => {
  const [data, setData] = useState<DataRowsUser[]>(rows);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<DataRowsUser[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [user, setUser] = useState<any>({});
  const [show, setShow] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isMediumScreen = useMediaQuery('(min-width:601px) and (max-width:960px)');
  const isLargeScreen = useMediaQuery('(min-width:961px) and (max-width:1280px)');
  const isXLargeScreen = useMediaQuery('(min-width:1281px)');

  const columns: GridColDef[] = [
    {
      flex: 1,
      minWidth: 310,
      field: 'poste',
      headerName: 'Poste',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: row.actif ? 'green' : 'red', marginRight: '5px' }}></div>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.poste}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 1,
      minWidth: 110,
      field: 'prenom',
      headerName: 'Prénom',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.prenom}
        </Typography>
      ),
    },
    {
      flex: 1,
      field: 'email',
      minWidth: 80,
      headerName: 'Email',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.email}
        </Typography>
      ),
    },
    {
      flex: 1,
      field: 'tele',
      minWidth: 80,
      headerName: 'Téléphone',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.tele}
        </Typography>
      ),
    },
    {
      flex: 1,
      field:"",
      minWidth: 300,
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'row' : 'row',
            alignItems: 'center',
            justifyContent: isSmallScreen ? 'center' : 'flex-start',
            margin: isSmallScreen ? '5px 0' : '0 5px',
            width: isSmallScreen ? '90%' : '90%',
            '& > button': {
              marginLeft: '8px', // Ajoute un petit espace entre les boutons

            },
          }}>

            <Button variant='contained' onClick={() => handleEdit(params.row.id)}>
              <span style={{ fontSize: '10px' }}>Modifier</span>
            </Button>
            <Button variant='contained' onClick={() => handleToggleActif(params.row.id)}>
              <span style={{ fontSize: '10px' }}>Désactiver</span>
            </Button>
            <Button variant='contained' sx={{ backgroundColor: 'red' }} onClick={() => handleDeleteRow(params.row.id)}>
              <span style={{ fontSize: '10px' }}>Supprimer</span>
            </Button>
          </Box>
        </Typography>
      ),
    },
  ];

  const handleToggleActif = (id: number) => {
    const rowToUpdate = data.find(row => row.id === id);

    if (rowToUpdate) {
      rowToUpdate.actif = false;

      const updatedRows = data.map(row => (row.id === id ? rowToUpdate : row));
      setData(updatedRows);
    }
  };

  const handleDeleteRow = (id: number) => {
    const updatedRows = data.filter(row => row.id !== id);
    setData(updatedRows);
  };

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field].toString());
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    }
  };

  const handleEdit = (id: number) => {
    setUser(rows.find((user) => user.id === id));
    setShow(true);
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
          rows={filteredData.length ? filteredData : data}
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
      <DialogEditUser user={user} show={show} setShow={setShow} />
    </Box>
  );
};

export default User;
