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
  const [services, setServices] = useState([]);
  const { name, serviceSelected } = useTicketState();
  const { nextStep } = useFormState();

  useEffect(() => {
    let isMounted = true;
    const q = query(
      collection(database, "services"),
      where("isActive", "==", true)
    );
    const getServices = async () => {
      const querySnapshot = await getDocs(q);
      const services = [];
      querySnapshot.forEach((doc) => {
        services.push({ ...doc.data(), id: doc.id });
      });
      if (isMounted) {
        setServices(services);
      }
    };
    getServices();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []);
  return (
    <Grid sx={styles.services}>
      <Box>
        <Typography sx={styles.title}>Hola {name}!</Typography>
        <Typography sx={styles.subtitle}>Selecciona un servicio</Typography>
      </Box>
      <Box sx={styles.servicesList}>
        {services.map((service, index) => (
          <ServiceItem key={index} service={service} />
        ))}
      </Box>
      {serviceSelected && (
        <Box
          component="button"
          className="stepBtn"
          onClick={() => nextStep()}>
          {serviceSelected.name} | Continuar
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
