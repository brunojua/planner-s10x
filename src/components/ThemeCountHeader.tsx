"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";

const fetchThemeCount = async () => {
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.user?.id) {
    // Retorna 0 se não estiver autenticado, pois o Layout só é renderizado para usuários autenticados
    return 0; 
  }

  const { count, error } = await supabase
    .from("themes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.user.id);

  if (error) {
    console.error("Error fetching theme count:", error);
    return 0;
  }
  return count || 0;
};

export function ThemeCountHeader() {
  const { data: totalThemes, isLoading } = useQuery<number>({
    queryKey: ["themeCount"],
    queryFn: fetchThemeCount,
  });

  if (isLoading || totalThemes === undefined) {
    return null; // Não renderiza nada enquanto carrega
  }

  return (
    <Badge variant="secondary" className="text-lg px-3 py-1">
      {totalThemes}
    </Badge>
  );
}