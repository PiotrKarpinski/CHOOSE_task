import React from 'react';
import './TripCard.css';
import {TripProps} from "../typescript/types";
import {Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Tag, Text} from "@chakra-ui/react";
import {StarIcon} from '@chakra-ui/icons'
import {Link, ScrollRestoration} from "react-router-dom";

function TripCard(trip: TripProps) {

    return (
        <div className="TripCardContainer">
            <Card color={'white'}
                  className="TripCard"
                  size='lg'>
                <Box className={"TripCardImage"}
                     backgroundImage={`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${trip.photoUrl}')`}
                >
                    <CardHeader>
                        <Flex justifyContent={'center'} gap='2' alignItems='center' flexWrap='wrap'>

                            <Heading size='md'>{trip.id}{trip.title}</Heading>
                            <Text>{trip.countries.length} countries, {trip.days} days</Text>


                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Box>
                            <Button colorScheme={'blue'} variant={'solid'} size='md'>
                                <Link to={`/trips/${trip.id}`}>Learn more</Link>
                            </Button>
                        </Box>
                    </CardBody>

                    <CardFooter>
                        <Flex flexDirection={'column'} justifyContent={'center'} flex='1' gap='4' alignItems='center'
                              flexWrap='wrap'>

                            <Tag bgColor='gray.700' className={'TripCardTag'} color={'white'}>
                                <Text>Emissions offset:</Text>

                                <Text as={'b'}>{trip.co2kilograms} kg CO2</Text>
                            </Tag>
                            <Tag className={'TripCardTag'} bgColor={'white'} color={'black'}>
                                <Text as={'b'}>Trip rating:</Text>
                                <Flex alignContent={'center'} gap={'1'}>
                                    <Box className={'TripCardRating'}>
                                        {Array.from(Array(Math.ceil(trip.rating))).map((_, i) => (
                                            <StarIcon color={'gold'}/>)
                                        )}
                                    </Box>

                                    <Text as={'b'}>{trip.rating}</Text>

                                </Flex>
                            </Tag>
                        </Flex>
                    </CardFooter>
                </Box>

            </Card>

        </div>
    );
}

export default TripCard;
