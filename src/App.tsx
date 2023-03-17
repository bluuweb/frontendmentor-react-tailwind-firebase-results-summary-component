import CardLeft from "./components/CardLeft";
import CardRight from "./components/CardRight";

export default function App() {
  return (
    <main className="bg-slate-400 md:bg-purple-400">
      <div className="container mx-auto grid min-h-screen bg-slate-400 sm:place-content-center md:bg-purple-400">
        <article className="grid max-w-4xl overflow-hidden bg-white shadow-md sm:grid-cols-2 sm:rounded-3xl">
          <CardLeft />

          <CardRight />
        </article>
      </div>
    </main>
  );
}
