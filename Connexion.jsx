import { Stack, Typography, Box, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Connexion() {
  useEffect(() => {
    if (localStorage.getItem("utilisateur")) {
      navigate("/");
    }
  });

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .get(
        `http://localhost:3000/utilisateurs?adresseMail=${data.adresseMail}&motDePasse=${data.motDePasse}`
      )
      .then((res) => {
        if (res.data.length > 0) {
          localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
          navigate("/");
          toast.success("connexion reussie");
        } else {
          toast.error("les identifiant sont incorrecte");
        }
      });
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
          <Typography
            sx={{
              marginTop: 2,
            }}
          >
            Voulez vous creer un compte ?{" "}
            <Link to="/inscription">Cliquez ici</Link>
          </Typography>
        </form>
      </Box>
    </Stack>
  );
}
