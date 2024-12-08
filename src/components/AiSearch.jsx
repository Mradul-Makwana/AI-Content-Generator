import { useRef, useState } from "react";
import openai from "../utils/openApi";
import ReactMarkDown from "react-markdown";

export const AiSearch = () => {
  const searchText = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState("");

  const handleAISearch = async () => {
    const prompt = `Act an an AI recommendation system and give me relevant output based on ${searchText.current.value}`;
    try {
      setLoading(true);
      setError(null);
      const gptresult = await openai.generateContent(prompt);
      const response = gptresult.response;

      const text = response.text();

      if (!text) {
        return;
      }

      setSearchResult(text);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid py-5 w-75">
      <h2> AI Search</h2>
      <div className="">
        <form action="#" className="d-flex">
          <input
            ref={searchText}
            type="search"
            placeholder="eg: How to setup React.js project"
            className="form-control"
          />
          <button onClick={handleAISearch} className="btn btn-info text-nowrap">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <h3 className="position-absolute top-50 start-50 translate-middle">
          Loading...
        </h3>
      ) : (
        searchResult && (
          <div className="border border-1 border-secondary rounded my-2 p-4">
            <ReactMarkDown>{searchResult}</ReactMarkDown>
          </div>
        )
      )}
    </div>
  );
};
