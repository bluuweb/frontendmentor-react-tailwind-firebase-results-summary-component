export default function App() {
  return (
    <div className="grid min-h-screen place-content-center bg-slate-400 md:bg-purple-400">
      <article className="grid max-w-4xl grid-cols-2 overflow-hidden rounded-md bg-white shadow-md">
        <section className="bg-gradient-to-b from-violet-600 to-blue-600 p-12 text-center">
          <h3 className="pb-4 text-gray-300">Your result</h3>
          <div className="mx-auto grid h-40 w-40 place-content-center rounded-full bg-gradient-to-b from-violet-900 to-transparent">
            <span className="text-5xl font-bold text-white">76</span>
            <span className="mt-2 text-sm text-gray-300">of 100</span>
          </div>
          <h2 className="my-4 text-xl text-white">Great</h2>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, magni.
          </p>
        </section>

        <section className="">card 2</section>
      </article>
    </div>
  );
}
