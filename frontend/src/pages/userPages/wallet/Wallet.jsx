import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/userComponents/navBar/navBar'
import { useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator } from 'primereact/paginator'
import {
  useUpdateProfileMutation,
  useUsergetProfileMutation,
} from '../../../redux/slices/userApiSlice'

const Wallet = ({ balance }) => {
  const [userData, setUserData] = useState({})
  const { userInfo } = useSelector((state) => state.auth)
  const [getProfile] = useUsergetProfileMutation()
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(5)

  const fetchUserProfile = async () => {
    const responseFromApiCall = await getProfile({
      email: userInfo.email,
    })
    if (responseFromApiCall) {
      setUserData(responseFromApiCall.data.user)
    }
  }

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const onPaginatorChange = (event) => {
    setFirst(event.first)
    setRows(event.rows)
  }

  const transactionColumns = [
    { field: 'type', header: 'Type' },
    { field: 'amount', header: 'Amount' },
    { field: 'date', header: 'Date' },
  ]

  return (
    <div>
      <NavBar />
      <div className="card" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title">Wallet</h5>
          <p style={{ paddingTop: '20px' }} className="card-text">
            Balance: ₹{userData.wallet || 0}
          </p>
        </div>
      </div>
      <div style={styles.transactionCard}>
        <div className="card-body">
          <h5 className="card-title">Transactions</h5>
          <DataTable
            value={userData.walletTransaction?.slice(first, first + rows) || []}
            paginator
            rows={rows}
            totalRecords={userData.walletTransaction?.length || 0}
            onPage={onPaginatorChange}
          >
            {transactionColumns.map((col) => (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                body={(rowData) => (
                  <span
                    style={{
                      color: rowData.type === 'debit' ? 'red' : 'green',
                    }}
                  >
                    {rowData[col.field]}
                  </span>
                )}
              ></Column>
            ))}
          </DataTable>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    width: '350px',
    height: '200px',
    margin: '150px 100px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    background: 'linear-gradient(to right, #c9a3ff, #8360c3)', // Light purple to dark purple gradient
    transition: 'background 0.3s ease',
  },
  transactionCard: {
    width: '550px',
    height: '400px',
    margin: '-350px 300px  ',
    boxShadow: '0 4px 8px rgba(0.1, 0, 0, 0.1)',
    borderRadius: '8px',
    float: 'right',
  },
}

export default Wallet
