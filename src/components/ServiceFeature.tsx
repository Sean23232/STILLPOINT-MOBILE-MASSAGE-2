import {
  Compass,
  SlidersHorizontal,
  Layers,
  MessageSquare,
} from "lucide-react";

interface ServiceFeatureProps {
  title: string;
  description: string;
  iconName: "compass" | "sliders" | "layers" | "message";
  index: number;
}

export function ServiceFeature({
  title,
  description,
  iconName,
  index,
}: ServiceFeatureProps) {
  const Icon =
    iconName === "compass"
      ? Compass
      : iconName === "sliders"
      ? SlidersHorizontal
      : iconName === "layers"
      ? Layers
      : MessageSquare;

  return (
    <div className="border-t border-[#292D29]/15 pt-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-[#233C32]/20 bg-white text-[#233C32]">
          <Icon className="h-4 w-4 stroke-[1.6]" aria-hidden="true" />
        </span>
        <span className="font-mono text-xs text-[#525852]">
          0{index + 1}
        </span>
      </div>
      <h3 className="mt-5 font-serif text-2xl font-normal text-[#292D29]">
        {title}
      </h3>
      <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#292D29]/80">
        {description}
      </p>
    </div>
  );
}
