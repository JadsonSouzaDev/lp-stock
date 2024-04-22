import Link from "next/link";
import { FC } from "react";

import { Logo } from "@/components/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CategoryCard: FC<{ index: number; title: string }> = ({
  index,
  title,
}) => {
  const indexColor = index % 5;
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  return (
    <Link
      href={`/?search=${title}`}
      className={`w-[160px] h-[250px] mx-auto ${colors[indexColor]} rounded-full flex items-center justify-center cursor-pointer`}
    >
      <h1 className="text-white text-center text-2xl font-bold z-10 capitalize">
        {title}
      </h1>
      <Logo className="w-36 h-36 absolute opacity-10" />
    </Link>
  );
};

const CategorySection: FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <section
      id="categorias"
      className="flex items-center justify-center py-6 md:pt-20 gap-12 md:gap-16"
    >
      <Carousel className="w-full" opts={{ align: "center" }}>
        <CarouselContent className="md:ml-20">
          {categories.map((category, index) => (
            <CarouselItem key={category} className="md:-pl-20   md:basis-1/5">
              <CategoryCard title={category} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CategorySection;
