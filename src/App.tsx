// import { useState } from "react";
import "./App.css";
import OrderForm from "./components/OrderForm";

function App() {
  const handleOrder = (data: string) => {
    console.log("Order received from:", data);
  };

  return (
<h2>Title</h2>
    <OrderForm onSubmit={handleOrder} />
  );
}

export default App;
