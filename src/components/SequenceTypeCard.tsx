"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SequenceTypeCardProps {
  type: string;
  objective: string;
  cadence: string;
  devices: string;
}

export function SequenceTypeCard({ type, objective, cadence, devices }: SequenceTypeCardProps) {
  return (
    <Card className="h-full flex flex-col border-primary border-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg">{type}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground">Objetivo Principal:</p>
          <p>{objective}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Cadência Típica:</p>
          <p>{cadence}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Dispositivos Recomendados:</p>
          <p>{devices}</p>
        </div>
      </CardContent>
    </Card>
  );
}