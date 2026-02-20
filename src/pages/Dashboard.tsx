import React, { useState } from "react";
import api from "../api/api";

const Dashboard = () => {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTest = async () => {
        try {
            setLoading(true);
            const res = await api.get("/test");
            setMsg(res.data.message);
        } catch (err) {
            console.error(err);
            setMsg("Backend not connected ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Co-Teacher Hub Dashboard</h1>

            <button
                onClick={handleTest}
                style={{
                    padding: "10px 20px",
                    marginTop: "20px",
                    cursor: "pointer",
                }}
            >
                {loading ? "Checking..." : "Test Backend Connection"}
            </button>

            <h2 style={{ marginTop: "20px" }}>{msg}</h2>
        </div>
    );
}

export default Dashboard;
