import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2 text-sm">{product.code}</p>
        {product.illustration && (
          <img
            src={product.illustration}
            alt={product.name}
            className="w-full h-48 object-cover mb-4"
          />
        )}
        <p className="text-gray-700 mb-4 line-clamp-2">
          {product.description || "No description available"}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <Link href={`/products/${product.id}`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
