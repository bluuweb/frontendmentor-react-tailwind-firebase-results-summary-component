import { Summary } from "../types/interfaces";
import CardAlert from "./CardAlert";

// const Summarys = [
//   {
//     icon: "fa-brands fa-angular",
//     title: "Angular",
//     value: 80,
//     total: "100",
//     bgColor: "bg-red-100",
//     titleColor: "text-red-900",
//   },
//   {
//     icon: "fa-brands fa-react",
//     title: "Javascript",
//     value: 92,
//     total: "100",
//     bgColor: "bg-yellow-100",
//     titleColor: "text-yellow-900",
//   },
//   {
//     icon: "fa-brands fa-react",
//     title: "Nuxt 3",
//     value: 61,
//     total: "100",
//     bgColor: "bg-green-100",
//     titleColor: "text-green-900",
//   },
//   {
//     icon: "fa-brands fa-react",
//     title: "Next 13",
//     value: 72,
//     total: "100",
//     bgColor: "bg-blue-100",
//     titleColor: "text-blue-900",
//   },
// ] as Summary[];

const sortSummary = (items: Array<Summary>) => {
  if (!items) return [];
  return items.sort((a, b) => {
    const valA = parseFloat(`${a.value}`);
    const valB = parseFloat(`${b.value}`);
    return isNaN(valB) ? -1 : isNaN(valA) ? 1 : valB - valA;
  });
};

export default function CardSummary({ summarys }: { summarys: Summary[] }) {
  return (
    <section className="p-8">
      <h2 className="mb-8 text-lg font-medium">Summary</h2>
      <div className="grid gap-2">
        {sortSummary(summarys).map(
          ({ icon, title, value, total, bgColor, titleColor, id }) => (
            <CardAlert
              id={id}
              key={id}
              icon={icon}
              title={title}
              value={value}
              total={total}
              bgColor={bgColor}
              titleColor={titleColor}
            />
          )
        )}
      </div>

      <button className="relative mt-4 w-full rounded-3xl bg-gradient-to-b from-sky-900 to-sky-900 py-4 text-gray-50">
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-gradient-to-b from-violet-600 to-blue-600 py-4 opacity-0 transition duration-500 hover:opacity-100">
          Continue
        </div>
        Continue
      </button>
    </section>
  );
}
