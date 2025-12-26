import dynamic from "next/dynamic";

const SponsorClient = dynamic(
  () => import("./SponsorClient"),
  { ssr: false }
);

export default function SponsorPage() {
  return <SponsorClient />;
}