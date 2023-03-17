import { Summary } from "../types/interfaces";

export default function CardAlert({
  id,
  icon,
  title,
  value,
  total,
  bgColor = "bg-orange-100",
  titleColor = "text-orange-900",
}: Summary) {
  return (
    <article
      className={`flex items-center gap-2 rounded-lg ${bgColor} p-4 font-semibold`}
    >
      <i className={icon}></i>

      <span className={`flex-1 ${titleColor}`}>{title}</span>
      <div>
        <span className="mr-2  text-sky-900">{value}</span>
        <span className=" text-gray-400">/ {total}</span>
      </div>
    </article>
  );
}
