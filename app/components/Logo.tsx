import Image from "next/image";

const LOGO_ASPECT = 642 / 113;

export default function Logo({ height = 26 }: { height?: number }) {
  const width = Math.round(height * LOGO_ASPECT);
  return (
    <Image
      src="/journeypal_logo.svg"
      alt="JourneyPal"
      width={width}
      height={height}
      priority
      className="block"
    />
  );
}
