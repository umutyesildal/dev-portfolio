import {
  Github,
  Globe,
  Linkedin,
  Mail,
  Twitter,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  email: Mail,
  github: Github,
  globe: Globe,
  linkedin: Linkedin,
  twitter: Twitter,
  x: Twitter,
  website: Globe,
};

export function SocialIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name.toLowerCase()] ?? Globe;

  return <Icon aria-hidden className={className} />;
}
