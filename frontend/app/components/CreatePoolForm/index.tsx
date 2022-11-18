"use client";

import { FormEvent } from "react";
import { server } from "../../api/server";

interface CreatePoolFormProps {
  className?: string;
}

export function CreatePoolForm({ className }: CreatePoolFormProps) {
  async function handleCreatePool(event: FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const formData = new FormData(form);

    const pool = {
      title: formData.get("pools") as string,
    };

    const { code } = await server<{ code: string }>("pools", {
      method: "POST",
      body: JSON.stringify(pool),
    });

    form.reset();

    await navigator.clipboard.writeText(code);

    alert(`Seu código (${code}) foi copiado para a área de transferência`);
  }

  return (
    <form className={className} onSubmit={handleCreatePool}>
      <input
        className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600"
        name="pools"
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
  );
}
