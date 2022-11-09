import { use } from "react";
import Image from "next/image";
import appPreview from "./assets/app-nlw-copa-preview.png";
import logo from "./assets/logo.svg";
import usersAvatarExample from "./assets/users-avatar-example.png";
import iconCheck from "./assets/icon-check.svg";

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
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <div>
        <Image src={logo} alt="Logo" />

        <h1 className="mt-14 text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExample} alt="Usuários" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+12.592</span> pessoas já estão
            usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600"
            type="text"
            placeholder="Qual nome do seu bolão?"
            required
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm hover:bg-yellow-700"
            type="submit"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="Ícone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="Ícone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </div>

      <Image src={appPreview} alt="Preview do app" quality={100} />
    </div>
  );
}
