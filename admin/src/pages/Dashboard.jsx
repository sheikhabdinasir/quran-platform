import React from "react";

const Dashboard = () => {
  return (
    <section className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.7rem",
              fontWeight: 700,
              marginBottom: "1.8rem",
              color: "#2C1810",
            }}
          >
            Ku soo dhowow Admin Dashboard-ka
          </h1>
        </div>
      </div>

      {/* ===== DASHBOARD STATS GRID ===== */}
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.2rem",
        }}
      >
        {/* BOX 1 */}
        <div className="stat-box" style={boxStyle}>
          <div className="stat-title">Users</div>
          <div className="stat-value">0</div>
        </div>

        {/* BOX 2 */}
        <div className="stat-box" style={boxStyle}>
          <div className="stat-title">Posts</div>
          <div className="stat-value">0</div>
        </div>

        {/* BOX 3 */}
        <div className="stat-box" style={greenBox}>
          <div className="stat-title">Active</div>
          <div className="stat-value">0</div>
        </div>

        {/* BOX 4 */}
        <div className="stat-box" style={redBox}>
          <div className="stat-title">Inactive</div>
          <div className="stat-value">0</div>
        </div>
      </div>
    </section>
  );
};

/* ===== STYLES ===== */
const boxStyle = {
  background: "#F5E6E0",
  borderLeft: "6px solid #D4AF37",
  padding: "1.5rem",
  borderRadius: "0.85rem",
  boxShadow: "0 14px 25px rgba(0,0,0,0.12)",
};

const greenBox = {
  ...boxStyle,
  background: "#F0FDF4",
  borderLeft: "6px solid #10B981",
};

const redBox = {
  ...boxStyle,
  background: "#FEF2F2",
  borderLeft: "6px solid #DC2626",
};

export default Dashboard;
