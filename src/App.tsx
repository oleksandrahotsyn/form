import { useState } from "react";
import axios from "axios";
import "./App.css";
import OrderForm from "./components/OrderForm";
import SearchForm from "./components/SearchForm";

interface Article {
  objectID: string;
  title: string;
  url: string;
}

interface ArticlesHttpResponse {
  hits: Article[];
}

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
      const response = await axios.get<ArticlesHttpResponse>(
        `https://hn.algolia.com/api/v1/search?query=${topic}`
      );

      setArticles(response.data.hits);
      console.log(response.data);
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
      {articles.length > 0 && (
        <ul>
          {articles.map(({ objectID, url, title }) => (
            <li key={objectID}>
              <a href={url} target="_blank">
                {title}
              </a>
            </li>
          ))}
        </ul>
      )}
      <OrderForm onSubmit={handleOrder} />
    </>
  );
}

export default App;
