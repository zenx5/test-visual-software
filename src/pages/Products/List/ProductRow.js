import { useState } from 'react'
import { Grid, TableRow, TableCell, IconButton, Popover, MenuItem, Divider, useMediaQuery, Typography, ListItem } from '@mui/material'
import { MoreVert, Check, Edit, Delete, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { useTranslation } from 'react-i18next';

export default function ProductRow({ row, onEdit, onDelete, onUpdateState}) {
    const [changeStatus, setChangeStatus] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const { t:translate } = useTranslation()

    const isMovilWidth = useMediaQuery('(max-width:610px)')


    const open = Boolean(anchorEl)

    const { SKU, description, brand, price, stock, active } = row

    const handlerActive = () => {
        setChangeStatus( prev => !prev )
    }


    if( isMovilWidth ){
        return <>
            <TableRow>
                <TableCell colSpan={2}>
                    <b>SKU:</b> { SKU }
                </TableCell>
                <TableCell colSpan={4}>
                    { description }
                </TableCell>
                <TableCell colSpan={1}>
                    <IconButton onClick={(event)=>setAnchorEl(event.currentTarget)}>
                        <MoreVert />
                    </IconButton>
                    <Popover
                        open={open}
                        onClose={()=>setAnchorEl(false)}
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical:'bottom',
                            horizontal:'left'
                        }}
                        sx={{
                            borderRadius:4,
                            '.MuiMenuItem-root':{
                                width: 170
                            }
                        }}
                    >
                        <MenuItem sx={{ backgroundColor:'#fff0', px:3 }} onClick={handlerActive}>
                            { active ? <CheckBox sx={{ pr:2 }} /> : <CheckBoxOutlineBlank sx={{ pr:2 }} /> }
                            { active ? translate('deactive') : translate('active') }
                        </MenuItem>
                        <Divider />
                        <MenuItem sx={{ backgroundColor:'#fff0', px:3 }}>
                            <Edit sx={{ pr:2 }} /> {translate('edit')}
                        </MenuItem>
                        <Divider />
                        <MenuItem sx={{ backgroundColor:'#fff0', px:3 }}>
                            <Delete sx={{ pr:2 }} /> {translate('delete')}
                        </MenuItem>
                    </Popover>
                </TableCell>
            </TableRow>
            <TableRow sx={{ '.MuiTableCell-root':{ borderBottomWidth:5 } }}>
                <TableCell colSpan={2}>
                    <ListItem sx={{ py:0, my:0, fontWeight:'bold' }}>{translate('brand')}:</ListItem>
                    <ListItem sx={{ py:0, my:0, fontWeight:'bold' }}>{translate('price')}:</ListItem>
                    <ListItem sx={{ py:0, my:0, fontWeight:'bold' }}>{translate('stock')}:</ListItem>
                </TableCell>
                <TableCell colSpan={4}>
                    <ListItem sx={{ py:0, my:0, justifyContent:'center' }}>{ brand }</ListItem>
                    <ListItem sx={{ py:0, my:0, justifyContent:'center' }}>{ price }</ListItem>
                    <ListItem sx={{ py:0, my:0, justifyContent:'center' }}>{ stock }</ListItem>
                </TableCell>
                <TableCell colSpan={1}>
                    { active ? <Check sx={{ color:"#19c969" }} /> : <CheckBoxOutlineBlank sx={{ color:'#0005' }} />  }
                </TableCell>
            </TableRow>
        </>
    }
    else{
        return <TableRow key={SKU}>
            <TableCell>
                { SKU }
            </TableCell>
            <TableCell>
                { description }
            </TableCell>
            <TableCell>
                { brand }
            </TableCell>
            <TableCell>
                { price }
            </TableCell>
            <TableCell>
                { stock }
            </TableCell>
            <TableCell>
                { active && <Check sx={{ color:"#19c969" }} />  }
            </TableCell>
            <TableCell>
                <IconButton onClick={(event)=>setAnchorEl(event.currentTarget)}>
                    <MoreVert />
                </IconButton>
                <Popover
                    open={open}
                    onClose={()=>setAnchorEl(false)}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical:'bottom',
                        horizontal:'left'
                    }}
                    sx={{
                        borderRadius:4,
                        '.MuiMenuItem-root':{
                            width: 170
                        }
                    }}
                >
                    <MenuItem sx={{ backgroundColor:'#fff0', px:3 }} onClick={onUpdateState}>
                        {  active ? <CheckBox sx={{ pr:2 }} /> : <CheckBoxOutlineBlank sx={{ pr:2 }} /> }
                        {  active ? translate('deactive') : translate('active') }
                    </MenuItem>
                    <Divider />
                    <MenuItem sx={{ backgroundColor:'#fff0', px:3 }} onClick={onEdit}>
                        <Edit sx={{ pr:2 }} /> {translate('edit')}
                    </MenuItem>
                    <Divider />
                    <MenuItem sx={{ backgroundColor:'#fff0', px:3 }}  onClick={onDelete}>
                        <Delete sx={{ pr:2 }} /> {translate('delete')}
                    </MenuItem>
                </Popover>
            </TableCell>
        </TableRow>
    }
}