"use client";

import React from "react";
import { Badge } from "@/components/ui/badge"; // Assuming shadcn/ui Badge is available

interface PageHeaderProps {
  title: string;
  badgeContent?: number;
}

export function PageHeader({ title, badgeContent }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {badgeContent !== undefined && (
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {badgeContent}
        </Badge>
      )}
    </div>
  );
}