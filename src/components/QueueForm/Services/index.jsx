// React Imports
import { useState, useEffect } from "react";
// MUI Imports
import { Grid, Box, Typography } from "@mui/material";
// Firebase Imports
import { database } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
// Custom Components
import { ServiceItem } from "../../services/ServiceItem";
// Global States
import { useTicketState } from "../../../hooks/useTicketState";
import { useFormState } from "../../../hooks/useFormState";

export const Services = () => {
  
  const { patientName, selectedService, setSelectedService } = useTicketState();
  const { nextStep, services } = useFormState();
  console.log(services);
  return (
    <Grid sx={styles.services}>
      <Box>
        <Typography sx={styles.title}>Hola {patientName}!</Typography>
        <Typography sx={styles.subtitle}>Selecciona un servicio</Typography>
      </Box>
      <Box sx={styles.servicesList}>
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} />
        ))}
      </Box>
      {selectedService && (
        <Box
          component="button"
          className="stepBtn"
          onClick={() => nextStep()}>
          {selectedService.name} | Continuar
        </Box>
      )}
    </Grid>
  );
};
const styles = {
  services: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    padding: "20px",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "15px",
    textAlign: "center",
    color: "#2F9BD6",
    borderBottom: "1px solid #2F9BD6",
    paddingBottom: "10px",
  },
  servicesList: {
    display: "flex",
    gap: "30px",
    maxWidth: 700,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
};
