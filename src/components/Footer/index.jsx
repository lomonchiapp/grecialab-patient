import React from 'react'
import { Grid, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Grid md={12} sx={styles.footer}>
      <Typography>© 2025 GreciaLab. Todos los derechos reservados.</Typography>
    </Grid>
    )
}

const styles = {
    footer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        backgroundColor: '#000',
        color: '#fff'
    }
    }
