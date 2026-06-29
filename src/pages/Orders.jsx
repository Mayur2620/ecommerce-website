import { Link } from "react-router-dom";

const Orders = () => {
  const orders =
    JSON.parse(
      localStorage.getItem(
        "orders"
      )
    ) || [];

  return (
    <div className="container py-5">

      <h2 className="mb-4 fw-bold">
        My Orders 📦
      </h2>

      {orders.length === 0 ? (
        <div className="text-center">

          <h4>
            No Orders Found
          </h4>

          <Link
            to="/shop"
            className="btn btn-primary mt-3"
          >
            Start Shopping
          </Link>

        </div>
      ) : (
        orders
          .slice()
          .reverse()
          .map(
            (
              order,
              index
            ) => (
              <div
                key={index}
                className="card shadow-sm mb-4 p-4"
              >

                <div className="d-flex justify-content-between">

                  <div>
                    <h5>
                      Order ID:
                      {" "}
                      {
                        order.orderId
                      }
                    </h5>

                    <p>
                      Date:
                      {" "}
                      {
                        order.date
                      }
                    </p>
                  </div>

                  <div>
                    <h5 className="text-success">
                      ₹
                      {
                        order.total.toFixed(
                          0
                        )
                      }
                    </h5>
                  </div>

                </div>

                <hr />

                {order.items.map(
                  (
                    item
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className="row align-items-center mb-3"
                    >

                      <div className="col-md-2">

                        <img
                          src={
                            item.image
                          }
                          alt={
                            item.title
                          }
                          className="img-fluid"
                          style={{
                            height:
                              "80px",
                            objectFit:
                              "contain",
                          }}
                        />

                      </div>

                      <div className="col-md-8">

                        <h6>
                          {
                            item.title
                          }
                        </h6>

                        <small>
                          Qty:
                          {" "}
                          {
                            item.quantity
                          }
                        </small>

                      </div>

                      <div className="col-md-2">

                        ₹
                        {
                          item.price
                        }

                      </div>

                    </div>
                  )
                )}

              </div>
            )
          )
      )}

    </div>
  );
};

export default Orders;