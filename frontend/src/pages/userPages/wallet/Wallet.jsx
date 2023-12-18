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
  const [rows, setRows] = useState(4)
  const [totalRecords, setTotalRecords] = useState(
    userData.walletTransaction?.length || 0,
  )
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
    const newTotalRecords = userData.walletTransaction?.length || 0

    console.log('Paginator changed:', {
      ...event,
      totalRecords: newTotalRecords,
    })

    setFirst(event.first)
    setRows(event.rows)
    setTotalRecords(newTotalRecords) // Add a state variable for totalRecords
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
        <div className="card">
          <h5 className="card-title" style={{padding:"10px 10px"}} >Transactions</h5>
          <br />
          <br />
          <ul>
            {userData.walletTransaction
              ?.slice(first, first + rows)
              .map((transaction, index) => (
                <li
                  key={index}
                  style={
                    transaction.type === 'credit' ? creditStyle : debitStyle
                  }
                >
                  <strong>Type:</strong> {transaction.type},{' '}
                  <strong>Amount:</strong> ${transaction.amount},{' '}
                  <strong>Date:</strong>{' '}
                  {new Date(transaction.date).toLocaleString()}
                  <hr />
                </li>
              ))}
          </ul>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={userData.walletTransaction?.length || 0}
            onPageChange={onPaginatorChange}
          />
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
const creditStyle = { color: 'green' }
const debitStyle = { color: 'red' }

export default Wallet
