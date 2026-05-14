import { useEffect, useState } from "react";
import api from "../api/axios";

function Analytics() {
  const [statusCount, setStatusCount] = useState({});
  const [accessTypes, setAccessTypes] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const statusRes = await api.get("/analytics/status-count");
      const typeRes = await api.get("/analytics/access-types");

      setStatusCount(statusRes.data);
      setAccessTypes(typeRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2>Analytics Dashboard</h2>

      <div>
        <h3>Status Summary</h3>
        <p>Pending: {statusCount.pending || 0}</p>
        <p>Approved: {statusCount.approved || 0}</p>
        <p>Rejected: {statusCount.rejected || 0}</p>
      </div>

      <div>
        <h3>Access Types</h3>
        {accessTypes.map((item, index) => (
          <p key={index}>
            {item.accessType}: {item.count}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Analytics;