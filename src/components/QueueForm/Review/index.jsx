// React Imports
import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
// Import Global State
import { useTicketState } from "../../../hooks/useTicketState";
import { useFormState } from "../../../hooks/useFormState";
// Import Firebase
import { database } from "../../../firebase";
import { getDocs, collection, query, where, serverTimestamp } from "firebase/firestore";
// Custom Hooks
import {newTicket} from "../../../hooks/newTicket";

export const Review = () => {
  const { patientName, serviceSelected, resetTicket } = useTicketState();
    const { reset } = useFormState();
  const [selectedQ, setSelectedQ] = useState(null);

  const getQueueByService = async (serviceId) => {
    // Implement this function to get the queue by service
    const q = query(
      collection(database, "queues"),
      where("service", "==", serviceId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSelectedQ(doc.data());
    });
  };

  useEffect(() => {
    if (serviceSelected) {
      getQueueByService(serviceSelected.id);
    }
  }, [serviceSelected]);

  const generatedTicket = `${selectedQ?.name} - ${selectedQ?.count
    ?.toString()
    .padStart(2, "0")}`;

    const onSubmit = async () => {
        const ticket = {
            patientName,
            service: serviceSelected.id,
            queue: selectedQ.id,
            ticketCode: generatedTicket,
            status: 'Pendiente',
            createdAt: serverTimestamp()
        }
        await newTicket(ticket, selectedQ)
        window.print()
        reset()
        resetTicket()
    }

  return (
    <Box sx={styles.voucher}>

      <Box>
        <Box sx={styles.rowInfo}>
          <Typography sx={styles.label}>Nombre:</Typography>
          <Typography sx={styles.value}>{patientName}</Typography>
        </Box>
        <Box sx={styles.rowInfo}>
          <Typography sx={styles.label}>Servicio:</Typography>
          <Typography sx={styles.value}>{serviceSelected.name}</Typography>
        </Box>
        <Box sx={styles.rowInfo}>
          <Typography sx={styles.label}>Fila:</Typography>
          <Typography sx={styles.value}>{selectedQ?.name}</Typography>
        </Box>
      </Box>
      <Box sx={styles.ticketContainer}>
        <Typography sx={styles.ticketLabel}>Ticket:</Typography> 
        <Typography sx={styles.ticketText}>{generatedTicket}</Typography>
      </Box>
      <Typography sx={styles.title}>¡Gracias por elegirnos!</Typography>
      <Typography sx={styles.subtitle}>Por favor, imprime tu ticket</Typography>
      <Box
        component="button"
        className="stepBtn"
        onClick={() => onSubmit()}
      >
        Imprimir Turno
      </Box>
    </Box>
  );
};

const styles = {
  voucher: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: "10px",
  },
  rowInfo:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    width: "100%",
    marginBottom: "10px",
  },
  label: {
    fontWeight: "bold",
    marginRight: "10px",
    fontSize: "20px",
  },
  value:{
    fontSize: "20px",
  },
  ticketContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    margin: "20px 0",
  },
  ticketLabel: {
    fontSize: "1.5rem",
  },
  ticketText: {
    fontSize: "2rem",
    color: "#28358B",
    fontWeight: "bold",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "15px",
    color:'#28358B'
  },
};
