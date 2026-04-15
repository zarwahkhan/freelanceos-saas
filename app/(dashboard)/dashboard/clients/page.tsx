
"use client";

import { useEffect, useState } from "react";
import PageWrapper from "@/components/PageWrapper";

type Client = {
  id: string;
  name: string;
  email: string;
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FIXED FETCH CLIENTS (IMPORTANT FIXES)
  const fetchClients = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/clients", {
        cache: "no-store", // 🔥 fix caching issue
      });

      if (!res.ok) {
        console.error("Fetch failed");
        setClients([]);
        return;
      }

      const data = await res.json();

      // 🔥 HANDLE BOTH RESPONSE TYPES
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.clients)
        ? data.clients
        : [];

      setClients(list);
    } catch (err) {
      console.error(err);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // ✅ ADD CLIENT (OPTIMIZED)
  const addClient = async () => {
    if (!name || !email) return;

    try {
      setLoading(true);

      const res = await fetch("/api/clients", {
        method: "POST",
        body: JSON.stringify({ name, email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data?.error || "Failed to add client");
        return;
      }

      // 🔥 INSTANT UI UPDATE (no delay)
      const newClient = data.client || data;
      setClients((prev) => [newClient, ...prev]);

      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE CLIENT
  const deleteClient = async (id: string) => {
    try {
      const res = await fetch("/api/clients", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.error("Delete failed");
        return;
      }

      // 🔥 INSTANT REMOVE FROM UI
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageWrapper title="Clients Dashboard">
      {/* 🔥 TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-gray-400 text-sm">Total Clients</p>
          <h2 className="text-2xl font-bold">{clients.length}</h2>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-gray-400 text-sm">Active</p>
          <h2 className="text-2xl font-bold text-green-400">
            {clients.length}
          </h2>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <p className="text-gray-400 text-sm">Growth</p>
          <h2 className="text-2xl font-bold text-blue-400">+12%</h2>
        </div>
      </div>

      {/* 🔥 ADD CLIENT CARD */}
      <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Client</h3>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Client Name"
            className="flex-1 p-3 rounded bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Client Email"
            className="flex-1 p-3 rounded bg-slate-900 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            onClick={addClient}
            className="bg-violet-600 hover:bg-violet-700 transition px-6 py-3 rounded text-white font-medium"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Client"}
          </button>
        </div>
      </div>

      {/* 🔥 CLIENT LIST */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Clients</h3>

        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading && clients.length === 0 && (
          <p className="text-gray-400">No clients yet</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {clients.map((c) => (
            <div
              key={c.id}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-violet-500 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold">{c.name}</h4>
                  <p className="text-gray-400 text-sm">{c.email}</p>
                </div>

                {/* 🗑️ DELETE BUTTON */}
                <button
                  onClick={() => deleteClient(c.id)}
                  className="text-red-400 hover:text-red-600 text-lg"
                >
                  🗑️
                </button>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-green-400">
                  Active Client
                </span>

                <button className="text-sm bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">
                  Analyze
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}