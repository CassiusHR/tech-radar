import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('home page', () => {
  it('renders', () => {
    render(<Page />)
    // default next template includes "Get started" text
    expect(screen.getByText(/get started/i)).toBeInTheDocument()
  })
})
