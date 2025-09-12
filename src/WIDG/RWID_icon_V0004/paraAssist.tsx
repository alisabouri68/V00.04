
interface StylePanelProps {
  currentStyle: React.CSSProperties;
  onStyleChange: (style: React.CSSProperties) => void;
}

const StylePanel = ({ onStyleChange }: StylePanelProps) => {
  return (
    <div className="p-1 border rounded-xl shadow-lg bg-light text-dark">
      <h3 className="font-bold mb-2 text-gray-700">تنظیمات استایل</h3>

      <label className="block mb-2 text-gray-600 bg-light text-dark">
        رنگ:
        <input
          type="color"
          onChange={(e) => onStyleChange({ color: e.target.value })}
          className="w-full h-8 mt-1 rounded border bg-light text-dark"
        />
      </label>

      <label className="block mb-2 text-gray-600 bg-light text-dark">
        اندازه فونت:
        <input
          type="number"
          onChange={(e) =>
            onStyleChange({
              fontSize: `${e.target.value}px`,
            })
          }
          className="w-full p-1 mt-1 rounded border bg-light text-dark"
        />
      </label>

      {/* مارجین */}
      <label className="block mb-2 text-gray-600 bg-light text-dark">
        مارجین:
        <input
          type="text"
          onChange={(e) => onStyleChange({ margin: e.target.value })}
          className="w-full p-1 mt-1 rounded border bg-light text-dark"
        />
      </label>
    </div>
  );
};

export default StylePanel;
