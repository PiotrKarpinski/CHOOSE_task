import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { TripProps } from '../typescript/types'
// Define a type for the slice state


// Define the initial state using that type
const initialState: TripProps[] = []



export const TripsSlice = createSlice({
    name: 'trips',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        saveTrip: (state,  action: PayloadAction<TripProps>) => {
            state.push(action.payload)
        },
        saveTrips: (state,  action: PayloadAction<TripProps[]>) => {
            return [...state, ...action.payload]
        }

    },
})

export const { saveTrip } = TripsSlice.actions
export const { saveTrips } = TripsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getTrip = (state: RootState, id: string | undefined) => state.trips.find(trip => trip.id == id)

export default TripsSlice.reducer
