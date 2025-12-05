import { useState } from "react";
import "./App.css";
import OrderForm from "./components/OrderForm";
import SearchForm from "./components/SearchForm";
import fetchArticles from "./services/articleService";
import type { Article } from "./types/article";
import ArticleList from "./components/ArticleList";

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleOrder = (data: string) => {
    console.log("Order received from:", data);
  };

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1>"Title"</h1>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
      <OrderForm onSubmit={handleOrder} />
    </>
  );
}

export default App;
