import Image from "next/image";
import MiznexLogo from "@/../public/icon-512x512.png";
import { useRouter } from "next/navigation";

interface LogoProps {
  className?: string;
  width?: number;
  sizes?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  width = 140,
  sizes = "140px",
}) => {
  const router = useRouter();
  return (
    <>
      <Image
        data-testid="logo"
        priority
        src={MiznexLogo}
        alt="Miznex Logo"
        className={`block dark:hidden object-contain cursor-pointer ${className}`}
        width={width}
        onClick={() => router.push("/")}
        sizes={sizes}
      />
    </>
  );
};

export default Logo;
