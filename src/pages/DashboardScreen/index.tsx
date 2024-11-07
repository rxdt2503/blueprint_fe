"use client";
import React, { useEffect } from "react";
import ClientTable from "../../components/dashboard/ClientTable";
import { useNavigate } from "react-router-dom";

export default function DashboardScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard/plan");
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-start">
      <ClientTable />
    </div>
  );
}
