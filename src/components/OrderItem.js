import Link from "next/link";

export default function OrderItem({ order }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <Link href={`/orders/${order.id}`}>
      <div className="bg-white shadow-md rounded-md p-6 hover:shadow-lg cursor-pointer">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{order.orderNumber}</h3>
          <span className="text-lg font-bold">
            ${order.totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{order.createdAt ? formatDate(order.createdAt) : "N/A"}</span>
          <span>
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>
    </Link>
  );
}
