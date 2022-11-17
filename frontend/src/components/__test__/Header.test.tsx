import { Header } from '../header';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

it("renders with correct header", () => {
    render(<Header darkMode={false} setDarkMode={()=>{}}/>)
    screen.getByText(/damp/i);
})
 // Not much more to test