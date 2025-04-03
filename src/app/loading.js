import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-black">
      <video autoPlay muted loop className=" h-96 w-96" src="https://res.cloudinary.com/dna3hwzre/video/upload/v1743597247/influwehub/uw69tpf19c6eao2auubl.mp4" />
    </div>
  );
}
