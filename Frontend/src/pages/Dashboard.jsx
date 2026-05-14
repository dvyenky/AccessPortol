import { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import MainLayout from "../components/layout/MainLayout";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await api.get("/analytics/status-count");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Pending Requests",
      value: stats.pending,
    },
    {
      title: "Approved Requests",
      value: stats.approved,
    },
    {
      title: "Rejected Requests",
      value: stats.rejected,
    },
  ];

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {card.title}
                </Typography>

                <Typography variant="h3">
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
}

export default Dashboard;