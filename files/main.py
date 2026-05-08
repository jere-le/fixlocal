from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
import psycopg2
import psycopg2.extras

app = FastAPI(title="FixLocal API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.environ.get("DATABASE_URL")


def get_conn():
    return psycopg2.connect(DATABASE_URL)


# ── Models ───────────────────────────────────────────────────────────────────

class BookingCreate(BaseModel):
    technician: str  # "jan" | "jill"
    date: str        # ISO date string YYYY-MM-DD
    description: str
    device: str


class PartOrder(BaseModel):
    part_name: str
    quantity: int


# ── Health ───────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok"}


# ── Technicians ──────────────────────────────────────────────────────────────

@app.get("/technicians")
def get_technicians():
    return [
        {"id": "jan", "name": "Jan", "avatar": "jan"},
        {"id": "jill", "name": "Jill", "avatar": "jill"},
    ]


# ── Bookings ─────────────────────────────────────────────────────────────────

@app.get("/bookings")
def get_bookings(technician: Optional[str] = None):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    if technician:
        cur.execute("SELECT * FROM bookings WHERE technician = %s ORDER BY date", (technician,))
    else:
        cur.execute("SELECT * FROM bookings ORDER BY date")
    rows = cur.fetchall()
    conn.close()
    return rows


@app.post("/bookings")
def create_booking(booking: BookingCreate):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        "INSERT INTO bookings (technician, date, description, device) VALUES (%s, %s, %s, %s) RETURNING *",
        (booking.technician, booking.date, booking.description, booking.device),
    )
    row = cur.fetchone()
    conn.commit()
    conn.close()
    return row


# ── Inventory ─────────────────────────────────────────────────────────────────

@app.get("/inventory")
def get_inventory():
    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT * FROM inventory ORDER BY part_name")
    rows = cur.fetchall()
    conn.close()
    return rows


@app.post("/inventory/order")
def order_part(order: PartOrder):
    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute(
        "INSERT INTO orders (part_name, quantity, status) VALUES (%s, %s, 'pending') RETURNING *",
        (order.part_name, order.quantity),
    )
    row = cur.fetchone()
    conn.commit()
    conn.close()
    return row
