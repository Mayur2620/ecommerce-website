import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "currentUser"
      )
    );

  const orders =
    JSON.parse(
      localStorage.getItem(
        "orders"
      )
    ) || [];

  const totalSpent =
    orders.reduce(
      (
        total,
        order
      ) =>
        total +
        order.total,
      0
    );

  const handleLogout =
    () => {
      localStorage.removeItem(
        "isLoggedIn"
      );

      localStorage.removeItem(
        "currentUser"
      );

      navigate("/shop");

      window.location.reload();
    };

  return (
    <div className="container py-5">

      <div className="card shadow border-0 p-5">

        <div className="text-center">

          <div
            className="rounded-circle bg-primary text-white mx-auto d-flex align-items-center justify-content-center"
            style={{
              width: "100px",
              height: "100px",
              fontSize: "40px",
            }}
          >
            {currentUser?.name?.charAt(
              0
            )}
          </div>

          <h2 className="mt-3">
            {
              currentUser?.name
            }
          </h2>

          <p className="text-muted">
            {
              currentUser?.email
            }
          </p>

        </div>

        <hr />

        <div className="row text-center">

          <div className="col-md-4">
            <h3>
              {
                orders.length
              }
            </h3>

            <p>
              Total Orders
            </p>
          </div>

          <div className="col-md-4">
            <h3>
              ₹
              {totalSpent.toFixed(
                0
              )}
            </h3>

            <p>
              Total Spent
            </p>
          </div>

          <div className="col-md-4">
            <Link
              to="/orders"
              className="btn btn-primary"
            >
              View Orders
            </Link>
          </div>

        </div>

        <hr />

        <button
          className="btn btn-danger mt-3"
          onClick={
            handleLogout
          }
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Profile;