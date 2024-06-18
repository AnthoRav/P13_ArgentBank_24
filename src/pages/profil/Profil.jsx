import React from "react";
import UserName from "../../components/useredit/UserEdit";
import Account from "../../components/account/Account";

function Profil () {
  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "184.30",
      description: "Current Balance",
    },
  ];
  return (
    <main className="user">
      <UserName />
      <section className="user_accounts">
        {accounts &&
          accounts.map((account, index) => (
            <Account key={index} account={account} />
          ))}
      </section>
    </main>
  );
}
export default Profil;
