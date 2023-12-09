import React from 'react'
import { ProgressBar } from 'primereact/progressbar'

export default function PrimeLoader() {
  return (
    <div
      className="card"
      style={{ justifyContent: 'center', height: '100vh', lignItems: 'center', padding:"10px 300px"}}
    >
      <h3>Wayfarer</h3>
      <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
    </div>
  )
}
