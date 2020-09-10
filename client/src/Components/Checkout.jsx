import React from "react";

const Checkout = ({ total }) => {
  return (
    <React.Fragment>
      <h5 > Gastaste: ${total}. </h5>
      <h5 > Una bocha de plata man, gracias. </h5>
    </React.Fragment>
  );
};

export default Checkout;
