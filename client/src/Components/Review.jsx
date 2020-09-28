import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Rate } from "antd";
import "antd/dist/antd.css";
import "../Components/FormCRUD/CreateProduct.css";
import { createReview, getReviews, getUserSession } from "../redux/actions";

const desc = ["Malo", "Regular", "Bueno", "Muy Bueno", "Excelente !!"];

const Review = (props) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);
  const [check, setCheck] = useState(false);

  const [myreview, setMyreview] = useState({
    description: null,
    score: null,
    productId: props.id,
    userId: user.id,
  });

  const total =
    reviews.reduce((prev, cur) => {
      return prev + cur.score;
    }, 0) / reviews.length;

  useEffect(() => {
    dispatch(getReviews(props.id));
  }, []);

  return (
    product &&
    reviews && (
      <React.Fragment>
        <hr />
        <h5>Valoración promedio del producto</h5>
        <Rate disabled value={total} />
        {total ? <span className="ant-rate-text">{desc[total - 1]}</span> : ""}
        <div>
          <button
            className="btn btn-success mt-4"
            onClick={() => setCheck(!check)}
          >
            {check ? "Ocultar Valoraciones" : "Ver Todas las Valoraciones"}
          </button>
        </div>
        {check &&
          reviews &&
          reviews.map((review) => {
            return (
              <div>
                <Rate disabled value={review.score} />
                {review.score ? (
                  <span className="ant-rate-text">
                    {desc[review.score - 1]}
                  </span>
                ) : (
                  ""
                )}
                <div>{review.description}</div>
                <hr />
              </div>
            );
          })}

        {user.id ? (
          <div className="containerAll">
            <form
              className="containerPro"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(createReview(myreview));
                console.log(reviews);
              }}
            >
              <h5>Tu valoración sobre el producto</h5>
              <Rate
                allowClear={false}
                tooltips={desc}
                value={myreview.score}
                onChange={(s) => {
                  setMyreview({ ...myreview, userId: user.id, score: s });
                }}
              />
              {myreview.score ? (
                <span className="ant-rate-text">
                  {desc[myreview.score - 1]}
                </span>
              ) : (
                ""
              )}
              <hr />
              <input
                className="form-control"
                type="text"
                id="description"
                name="description"
                placeholder="¿Qué dirias del producto?"
                value={myreview.description}
                onChange={(e) => {
                  setMyreview({
                    ...myreview,
                    userId: user.id,
                    description: e.target.value,
                  });
                }}
                required
              />
              <button
                className="btn btn-primary"
                type="submit"
                value="Crear"
                style={{ margin: 0 }}
              >
                Valorar Producto
              </button>
            </form>
          </div>
        ) : (
          <div className="login">
            No tenes cuenta ?
            <Link className="nav-link" to="/users">
              Registrate acá
            </Link>
          </div>
        )}
      </React.Fragment>
    )
  );
};

export default Review;
