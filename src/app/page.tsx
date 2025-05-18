import { Button } from "@/components/ui/button";

import Link from "next/link";

const Home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link href="/documents/123">
        <Button>
          My Button
        </Button>
      </Link>
    </div>
  );
}

export default Home;