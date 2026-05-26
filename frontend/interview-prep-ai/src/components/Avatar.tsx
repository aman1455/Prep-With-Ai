type AvatarSize = "sm" | "md" | "lg";

const sizeConfig: Record<AvatarSize, { container: string; image: string }> = {
  sm: { container: "w-8 h-8 text-xs", image: "w-8 h-8" },
  md: { container: "w-10 h-10 text-sm", image: "w-10 h-10" },
  lg: { container: "w-14 h-14 text-base", image: "w-14 h-14" },
};

const accentGradients = [
  "from-accent via-accent-secondary to-pink",
  "from-accent-secondary via-cyan-400 to-accent",
  "from-pink via-accent to-accent-secondary",
  "from-accent via-pink to-accent-secondary",
  "from-accent-secondary via-accent to-pink",
];

const getInitials = (name: string): string => {
  if (!name) return "";
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getGradient = (name: string): string => {
  if (!name) return accentGradients[0];
  const hash = Array.from(name.toLowerCase()).reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  return accentGradients[hash % accentGradients.length];
};

interface AvatarProps {
  name?: string;
  image?: string;
  size?: AvatarSize;
  className?: string;
}

const Avatar = ({ name = "", image = "", size = "md", className = "" }: AvatarProps) => {
  const initials = getInitials(name);
  const gradient = getGradient(name);
  const config = sizeConfig[size] || sizeConfig.md;
  const hasImage = typeof image === "string" && image.trim().length > 0;

  if (hasImage) {
    return (
      <img
        src={image}
        alt={name || "Avatar"}
        className={`rounded-full object-cover ${config.image} ${className} transition-transform duration-200 hover:scale-105 ring-2 ring-border`}
      />
    );
  }

  return (
    <div
      className={`rounded-full flex items-center justify-center ${config.container} bg-gradient-to-br ${gradient} text-white font-semibold ${className} transition-transform duration-200 hover:scale-105 ring-2 ring-border/50`}
    >
      {initials || "U"}
    </div>
  );
};

export default Avatar;
