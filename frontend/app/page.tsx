import { FormEvent, use } from "react";
import Image from "next/image";
import appPreview from "./assets/app-nlw-copa-preview.png";
import logo from "./assets/logo.svg";
import usersAvatarExample from "./assets/users-avatar-example.png";
import iconCheck from "./assets/icon-check.svg";
import { CreatePoolForm } from "./components/CreatePoolForm";
import { server } from "./api/server";

async function getCounts(): Promise<{
  [count in "poolsCount" | "guessesCount" | "usersCount"]: number;
}> {
  const next = { revalidate: 10 * 60 }; // 10 minutes

  try {
    const [
      { count: poolsCount },
      { count: guessesCount },
      { count: usersCount },
    ] = await Promise.all<{
      count: number;
    }>([
      server("pools/count", { next }),
      server("guesses/count", { next }),
      server("users/count", { next }),
    ]);

    return { poolsCount, guessesCount, usersCount };
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export default async function Home() {
  const { poolsCount, guessesCount, usersCount } = use(getCounts());

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
            <span className="text-ignite-500">+{usersCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <CreatePoolForm className="mt-10 flex gap-2" />

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="Ícone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolsCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Image src={iconCheck} alt="Ícone de check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessesCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </div>

      <Image src={appPreview} alt="Preview do app" quality={100} />
    </div>
  );
}
