import CardLeft from "./components/CardLeft";
import CardRight from "./components/CardRight";

export default function App() {
  return (
    <div className="grid min-h-screen place-content-center bg-slate-400 md:bg-purple-400">
      <article className="grid max-w-4xl grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-md">
        <CardLeft />

        <CardRight />
      </article>
    </div>
  );
}
