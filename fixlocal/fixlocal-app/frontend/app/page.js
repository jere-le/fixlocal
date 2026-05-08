"use client";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const TECHNICIANS = [
  { id: "jan",  name: "Jan",  emoji: "🔧" },
  { id: "jill", name: "Jill", emoji: "⚙️" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function Home() {
  const [user, setUser]         = useState(null);
  const [bookings, setBookings] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [tab, setTab]           = useState("calendar");

  useEffect(() => {
    if (!user) return;
    fetch(`${API}/bookings?technician=${user.id}`)
      .then(r => r.json()).then(setBookings);
    fetch(`${API}/inventory`)
      .then(r => r.json()).then(setInventory);
  }, [user]);

  if (!user) {
    return (
      <main style={styles.center}>
        <h1 style={styles.title}>FixLocal</h1>
        <p style={styles.sub}>Who are you today?</p>
        <div style={styles.row}>
          {TECHNICIANS.map(t => (
            <button key={t.id} style={styles.avatarBtn} onClick={() => setUser(t)}>
              <span style={styles.emoji}>{t.emoji}</span>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main style={styles.main}>
      <header style={styles.header}>
        <span style={styles.emoji}>{user.emoji}</span>
        <span style={styles.headerName}>{user.name}</span>
        <button style={styles.logout} onClick={() => setUser(null)}>switch</button>
      </header>

      <nav style={styles.nav}>
        {["calendar", "inventory"].map(t => (
          <button key={t} style={tab === t ? styles.tabActive : styles.tab}
            onClick={() => setTab(t)}>{t}</button>
        ))}
      </nav>

      {tab === "calendar" && (
        <section>
          <h2 style={styles.sectionTitle}>This week</h2>
          <div style={styles.grid}>
            {DAYS.map(day => {
              const dayBookings = bookings.filter(b =>
                new Date(b.date).toLocaleDateString("en", { weekday: "short" }) === day
              );
              return (
                <div key={day} style={styles.dayCol}>
                  <div style={styles.dayHeader}>{day}</div>
                  {dayBookings.length === 0
                    ? <div style={styles.empty}>—</div>
                    : dayBookings.map(b => (
                        <div key={b.id} style={styles.booking}>
                          <div style={styles.bookingDevice}>{b.device}</div>
                          <div style={styles.bookingDesc}>{b.description}</div>
                        </div>
                      ))
                  }
                </div>
              );
            })}
          </div>
        </section>
      )}

      {tab === "inventory" && (
        <section>
          <h2 style={styles.sectionTitle}>Local inventory</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Part</th>
                <th style={styles.th}>In stock</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.part_name}</td>
                  <td style={styles.td}>{item.quantity}</td>
                  <td style={styles.td}>
                    {item.quantity < 3 && (
                      <button style={styles.orderBtn}
                        onClick={() => fetch(`${API}/inventory/order`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ part_name: item.part_name, quantity: 5 })
                        })}>
                        Order from warehouse
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}

const styles = {
  center:        { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", fontFamily:"sans-serif" },
  main:          { fontFamily:"sans-serif", maxWidth:900, margin:"0 auto", padding:24 },
  title:         { fontSize:36, fontWeight:700, marginBottom:8 },
  sub:           { color:"#666", marginBottom:32 },
  row:           { display:"flex", gap:24 },
  avatarBtn:     { display:"flex", flexDirection:"column", alignItems:"center", gap:8, padding:"24px 40px", border:"2px solid #eee", borderRadius:12, cursor:"pointer", fontSize:16, background:"#fff" },
  emoji:         { fontSize:48 },
  header:        { display:"flex", alignItems:"center", gap:12, marginBottom:24 },
  headerName:    { fontSize:20, fontWeight:600 },
  logout:        { marginLeft:"auto", fontSize:13, color:"#999", background:"none", border:"none", cursor:"pointer" },
  nav:           { display:"flex", gap:8, marginBottom:24 },
  tab:           { padding:"8px 20px", border:"2px solid #eee", borderRadius:8, cursor:"pointer", background:"#fff", fontSize:14 },
  tabActive:     { padding:"8px 20px", border:"2px solid #000", borderRadius:8, cursor:"pointer", background:"#000", color:"#fff", fontSize:14 },
  sectionTitle:  { fontSize:18, fontWeight:600, marginBottom:16 },
  grid:          { display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:12 },
  dayCol:        { background:"#f9f9f9", borderRadius:8, padding:12, minHeight:120 },
  dayHeader:     { fontWeight:600, marginBottom:8, fontSize:13, color:"#666" },
  empty:         { color:"#ccc", fontSize:13 },
  booking:       { background:"#fff", border:"1px solid #eee", borderRadius:6, padding:8, marginBottom:6 },
  bookingDevice: { fontWeight:600, fontSize:12 },
  bookingDesc:   { fontSize:11, color:"#666", marginTop:2 },
  table:         { width:"100%", borderCollapse:"collapse" },
  th:            { textAlign:"left", padding:"8px 12px", borderBottom:"2px solid #eee", fontSize:13 },
  td:            { padding:"8px 12px", borderBottom:"1px solid #f0f0f0", fontSize:14 },
  orderBtn:      { fontSize:12, padding:"4px 10px", background:"#000", color:"#fff", border:"none", borderRadius:4, cursor:"pointer" },
};
