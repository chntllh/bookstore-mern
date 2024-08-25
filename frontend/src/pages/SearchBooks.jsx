import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [searchFields, setSearchFields] = useState({
    title: false,
    author: false,
    publishYear: false,
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSearchFields({ ...searchFields, [name]: checked });
  };

  const handleSearch = () => {
    setLoading(true)
    const params = {}
    if (searchFields.title) {
      params.title = query
    }
    if (searchFields.author) {
      params.author = query
    }
    if (searchFields.publishYear) {
      params.publishYear = query
    }
    axios
      .get('http://localhost:5555/books/search', { params })
      .then((response) => {
        setLoading(false)
        // console.log(response.data.data)
        setResults(response.data.data)
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Search Book</h1>
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='flex-row'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query..."
            className='border-2 broder-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className="flex-row">
          <input
            type="checkbox"
            name="title"
            checked={searchFields.title}
            onChange={handleCheckboxChange}
          />
          <label className='px-2'>
            Search by Title
          </label>
          <input
            type="checkbox"
            name="author"
            checked={searchFields.author}
            onChange={handleCheckboxChange}
          />
          <label className='px-2'>
            Search by Author
          </label>
          <input
            type="checkbox"
            name="publishYear"
            checked={searchFields.publishYear}
            onChange={handleCheckboxChange}
          />
          <label className='px-2'>
            Search by Publish Year
          </label>
        </div>
        <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white">
          Search
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


    </div>
  );
};

export default SearchBook;
