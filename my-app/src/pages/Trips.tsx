import React, {useEffect, useState} from 'react';
import './Trips.css';
import TripCard from '../components/TripCard';
import {TripProps} from "../typescript/types";
import {Skeleton, Stack} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {saveTrips} from "../redux/tripsSlice";

const Trips: React.FC = () => {
    const dispatch = useAppDispatch()

    const stateTrips =  useAppSelector((state) => state.trips)
    const [page, setPage] = useState<number>(1);
    const [trips, setTrips] = useState<TripProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return;
        }
        const nextPage = Math.ceil(stateTrips.length / 3) + 1;
        fetchData(nextPage);
    };

    const fetchData = (nextPage: number, limit= 3) => {
        setIsLoading(true);
        fetch(`http://localhost:3000/trips?_page=${nextPage}&_limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                setTrips([...stateTrips, ...data]);
                dispatch(saveTrips(data))

                setPage(page + 1);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (stateTrips.length > 0) {
            setTrips(stateTrips)
            return
        } else {
            fetchData(1, 9);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);


    return (
        <div className="Trips">
            <div className="TripsContainer">
                {trips.map((trip) => (
                        <TripCard
                            advantages={trip.advantages}
                            description={trip.description}
                            id={trip.id}
                            photoUrl={trip.photoUrl}
                            title={trip.title}
                            days={trip.days}
                            countries={trip.countries}
                            co2kilograms={trip.co2kilograms} rating={trip.rating} subtitle={trip.subtitle}/>
                    )
                )}
            </div>
            {isLoading && <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>}
        </div>
    );
}

export default Trips;
