interface Props {
  countdown: number;
}

export default function CardResult({countdown} : Props): JSX.Element {
  return (
    <section className="rounded-b-3xl bg-gradient-to-b from-violet-600 to-blue-600 p-8 text-center">
      <h3 className="pb-4 text-gray-300">Tiempo restante</h3>
      <div className="mx-auto grid h-40 w-40 place-content-center rounded-full bg-gradient-to-b from-violet-900 to-transparent">
        <span className="text-5xl font-bold text-white">{countdown}</span>
        {/* <span className="mt-2 text-sm text-gray-300">of 100</span> */}
      </div>
      <h2 className="my-4 text-xl font-medium text-white">{countdown > 0 ? 'Espera...' : 'Puedes votar'}</h2>
      <p className="text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
        magni.
      </p>
    </section>
  );
}
