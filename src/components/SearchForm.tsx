import React, { useState, FormEvent } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
  setSearched: (query: boolean) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, setSearched }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(query);
    setSearched(true);
  };

  return (
    <form className="content" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter movie title"
        required
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
