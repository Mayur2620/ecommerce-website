import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const order =
    JSON.parse(
      localStorage.getItem(
        "lastOrder"
      )
    );

  return (
    <div className="container py-5">

      <div className="card shadow border-0 text-center p-5">

        {/* Success Icon */}
        <div
          style={{
            fontSize: "80px",
          }}
        >
          🎉
        </div>

        <h1 className="text-success fw-bold mt-3">
          Order Placed Successfully!
        </h1>

        <p className="fs-5 mt-3">
          Thank you for shopping with us.
        </p>

        {order && (
          <>
            <h4 className="mt-4">
              Order ID:
            </h4>

            <div className="fw-bold text-primary fs-4">
              {order.orderId}
            </div>

            <p className="mt-3">
              Total Amount:
              <strong>
                {" "}
                ₹{order.total}
              </strong>
            </p>

            <p>
              Order Date:
              <strong>
                {" "}
                {order.date}
              </strong>
            </p>
          </>
        )}

        <Link
          to="/shop"
          className="btn btn-primary mt-4 px-5 py-3"
        >
          Continue Shopping
        </Link>

      </div>

    </div>
  );
};

export default OrderSuccess;