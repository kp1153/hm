'use client';

interface Category {
  label: string;
  value: string;
}

export default function CategoryMenu({
  categories,
  selectedCategory,
}: {
  categories: Category[];
  selectedCategory: string;
}) {
  return (
    <nav className="flex gap-4 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.value}
          className={`px-4 py-2 rounded ${
            selectedCategory === cat.value
              ? "bg-amber-600 text-white font-bold"
              : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => {
            window.location.search =
              cat.value === "न्यूज"
                ? ""
                : `?category=${encodeURIComponent(cat.value)}`;
          }}
        >
          {cat.label}
        </button>
      ))}
    </nav>
  );
}
