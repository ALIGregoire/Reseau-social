import { Message } from "@mui/icons-material";
import { Stack, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Publication() {
  const user = JSON.parse(localStorage.getItem("utilisateur"));

  const {
    handleSubmit,
    register,
    reset,
    formState: { error },
  } = useForm();

  const usequery = useQueryClient();

  const mutation = useMutation({
    mutationFn: (pub) => {
      return axios.post("http://localhost:3000/publications", pub);
    },
    onError: (error) => {
      toast.error("Une errer est survenu");
    },
    onSuccess: () => {
      reset();
      usequery.invalidateQueries("publication");
      toast.success("Publication ajouté avec succes");
    },
  });

  const onSubmit = (data) => {
    const pub = {
      ...data,
      idUtilisateur: user.id,
      datePublication: new Date(),
      likePublication: 0,
      auteur: user.nomUtilisateur,
    };
    mutation.mutate(pub);
  };

  return (
    <Stack width={"60%"} margin={"auto"}>
      <h1>Ajouter une publication</h1>
      <form
        style={{
          marginTop: 4,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack gap={2}>
          <TextField
            id="outlined-basic"
            label="Veuillez saisir votre publication"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            multiline
            rows={4}
            {...register("commentaire", {
              required: "Veuillez saisir votre publication",
              maxLength: {
                value: 300,
                Message: "le commentaire ne doit pas depasser 300 caractere",
              },
            })}
          />
          <TextField
            id="outlined-basic"
            label="Veuillez saisir l'URL de l'image"
            variant="outlined"
            size="small"
            type="text"
            fullWidth
            {...register("cheminImage", {
              required: "Veuillez saisir l'URL de l'image",
            })}
          />
          <Button variant="contained" type="submit">
            Publier
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
