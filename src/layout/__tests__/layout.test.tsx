import React from 'react'
import { render, screen } from '@testing-library/react'
import Layout from '~/layout/layout'

describe('Layout', () => {
  it('should render correctly', () => {
    render(
      <Layout>
        <h2>test</h2>
      </Layout>
    )
    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
})
