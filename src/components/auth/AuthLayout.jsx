import { UtensilsCrossed } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <main className="min-h-screen bg-[#101116] text-[#fff8ed] flex items-center justify-center p-4">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#17191f] shadow-2xl md:grid-cols-2">

        {/* Left panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#29233f] via-[#171923] to-[#3b2c17] p-10 md:flex">

          <div className="flex items-center gap-3 text-2xl font-extrabold">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f5cf3d] text-[#171717]">
              <UtensilsCrossed size={21} />
            </span>

            Crave<span className="text-[#f5cf3d]">.</span>
          </div>

          <div className="relative z-10">
            <p className="mb-4 text-xs font-bold tracking-[3px] text-[#f5cf3d]">
              GOOD FOOD, GOOD MOOD
            </p>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
              Your next
              <br />
              favourite meal
              <br />

              <span className="text-[#f5cf3d]">
                is waiting.
              </span>
            </h1>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-300">
              Discover local favourites and get delicious food delivered to your door.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Fresh cravings. Fast delivery.
          </div>

          <span className="absolute right-12 top-1/3 text-6xl">
            🍕
          </span>

          <span className="absolute bottom-1/4 right-10 text-7xl">
            🍔
          </span>
        </section>

        {/* Right panel */}
        <section className="flex min-h-[600px] flex-col justify-center p-6 sm:p-10">

          <div className="mb-8 md:hidden">
            <p className="text-xl font-extrabold">
              Crave<span className="text-[#f5cf3d]">.</span>
            </p>
          </div>

          <div className="mx-auto w-full max-w-md">

            <p className="text-xs font-bold tracking-[2px] text-[#f5cf3d]">
              WELCOME TO CRAVE
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
              {title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {subtitle}
            </p>

            <div className="mt-7">
              {children}
            </div>

          </div>

          <p className="mt-8 text-center text-xs leading-5 text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>

        </section>

      </div>

    </main>
  );
}