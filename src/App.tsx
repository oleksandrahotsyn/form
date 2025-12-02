// import { useState } from "react";
import "./App.css";

function App() {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get("username") as string;
    console.log("Name:", username);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
