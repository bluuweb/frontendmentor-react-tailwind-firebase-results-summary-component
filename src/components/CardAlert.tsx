interface Summary {
  icon: React.FC;
  title: string;
  value: string | number;
  total: string | number;
  bgColor?: string;
  titleColor?: string;
}

export default function CardAlert({
  icon: Icon,
  title,
  value,
  total,
  bgColor = "bg-orange-100",
  titleColor = "text-orange-900",
}: Summary) {
  return (
    <article className={`flex gap-2 rounded-lg ${bgColor} p-4 font-semibold`}>
      {<Icon />}

      <span className={`flex-1 ${titleColor}`}>{title}</span>
      <div>
        <span className="mr-2  text-sky-900">{value}</span>
        <span className=" text-gray-400">/ {total}</span>
      </div>
    </article>
  );
}
