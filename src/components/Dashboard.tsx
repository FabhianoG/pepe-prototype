import { useEffect, useState } from "react";
import WelcomeBanner from "./WelcomeBanner";
import StatCard from "./StatCard";
import StartChatButton from "./StartChatButton";

import { getDashboardData } from "../services/dashboard.service";
import type { DashboardData } from "../types/dashboard";
import type { User } from "../types/user";

type DashboardProps = {
  user: User;
};

export default function Dashboard({ user }: DashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getDashboardData().then(setData);
  }, []);

  return (
    <div className="bg-[#f4f7fb] min-h-screen py-8">
      
      <div className="max-w-6xl mx-auto px-4">
        
        <WelcomeBanner name={user.name} />

        <StartChatButton />

        {!data ? (
          <p className="text-center mt-10 text-gray-500">
            Cargando dashboard...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <StatCard title="Conversaciones" value={data.conversaciones} />
            <StatCard title="Archivos procesados" value={data.archivos} />
            <StatCard title="Imágenes analizadas" value={data.imagenes} />
          </div>
        )}

      </div>
    </div>
  );
}
