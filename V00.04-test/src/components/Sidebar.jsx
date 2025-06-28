import { useState } from 'react';
import { Home, Phone, Video, PlayCircle, Flame } from 'lucide-react';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('GASMA');

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Comm', icon: Phone },
    { name: 'GASMA', icon: PlayCircle },
    { name: 'Cast', icon: Video },
    { name: 'Hot', icon: Flame },
  ];

  return (
    <div className="bg-black text-white h-screen w-20 flex flex-col items-center py-4 space-y-6 shadow-md rounded-r-3xl">
      {/* دایره به‌جای لوگو */}
      <div className="mb-4">
        <div className="w-8 h-8 bg-gray-500 rounded-full" />
      </div>

      {/* متن RAAD */}
      <div className="text-lg font-bold mb-4">RAAD</div>

      {/* آیتم‌های نویگیشن */}
      <div className="flex flex-col items-center gap-6 text-sm">
        {navItems.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className={`flex flex-col items-center p-1 rounded-lg cursor-pointer ${
              activeItem === name
                ? 'bg-white text-black'
                : 'hover:bg-gray-200 hover:text-black'
            }`}
            onClick={() => setActiveItem(name)}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
