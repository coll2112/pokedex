import React from 'react'
import { render, screen } from '@testing-library/react'
import Main from '~/components/Main'

describe('Main', () => {
  it('should render correctly', () => {
    render(<Main />)
    expect(screen.getByText(/start coding/i)).toBeInTheDocument()
  })
})
