export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex space-x-4 border-b border-gray-600">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 capitalize ${
            active === tab
              ? "text-yellow-400 border-b-2 border-yellow-400"
              : "text-gray-300"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
