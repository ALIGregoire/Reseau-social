import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Inscription() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.motDePasse !== data.motDePasseConfirmation) {
      toast.error("mots de passe incorrect");
    } else {
      axios
        .get(
          `http://localhost:3000/utilisateurs?adresseMail=${data.adresseMail}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            toast.error("un compte existe deja avec ce adresse email");
          } else {
            axios
              .post("http://localhost:3000/utilisateurs", data)
              .then((res) => {
                toast("Inscription reussie ");
                navigate("/connexion");
              });
          }
        });
    }
  };
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
      backgroundColor={"#f5f5f5"}
    >
      <Box
        width={400}
        sx={{
          backgroundColor: "#fff",
          padding: 3,
        }}
      >
        <Typography variant="h5">Inscription</Typography>
        <form
          style={{
            marginTop: 5,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack direction={"column"} gap={2}>
            <TextField
              id="filled-basic"
              label="Veuillez saisir votre nom"
              variant="outlined"
              fullWidth
              size="small"
              {...register("nomUtilisateur", {
                required: "Veuillez saisir un nom",
                minLength: {
                  value: 3,
                  message: "Veuillez Saisir un nom de plus de 5 caracteres",
                },
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez confirmer votre adresse mail"
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              {...register("adresseMail", {
                required: "Veuillez saisir votre adresse mail",
                pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez saisir un mots passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("motDePasse", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message:
                    "Veuillez Saisir un mot passe de plus de 5 caracteres",
                },
              })}
            />
            <TextField
              id="filled-basic"
              label="Veuillez confirmer votre mot de passe"
              variant="outlined"
              fullWidth
              size="small"
              type="password"
              {...register("motDePasseConfirmation", {
                required: "Veuillez saisir un mot de passe",
                minLength: {
                  value: 6,
                  message:
                    "Veuillez Saisir un mot passe de plus de 5 caracteres",
                },
              })}
            />
          </Stack>
          <Button
            sx={{
              marginTop: 2,
            }}
            fullWidth
            variant="contained"
            type="submit"
          >
            Inscription
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
