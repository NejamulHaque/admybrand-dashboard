"use client";

import React from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DataTableProps {
  data: any[];
  loading?: boolean;
}

export function DataTable({ data, loading = false }: DataTableProps) {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("User Analytics Report", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Signup Date", "Status"]],
      body: data.map(row => Object.values(row)),
    });
    doc.save("user_analytics.pdf");
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">User Analytics</h2>
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Analytics</h2>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF}>Export PDF</Button>
          <CSVLink data={data} filename="user_analytics.csv">
            <Button variant="outline">Export CSV</Button>
          </CSVLink>
        </div>
      </div>
      <div className="overflow-auto rounded-xl shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Signup Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user.Name}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{user["Signup Date"]}</TableCell>
                <TableCell>{user.Status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}