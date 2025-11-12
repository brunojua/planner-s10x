"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SocialEngineeringDeviceCardProps {
  num: number;
  name: string;
  explanation: string;
  example: string;
}

export function SocialEngineeringDeviceCard({ num, name, explanation, example }: SocialEngineeringDeviceCardProps) {
  return (
    <Card className="h-full flex flex-col border-primary border-2 bg-primary/5 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <CardHeader>
        <CardTitle className="text-lg">
          {num}. {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground">Explicação:</p>
          <p>{explanation}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Exemplo de uso:</p>
          <p>{example}</p>
        </div>
      </CardContent>
    </Card>
  );
}