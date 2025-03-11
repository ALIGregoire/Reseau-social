import React from "react";
import { Box, Typography, Stack, Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function CartePub({ publication }) {
  const user = JSON.parse(localStorage.getItem("utilisateur"));
  const useQuery = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/publications/${id}`);
    },

    onError: (error) => {
      toast.error("Une erreur est survenue");
    },

    onSuccess: () => {
      useQuery.invalidateQueries("publication");
      toast.success("Publication supprimée avec succes");
    },
  });

  const supprimerPublication = (id) => {
    mutation.mutate(id);
  };

  return (
    <Box
      key={publication.id} // Assurez-vous que chaque publication a un id unique
      width={"100%"}
      bgcolor={"#fff"}
      borderRadius={4}
      marginBottom={4}
      padding={2}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Avatar src={publication.photoUtilisateur} />
        <Typography>{publication.auteur}</Typography>
        {user.id === publication.idUtilisateur && (
          <IconButton
            aria-label="delete"
            onClick={() => supprimerPublication(publication.id)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      <Typography>{publication.commentaire}</Typography>

      <img
        style={{ width: "100%", borderRadius: 4 }}
        src={publication.cheminImage}
        alt="Publication"
      />
    </Box>
  );
}
