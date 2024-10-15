import React from "react";
import { Grid } from "@mui/material";
import logo from "../../assets/logo-dark.png";
import { useFormState } from "../../hooks/useFormState";

export const Header = () => {
  const { currentStep, setCurrentStep } = useFormState();

  return (
    <Grid sx={styles.header}>
      {currentStep === 4 ? null : (
        <img
        src={logo}
        alt="logo"
        style={currentStep === 1 ? styles.logoStart : styles.logo}
      />
      )}
    </Grid>
  );
};

const styles = {
  header: {
    position: "fixed",
    display: "flex",
    width: "100%",
    pt: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    backgroundColor: "#28358B",
    color: "#fff",
  },
  logo: {
    width: "250px",
    transition: "all 0.5s",
  },
  logoStart: {
    width: "450px",
    transition: "all 0.5s",
  },
};
