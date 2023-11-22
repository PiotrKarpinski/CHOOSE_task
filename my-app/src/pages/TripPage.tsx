import React, {useEffect, useState} from 'react';
import './TripPage.css';
import {
    Box,
    Card,
    CardBody,
    Divider,
    Flex,
    Heading,
    Image,
    ListItem,
    SimpleGrid,
    Text,
    UnorderedList
} from "@chakra-ui/react";
import {Link, useParams} from "react-router-dom";
import {StarIcon} from '@chakra-ui/icons'
import {TripProps} from "../typescript/types";
import {useAppDispatch} from '../redux/hooks'


const TripPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const {id} = useParams<string>();
    const [tripDetails, setTripDetails] = useState<TripProps>();
    const [loading, setLoading] = useState<boolean>(false);

    // disabling this, as it's not utilizing the single trip endpoint
    // const trip =  useAppSelector((state) => getTrip(state, id))


    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3000/trips/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setTripDetails(data)
            });

        // disabling this, as it's not utilizing the single trip endpoint
        // if (trip) {
        //     setTripDetails(trip)
        // } else {
        //     fetch(`http://localhost:3000/trips/${id}`)
        //         .then((res) => res.json())
        //         .then((data) => {
        //
        //             dispatch(saveTrip(data))
        //             setTripDetails(data)
        //         });
        // }

    }, [])

    return (
        <div className="TripPageContainer">
            <Flex flexDirection={'column'} gap={8}>
                <Box>
                    <Link className={'TripPageLink'} to={`/`}>Go back</Link>
                </Box>
                <Box>
                    <Heading size='lg'>{tripDetails?.title}</Heading>
                    <Text>{tripDetails?.subtitle}</Text>
                </Box>
                <Flex flexWrap='wrap-reverse' gap={8} justifyContent={'space-between'}>
                    <Box className="TripPage">
                        <Flex className="TripPage" flexDirection={'column'} gap={8}>
                            <Image borderRadius={15} src={tripDetails?.photoUrl}/>
                            <Heading size={'md'}>
                                Overview
                            </Heading>
                            <SimpleGrid columns={[1, 2]} spacing='40px'>
                                {tripDetails?.advantages.map((advantage, index) => (
                                    <Flex gap={4} key={index}>
                                        <StarIcon/>
                                        <Box>
                                            <Heading size='sm'>{advantage.title}</Heading>
                                            <Text>
                                                {advantage.description}
                                            </Text>
                                        </Box>
                                    </Flex>
                                ))}
                            </SimpleGrid>
                            <Divider/>
                            <Text>
                                {tripDetails?.description}
                            </Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Card size={'lg'} width={350}>
                            <CardBody>
                                <Flex flexDirection={'column'} justifyContent={'center'} gap={6}>
                                    <Flex flexDirection={'column'} justifyContent={'center'} flex='1' gap='4'
                                          flexWrap='wrap'>
                                        <Heading size='md'>{tripDetails?.days} days</Heading>
                                        <Text as={'b'}>Emissions: {tripDetails?.co2kilograms}kg CO2</Text>
                                    </Flex>
                                    <Divider/>
                                    <Box>
                                        <Text as={'b'}>
                                            Countries included: </Text>
                                        <UnorderedList className={'TripPageCountries'}>
                                            {tripDetails?.countries.map((country, index) => (
                                                <ListItem key={index}>{country}</ListItem>
                                            ))}
                                        </UnorderedList>
                                    </Box>
                                </Flex>
                            </CardBody>
                        </Card>
                    </Box>
                </Flex>
            </Flex>
        </div>
    );
}

export default TripPage;
