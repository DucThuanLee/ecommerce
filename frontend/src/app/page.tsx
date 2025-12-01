import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <Link
        href="/login"
        className="px-4 py-2 bg-yellow-400 rounded text-sm font-semibold hover:bg-yellow-500"
      >
        Go to Login
      </Link>
    </div>
  );
}
