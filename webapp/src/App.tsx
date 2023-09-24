import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<Record<string, never>[]>();
  const [loading, setLoading] = useState(true);
  const [tableName, setTableName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const tableHeaders = data && data?.length > 0 && Object.keys(data[0]);

  const fetchData = useCallback(async (table: string) => {
    const url = `http://localhost:5500/fetch/${table || 'user'}`;
    // const result = await fetch(url);
    // const response = await result.json();

    fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .then((response) => {
      setLoading(false);
      setData(response.data);
    })
    .catch((response) => {
      response.json().then((json: unknown) => {
        setLoading(false);
        const errorResponse = (json as {message: string, data: unknown});
        setErrorMessage(errorResponse.message);
        setData(errorResponse.data as undefined);
      })
    })

  }, []);

  useEffect(() => {
    fetchData(tableName);
  }, [fetchData, tableName])

  return (
    <>
      <h2>Data Table</h2>

      <div className="search-box">
        <button 
          type='button'
          className="btn-search"
          onClick={(e) => {
            e.preventDefault();
            setTableName(formData.table)
          }}
        >
            Search
        </button>

        <input 
          onChange={(e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}))} 
          type="text" 
          name='table' 
          className="input-search" 
          placeholder="Enter table name..." 
        />
      </div>

      <div className="table-wrapper">
          {loading && <strong>Loading data...</strong>}
          {!loading && data?.length === 0 && <strong>No records....</strong>}
          {errorMessage && <strong>{errorMessage}</strong>}
          {
            !loading && data && data?.length > 0 &&
            <table className="fl-table">
                <thead>
                  <tr>
                      {
                        tableHeaders && tableHeaders?.length > 0 && tableHeaders.map(header => (
                          <th key={header}>{header}</th>
                        ))
                      }
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map(record => {
                      const objRecord = Object.values(record);
                      
                      return (
                        <tr key={record.id}>
                            {
                              objRecord.map((x, i)=> (
                                <td key={i}>{x}</td>

                              ))
                            }
                        </tr>
                      )
                    })
                  }
                </tbody>
            </table>
          }
      </div>
    </>
  )
}

export default App
