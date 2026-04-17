import { Navbar } from "@/components/navbar";
import { Playground } from "@/components/playground";

export default function PlaygroundPage() {
  return (
    <main className="mx-auto flex h-dvh w-full max-w-7xl flex-col overflow-hidden px-5 pb-4 pt-6 sm:px-8 lg:px-10">
      <Navbar />
      <div className="min-h-0 flex-1">
        <Playground />
      </div>
    </main>
  );
}
