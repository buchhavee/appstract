import { TrendingUp, Users, Target } from "lucide-react";

export interface OmnichannelCategory {
  title: string;
  icon: string;
  description: string;
  kpis: string[];
}

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Users,
  Target,
};
