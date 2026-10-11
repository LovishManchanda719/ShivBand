import { Music, Music2, Music4, Crown, Flower2, Drum, Lamp, Package, CarFront, type LucideProps } from "lucide-react";
import type { ServiceIcon as IconName } from "@/lib/services";

const MAP = {
  music: Music,
  crown: Crown,
  flower: Flower2,
  drum: Drum,
  lamp: Lamp,
  package: Package,
  bagpipe: Music2,
  shehnai: Music4,
  car: CarFront,
} as const;

export default function ServiceIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = MAP[name];
  return <Icon strokeWidth={1.4} {...props} />;
}
