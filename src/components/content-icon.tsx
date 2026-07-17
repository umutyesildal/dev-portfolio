import type { ComponentType, SVGProps } from "react";
import { HomeIcon, Layers3Icon } from "lucide-react";
import { Icons } from "@/components/icons";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconRegistry: Record<string, IconComponent> = {
  email: Icons.email as IconComponent,
  github: Icons.github as IconComponent,
  globe: Icons.globe as IconComponent,
  home: HomeIcon,
  linkedin: Icons.linkedin as IconComponent,
  nextjs: NextjsIconDark,
  nodejs: Nodejs,
  portfolio: Layers3Icon,
  python: Python,
  react: ReactLight,
  typescript: Typescript,
  x: Icons.x as IconComponent,
};

export function ContentIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: string }) {
  const Icon = iconRegistry[name.toLowerCase()];

  if (!Icon) {
    return null;
  }

  return <Icon {...props} />;
}
