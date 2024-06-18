import React from "react";
import GreenButton from "../greenbtn/GreenBtn";

function Account({ account }) {
  return (
    <div className="account">
      <div className="account_container">
        <h3 className="account_title">{account.title}</h3>
        <p className="account_amount">${account.amount}</p>
        <p className="account_description">{account.description}</p>
      </div>
      <div className="account_btn">
        <GreenButton text="View transactions" onClick={undefined} />
      </div>
    </div>
  );
}

export default Account;
