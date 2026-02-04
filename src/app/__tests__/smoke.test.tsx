import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('home page', () => {
  it('renders', () => {
    render(<Page />)
    expect(screen.getByRole('heading', { name: /tech radar/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view this week/i })).toBeInTheDocument()
  })
})
