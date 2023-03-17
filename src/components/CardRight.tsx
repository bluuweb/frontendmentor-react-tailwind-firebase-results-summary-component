import CardAlert from "./CardAlert";

import IconMemory from "./icons/icon-memory";
import IconReaction from "./icons/icon-reaction";
import IconVerbal from "./icons/icon-verbal";
import IconVisual from "./icons/icon-visual";

const Summarys = [
  {
    icon: IconReaction,
    title: "Reaction",
    value: "80",
    total: "100",
    bgColor: "bg-red-100",
    titleColor: "text-red-900",
  },
  {
    icon: IconMemory,
    title: "Memory",
    value: 92,
    total: "100",
    bgColor: "bg-yellow-100",
    titleColor: "text-yellow-900",
  },
  {
    icon: IconVerbal,
    title: "Verbal",
    value: "61",
    total: "100",
    bgColor: "bg-green-100",
    titleColor: "text-green-900",
  },
  {
    icon: IconVisual,
    title: "Visual",
    value: "72",
    total: "100",
    bgColor: "bg-blue-100",
    titleColor: "text-blue-900",
  },
];

export default function CardRight() {
  return (
    <section className="p-8">
      <h2 className="mb-8">Summary</h2>
      <div className="grid gap-2">
        {Summarys.map(
          ({ icon, title, value, total, bgColor, titleColor }, index) => (
            <CardAlert
              key={index}
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
