import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Tooltip, Comment, Rate } from "antd";
import "antd/dist/antd.css";
import "../Components/FormCRUD/CreateProduct.css";
import moment from "moment";
import { createReview, getUser } from "../actions";

const desc = ["Malo", "Regular", "Bueno", "Muy Bueno", "Excelente !!"];

const Review = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const review = useSelector((state) => state.review);
  const user = useSelector((state) => state.user);
  const product = useSelector((state) => state.product);
  const [myreview, setMyreview] = useState(review ? review : { score: null });
  const [total, setTotal] = useState(
    reviews.reduce(function (prev, cur) {
      return prev + cur.score;
    }, 0) / reviews.length
  );
  const [editar, setEditar] = useState(!!myreview.score);
  return (
    (product &&
    reviews) && (
      <React.Fragment>
        <hr />
        <h5>Valoración promedio del producto</h5>
        <Rate disabled value={total} />
        {total ? <span className="ant-rate-text">{desc[total - 1]}</span> : ""}
        <hr />

        <div className="containerAll">
          <form
            className="containerPro"
            onSubmit={(e) => {
              setMyreview({
                ...myreview,
                userId: user.id,
                productId: product.id,
              });
              dispatch(createReview(myreview))
            }}
          >
            {" "}
            <h5>Tu valoración sobre el producto</h5>
            <Rate
              allowClear={false}
              tooltips={desc}
              onChange={(s) => {
                setMyreview({ ...myreview, score: s });
              }}
              value={myreview.score}
            />
            {myreview.score ? (
              <span className="ant-rate-text">{desc[myreview.score - 1]}</span>
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
              onChange={(e) =>
                setMyreview({ ...myreview, description: e.target.value })
              }
              required
              readonly={!!editar}
            />
            <button
              className="btn btn-primary"
              type="submit"
              value="Crear"
              style={{ margin: 0 }}
            >
              {!!editar ? "Editar" : "Enviar"}
            </button>
          </form>
        </div>
      </React.Fragment>
    )
  );
};

export default Review;
