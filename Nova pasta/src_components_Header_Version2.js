import React from "react";
import { BarChart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-md mb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <BarChart className="h-8 w-8 text-indigo-600" />
          <div className="ml-3">
            <h1 className="text-xl font-bold text-gray-800 -mb-1">Share Brasil</h1>
            <p className="text-sm text-gray-500">Sistema de Gestão - Clientes</p>
          </div>
        </div>
      </div>
    </header>
  );
}