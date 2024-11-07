import React, { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import { useTicketState } from "../../../hooks/useTicketState";
import { useFormState } from "../../../hooks/useFormState";

export const Name = () => {
  const { patientName, setPatientName } = useTicketState();
  const { nextStep } = useFormState();
  const [error, setError] = useState("");

  return (
    <Box sx={styles.form}>
      <Box>
        <Typography style={styles.title}>¡Hola! ¿Cómo te llamas?</Typography>
      </Box>
      <Box>
        <TextField
          style={styles.nameInput}
          value={patientName || ""}
          onChange={(e) => setPatientName(e.target.value)}
          InputProps={{
            style: { backgroundColor: 'white', width: 450 },
            inputProps: { style: { textAlign: 'center' } },
          }}
          error={!!error}
          helperText={error}
        />
      </Box>
      <Box sx={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <Box
          component="button"
          className="stepBtn"
          onClick={() => {
            if (!patientName) {
              setError("Por favor, introduce tu nombre");
              return;
            }
            nextStep();
          }}
        >
          Elegir Servicio
        </Box>
        <Box>
          <Box
            component="button"
            style={styles.rapidTicket}
            onClick={() => {
              nextStep();
            }}
          >
            Ticket Rápido
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: 550,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    gap: 3,
  },
  nameInput: {
    marginBottom: 15,
  },
  rapidTicket: {
    marginTop: 15,
    color: "#fff",
    backgroundColor: "#072879",
    padding: "20px 30px",
    borderRadius: 5,
    fontSize:25,
    cursor: "pointer",
  },
  title: {
    color: "#fff",
    fontSize: 20,
  },
  startButton: {
    marginTop: 15,
  },
};
