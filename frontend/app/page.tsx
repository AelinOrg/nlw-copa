import { use } from "react";

const baseUrl = "http://localhost:8090";

async function server(endpoint: string, options: RequestInit = {}) {
  try {
    return (await fetch(`${baseUrl}/${endpoint}`, options)).json();
  } catch (error) {
    console.error(error);
  }
}

function getCount(): Promise<{ count: number }> {
  return server("pools/count", {
    next: {
      revalidate: 24 * 60 * 60, // 24 hours
    },
  });
}

export default function Home() {
  const { count } = use(getCount());

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}
