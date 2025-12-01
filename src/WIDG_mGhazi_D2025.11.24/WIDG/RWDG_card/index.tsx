import { People, MoneySend, ShoppingCart, ArchiveTick } from "iconsax-react";
import React from "react";

// --- ✨ A clear and strong type for our card data ---
interface CardData {
  id: string | number;
  title: React.ReactNode;
  value: string | number;
  subtitle: string;
  // We expect the icon to be a component type, like `People` from iconsax-react.
  icon: React.ElementType;
  // The background color should be a Tailwind CSS class string (e.g., "bg-blue-100").
  backgroundColor: string;
}

// The props for our main component.
export interface Props {
  logic?: {
    cards: CardData[];
  };
}

// --- ✨ Awesome default data for demo purposes ---
export const defaultLogic: { cards: CardData[] } = {
  cards: [
    {
      id: "users",
      title: "Total Users",
      value: "11,238",
      subtitle: "+16%",
      icon: People,
      backgroundColor: "bg-blue-100",
    },
    {
      id: "orders",
      title: "Total Orders",
      value: "23,890",
      subtitle: "+8%",
      icon: ShoppingCart,
      backgroundColor: "bg-green-100",
    },
    {
      id: "revenue",
      title: "Total Revenue",
      value: "$1.2M",
      subtitle: "+21%",
      icon: MoneySend,
      backgroundColor: "bg-yellow-100",
    },
    {
      id: "completed",
      title: "Tasks Completed",
      value: "5,430",
      subtitle: "this week",
      icon: ArchiveTick,
      backgroundColor: "bg-indigo-100",
    },
  ],
};

const Card: React.FC<Props> = ({
  // If `logic` isn't provided, our default data saves the day!
  logic = defaultLogic,
}) => {
  const { cards } = logic;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {(cards ?? []).map((card) => {
        // We can destructure for cleaner access. The Icon component is capitalized
        // as is standard for React components.
        const {
          id,
          backgroundColor,
          icon: Icon,
          title,
          value,
          subtitle,
        } = card;

        return (
          <div
            key={id} // ✨ IMPROVED: Using a stable ID for the key.
            // A small safety check for the background color.
            className={`flex items-center justify-center rounded-lg border py-4 gap-2 ${
              backgroundColor ?? "bg-gray-100"
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <Icon size={35} className="text-gray-800" color="currentColor" />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <div>{title}</div>
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg font-bold">{value}</span>
                <span className="text-sm text-gray-600">({subtitle})</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
