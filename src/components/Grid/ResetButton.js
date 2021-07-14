import React from 'react'

export const ResetButton = ({ initialCells, setCells }) => {

  const style = {
    border: '1px solid #DC2626',
    borderRadius: '8px',
    backgroundColor: '#DC2626',
    color: 'white',
    padding: '0.5rem 1rem',
    marginBottom: '1.5rem',
    width: '3rem',
    textAlign: 'center',
    cursor: 'pointer',
  }

  return <div style={style} onClick={() => setCells(initialCells)}>Reset</div>
}
