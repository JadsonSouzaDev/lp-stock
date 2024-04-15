"use client";

import Autoplay from "embla-carousel-autoplay";
import { FC, useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CampaignSection: FC = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-[380px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="bg-orange-200 h-[380px] w-full flex flex-col items-center justify-center">
              <h1 className="text-4xl text-orange-100">
                Banner com campanha {index + 1}
              </h1>
              <h1 className="text-4xl text-orange-100">1280x380</h1>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext className="text-red-800" />
    </Carousel>
  );
};
export default CampaignSection;
