import { FC } from "react";

import { Logo } from "@/components/icons";

const CategoryCard: FC<{ index: number; title: string }> = ({
  index,
  title,
}) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];

  return (
    <div
      className={`w-[160px] h-[250px] ${colors[index]} rounded-full flex items-center justify-center`}
    >
      <h1 className="text-white text-center text-2xl font-bold z-10 capitalize">
        {title}
      </h1>
      <Logo className="w-36 h-36 absolute opacity-10" />
    </div>
  );
};

const CategorySection: FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <section
      id="categorias"
      className="flex flex-col items-center justify-center px-4 py-6 md:py-12 lg:px-8 xl:px-10 gap-12 md:gap-16"
    >
      <div className="grid grid-cols-5 gap-10 pt-4" style={{ rowGap: "40px" }}>
        {categories.map((category, index) => (
          <CategoryCard key={category} title={category} index={index} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
