import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useFormState } from "../../../hooks/useFormState";

export const TicketView = ({ payload }) => {
  const { tickets, services } = useFormState();

  if (!payload || !payload.service) {
    return null;
  }

  const serviceById = (id) => {
    const service = services.find((service) => service.id === id)
    return service.name
  };

  const personsInQueue = tickets.filter((ticket) =>
      ticket.status === "inQueue" && ticket.service === payload.service
  ).length;
  const personsInBillingQueue = tickets.filter(
    (ticket) => ticket.status === "pending"
  ).length;
  const currentDate = new Date();
  const actualDate = currentDate.toLocaleDateString();
  const actualTime = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Box sx={styles.ticket}>
      <Box>
        <img style={styles.logo} src="logo.jpg" />
      </Box>
      <Box sx={{ height: 50 }}>
       {payload.ticketCode ? (
          <Typography sx={styles.ticketCode}>{payload.ticketCode}</Typography>
        ) : null}
      </Box>
      <Box>
        <Typography sx={styles.patientName}>{payload.patientName}</Typography>
      </Box>
      <Box sx={styles.serviceBox}>
        <Typography sx={styles.service}>{serviceById(payload.service)}</Typography>
      </Box>
      <Box sx={styles.dateContainer}>
        <Box>
          <Typography sx={styles.date}>{actualDate}</Typography>
        </Box>
        <Box>
          <Typography sx={styles.time}>{actualTime}</Typography>
        </Box>
      </Box>
      <Box sx={styles.queueInfoBox}>
        <Typography sx={styles.billingQueue}>
          Personas en cola de facturacion: <span style={{fontWeight:'bold'}}>{personsInBillingQueue}</span>
        </Typography>
      </Box>
      <Box>
        <Typography sx={styles.serviceQueue}>
          Personas en cola de {serviceById(payload.service)}: <span style={{fontWeight:'bold'}}>{personsInQueue}</span>
        </Typography>
      </Box>
      <Box>
        <Typography sx={styles.info}>
            www.grecialab.com | 809-555-5555
        </Typography>
      </Box>
    </Box>
  );
};

const styles = {
  ticket: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    height: "100%",
    padding: "10px",
    paddingBottom:"100px",
    backgroundColor: "white",
    borderRadius: "5px",
  },
  logo: {
    width: "300px",
    height: "100px",
  },
  ticketCode: {
    color: "black",
    textAlign: "center",
    fontSize: "64px",
    fontWeight: "bold",
  },
  patientName: {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
    paddingTop: "15px",
  },
  service: {
    color: "black",
    fontSize: "24px",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 2,
  },
  date: {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
  },
  time: {
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
  },
  serviceBox: {
    borderBottom: "1px solid black",
    paddingBottom: "6px",
    width: "100%",
    textAlign: "center",
  },
  queueInfoBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
  },
  billingQueue: {
    color: "black",
    fontSize: "16px",
  },
  serviceQueue: {
    color: "black",
    fontSize: "16px",
  },
    info: {
        color: "black",
        fontSize: "14px",
    },
};
