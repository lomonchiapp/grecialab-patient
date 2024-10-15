import React from 'react'
import { Box, Typography } from '@mui/material'
import { useTicketState } from '../../hooks/useTicketState'

export const ServiceItem = ({service}) => {
    const {selectedService, setSelectedService} = useTicketState()

  return (
    <Box
        onClick={() => setSelectedService(service)}
    sx={selectedService === service? styles.selectedItem : styles.item}>
        <Typography sx={styles.name}>{service.name}</Typography>
    </Box>
  )
}

const styles = {
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: '20px',
        border: '1px solid transparent',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
    },
    selectedItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #FFF',
        justifyContent: 'center',
        backgroundColor: '#50B3E8',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
    },
    name: {
        fontSize: '1.5rem',
        color: '#28358B'
    }
    }
