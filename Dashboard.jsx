import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import { Box, Typography, Stack, Avatar, IconButton } from "@mui/material";
import Publication from "./component/Publication";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CartePub from "./component/cartePub";

export default function Dashboard() {
  const [publication, setPublication] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("utilisateur")) {
      navigate("/connexion");
    }
  }, [navigate]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["publications"],
    queryFn: () =>
      axios.get("http://localhost:3000/publications").then((res) => res.data),
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (data) {
      setPublication(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  let pubTrier = publication.sort((a, b) => {
    return new Date(b.datePublication) - new Date(a.datePublication);
  });
  if (publication)
    return (
      <Box bgcolor={"#eee"}>
        <Navbar />
        <Publication />
        <Box width={"60%"} margin={"auto"} marginTop={5}>
          {publication &&
            pubTrier.map((publication) => (
              <CartePub publication={publication} />
            ))}
        </Box>
      </Box>
    );
}
