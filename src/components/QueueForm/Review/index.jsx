/* eslint-disable react-hooks/exhaustive-deps */
// React Imports
import { useEffect, useRef, useCallback, useState} from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
// Import Global State
import { useTicketState } from "../../../hooks/useTicketState";
import { useFormState } from "../../../hooks/useFormState";
// Import Firebase
// Custom Hooks
import {newTicket} from "../../../hooks/newTicket";
import {handlePrint} from "../../../hooks/handlePrint";

import { TicketView } from "./TicketView";

export const Review = () => {
  const { patientName, selectedServices, selectedQueues, setSelectedQueues, resetTicket } = useTicketState();
  const { reset, queues } = useFormState();
  const [generatedTicket, setGeneratedTicket] = useState("");
  const [ticket, setTicket] = useState(null);
  const ticketRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const updateGeneratedTicket = useCallback(() => {
    if (selectedServices.length > 0 && selectedQueues.length > 0) {
      const count = selectedQueues[0]?.count || 0;
      const formattedCount = count.toString().padStart(2, "0");
      const ticketCode = `${selectedServices.map(service => service.name.slice(0, 1).toUpperCase()).join('')} - ${formattedCount}`;
      setGeneratedTicket(ticketCode);
    } else {
      setGeneratedTicket("");
    }
  }, [selectedServices, selectedQueues]);

  useEffect(() => {
    updateGeneratedTicket();
  }, [selectedServices, selectedQueues, updateGeneratedTicket]);

  useEffect(() => {
    if (selectedServices) {
      setTicket({
        patientName: patientName,
        services: selectedServices.map(service => ({
          id: service.id,
          name: service.name,
          status: "pending",
        })),
        queues: selectedQueues,
        ticketCode: generatedTicket,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [selectedServices, selectedQueues, generatedTicket, patientName]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsPrinting(true);
    await newTicket(ticket, selectedQueues);
    await handlePrint(ticketRef);
    reset();
    resetTicket();
  };


  return (

    <Box sx={styles.voucher}>
      <Box ref={ticketRef}>
        <TicketView payload={ticket}/>
      </Box>
      
     
        {
          !isPrinting ? ( <Box
            component="button"
            sx={styles.printButton}
            onClick={onSubmit}
          >
            <Typography sx={styles.printButtonText}>Imprimir</Typography>
          </Box>
            ) : (
              <Box sx={styles.loadingBox}>
                <CircularProgress size={24} />
                <Typography>Imprimiendo...</Typography>
                </Box>
            )
        }

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
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#072879",
    color: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  printButton: {
    backgroundColor: "#072879",
    color: "#fff",
    padding: "20px 30px",
    marginTop: "20px",
    borderRadius: "10px",
    cursor: "pointer",
  },
  printButtonText: {
    fontSize: "30px",
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
