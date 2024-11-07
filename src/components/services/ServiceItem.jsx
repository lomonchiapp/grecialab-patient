import React from 'react'
import { Box, Typography } from '@mui/material'
import { useTicketState } from '../../hooks/useTicketState'
import { useFormState } from '../../hooks/useFormState'

export const ServiceItem = ({service}) => {
    const { selectedServices, setSelectedServices, setSelectedQueues, selectedQueues } = useTicketState();
    const { queues } = useFormState();

    const handleServiceClick = () => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter((s) => s !== service));
            setSelectedQueues(selectedQueues.filter((q) => q.serviceId !== service.id));
        } else {
            const correspondingQueue = queues.find((q) => q.serviceId === service.id);
            setSelectedServices([...selectedServices, service]);
            if (correspondingQueue) {
                setSelectedQueues([...selectedQueues, correspondingQueue]);
            }
        }
    };

    return (
        <Box
            onClick={handleServiceClick}
            sx={selectedServices.includes(service) ? styles.selectedItem : styles.item}>
            <Typography sx={styles.name}>{service.name}</Typography>
        </Box>
    );
};

const styles = {
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',

        padding: '20px',
        border: '1px solid #FFF',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
    },
    selectedItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#439df8',
        padding: '20px',
        border: '1px solid #000',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer'
    },
    name: {
        fontSize: '30px',
        fontWeight: 'bold'
    }
};