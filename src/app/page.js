import HomePage from "@/components/template/HomePage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) {
    redirect('/signIn');
  }

  return (
    <HomePage />
  );
}