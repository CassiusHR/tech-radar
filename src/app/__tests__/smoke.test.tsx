import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('home page', () => {
  it('renders', async () => {
    const el = await Page()
    render(el as unknown as React.ReactElement)
    expect(screen.getByText(/tech radar/i)).toBeInTheDocument()
  })
})
