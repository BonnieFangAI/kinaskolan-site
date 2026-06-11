"use client";

import { useActionState } from "react";

import { signInAction, type SignInState } from "@/app/admin/actions";

const initialState: SignInState = {
  status: "idle",
};

export function AdminSignInForm() {
  const [state, formAction, pending] = useActionState(signInAction, initialState);

  return (
    <form action={formAction} className="grid gap-4 md:max-w-xl">
      <input
        name="email"
        type="email"
        placeholder="name@kinaskolan.se"
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
      {state.message ? (
        <p className={`text-sm leading-7 ${state.status === "error" ? "text-rose-600" : "text-emerald-700"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
