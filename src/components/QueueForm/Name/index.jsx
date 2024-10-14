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
      <Box>
        <Box
          component="button"
          className="stepBtn"
          onClick={() => {
            if (!patientName) {
              setError("Por favor, ingresa tu nombre");
              return;
            }
            nextStep();
          }}
        >
          Elegir Servicio
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
  title: {
    color: "#fff",
    fontSize: 20,
  },
  startButton: {
    marginTop: 15,
  },
};