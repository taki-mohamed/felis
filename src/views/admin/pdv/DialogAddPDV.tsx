import React, { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Checkbox, useMediaQuery } from '@mui/material';
import { ThemeColor } from 'src/@core/layouts/types';
import { PDV } from 'src/@fake-db/types';
import { getInitials } from 'src/@core/utils/get-initials';
import QuickSearchToolbar from 'src/views/QuickSearchToolbar';
import {rows} from "src/@fake-db/PDV/static-data"
import Icon from 'src/@core/components/icon'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { Ref,forwardRef, ReactElement } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Adminrow } from 'src/@fake-db/admin/PDV/static-data';



// ** Icon Imports
const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
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

const DialogAddPDV = ({show ,setShow, adminDataRow, setAdminDataRow }:{show:boolean,setShow:any, adminDataRow:any, setAdminDataRow:any}) => {
  const [data, setData] = useState<PDV[]>(rows);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredData, setFilteredData] = useState<PDV[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });

  const handleChange = (row: PDV, id: number) => {
    setData((prevData) => {
      return prevData.map((rowData) => {
        if (rowData.id === id) {
          const newCheckedState = !rowData.checked;

          // Mise à jour des données administratives en fonction de l'état de la case à cocher
          if (newCheckedState) {
            setAdminDataRow((prevAdminDataRow:any) => [...prevAdminDataRow, row]);
          } else {
            setAdminDataRow((prevAdminDataRow:any) =>
              prevAdminDataRow.filter((adminRow:any) => adminRow.id !== row.id)
            );
          }

          return { ...rowData, checked: newCheckedState };
        }
        return rowData;
      });
    });
  }



  const columns: GridColDef[] = [
    {
      flex: 1,
      minWidth: 200,
      field: 'nom',
      headerName: 'Nom',
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
            checked={params.row.checked}
            onChange={() => handleChange(row as PDV,row.id)}
            />
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.nom}
            </Typography>
          </Box>
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

  const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
  ) {
    return <Fade ref={ref} {...props} />
  })



  return (
    <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
        sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
      >
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <CustomCloseButton onClick={() => setShow(false)}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
          <Box sx={{ mb: 8, textAlign: 'left' }}>
            <Typography variant='h3' sx={{ mb: 3 }}>
            <Icon icon='tabler:question-mark' />Ajouter un Point De Vente
            </Typography>
          </Box>
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
    </Box>
    </DialogContent>
    </Dialog>
  );
};



export default DialogAddPDV
