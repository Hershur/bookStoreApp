import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<Record<string, never>[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableName, setTableName] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const tableHeaders = data.length > 0 && Object.keys(data[0]);

  const fetchData = useCallback(async (table: string) => {

    try {
      const url = `http://localhost:5500/fetch/${table || 'user'}`;
      const result = await fetch(url);
      const response = await result.json();
      setLoading(false);
      setData(response.data);
      
    } catch (error) {
      setLoading(false);
      console.error(error);
    }

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
          {!loading && data.length === 0 && <strong>No records....</strong>}
          {
            !loading && data.length > 0 &&
            <table className="fl-table">
                <thead>
                  <tr>
                      {
                        tableHeaders && tableHeaders.length > 0 && tableHeaders.map(header => (
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
                              objRecord.map(x => (
                                <td>{x}</td>

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
