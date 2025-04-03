import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Money Tracker</h1>
      <div className="space-x-4">
        <Link href="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
        <Link href="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
    </div>
  );
}
