import { User } from "firebase/auth";
import { Summary } from "../types/interfaces";
import CardAlert from "./CardAlert";

const sortSummary = (items: Array<Summary>) => {
  if (!items) return [];
  return items.sort((a, b) => {
    const valA = parseFloat(`${a.value}`);
    const valB = parseFloat(`${b.value}`);
    return isNaN(valB) ? -1 : isNaN(valA) ? 1 : valB - valA;
  });
};

interface Props {
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
  summarys: Array<Summary>;
  getTimeServer: () => void;
}

export default function CardSummary({ summarys, disabled, setDisabled, getTimeServer }: Props) {
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
              disabled={disabled} 
              setDisabled={setDisabled}
              getTimeServer={getTimeServer}
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
