import { Grid, Box, Typography } from "@mui/material";
import { useFormState } from "../../../hooks/useFormState";

export const Start = () => {
  const { nextStep } = useFormState();

  return (
    <Grid sx={styles.start}>
      <Box sx={styles.startBox}>
        <Typography style={styles.title}>¡Bienvenido!</Typography>
        <Typography sx={styles.subtitle}>
          Gracias por preferirnos, comienza para adquirir tu turno.
        </Typography>
        <Box
          onClick={() => nextStep()}
          component={"button"}
          className="stepBtn"
        >
          Comenzar
        </Box>
      </Box>
    </Grid>
  );
};

const styles = {
  start: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
  },
  startBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "15px",
  },
  subtitle: {
    fontSize: "1.2rem",
    marginBottom: "15px",
  },
};
