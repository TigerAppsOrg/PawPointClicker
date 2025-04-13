import HomePage from "./homepage";
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="relative">
      <HomePage session={session} />
    </div>
  );
}
