import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
      <section className="flex flex-column align-items-center justify-content-center">
        <div
          style={{
            borderRadius: '56px',
            padding: '0.3rem',
            background:
              'linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)',
          }}
        >
          <div
            className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
            style={{ borderRadius: '53px' }}
          >
            <span className="text-blue-500 font-bold text-3xl">404</span>
            <h1 className="text-900 font-bold text-5xl mb-2">Page Not Found</h1>
            <div className="text-600 mb-5">
              Sorry, the page you are looking for does not exist   .
            </div>
            <Link
              to="/"
              className="p-button p-component p-button-primary"
              style={{
                textDecoration: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '2rem',
              }}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default NotFoundPage
