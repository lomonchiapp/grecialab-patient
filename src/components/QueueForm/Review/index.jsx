// React Imports
import { useEffect, useRef, useState} from "react";
import { Box } from "@mui/material";
// Import Global State
import { useTicketState } from "../../../hooks/useTicketState";
import { useFormState } from "../../../hooks/useFormState";
// Import Firebase
// Custom Hooks
import {newTicket} from "../../../hooks/newTicket";
import {handlePrint} from "../../../hooks/handlePrint";

import { TicketView } from "./TicketView";

export const Review = () => {
  const { patientName, selectedService, selectedQueue, setSelectedQueue, resetTicket } = useTicketState();
    const { reset, queues } = useFormState();
  
    const generatedTicket = `${selectedQueue?.name} - ${selectedQueue?.count?.toString().padStart(2, "0")}`;
  
    const [ticket, setTicket] = useState(null);
    const ticketRef = useRef(null);



  useEffect(() => {
    if (selectedService) {
      setTicket({
        patientName: patientName,
        service: selectedService.id,
        ticketCode: generatedTicket,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      const correspondingQueue = queues.find((queue) => queue.serviceId === selectedService.id);
      setSelectedQueue(correspondingQueue);
      console.log(correspondingQueue);
    }
  }, [selectedService, patientName, generatedTicket, queues, setSelectedQueue]);



    const onSubmit = async (e) => {
        e.preventDefault()
        await newTicket(ticket, selectedQueue)
        await handlePrint(ticketRef)
        reset()
        resetTicket()
    }

  return (

    <Box sx={styles.voucher}>
      <Box ref={ticketRef}>
        <TicketView payload={ticket}/>
      </Box>
      
      <Box
        component="button"
        className="stepBtn"
        onClick={onSubmit}
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
