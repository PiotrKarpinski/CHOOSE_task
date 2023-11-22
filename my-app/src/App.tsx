import React from 'react';
import './App.css';
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import Trips from "./pages/Trips";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import TripPage from "./pages/TripPage";



function App() {
    const theme = extendTheme({
        styles: {
            global: () => ({
                body: {
                    color: "gray.900",
                    bg: "gray.50",
                },
            }),
        },
    });

    return (

        <BrowserRouter>
            <ChakraProvider theme={theme}>

            <Routes>
                <Route path="/" element={<Trips />} />
                <Route path="trips/:id" element={<TripPage />} />
            </Routes>
            </ChakraProvider>
        </BrowserRouter>


    );
}

export default App;
