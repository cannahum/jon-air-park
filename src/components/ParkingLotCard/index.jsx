import React, {useEffect, useRef, useState} from 'react';

import ParkingLotCardHeader from './components/ParkingLotCardHeader';

import {ParkingLotCardContainer, PlateGrid} from './styles';
import ParkedService from "../../services/ParkedService";
import PlateCard from "./components/PlateCard";

const ParkingLotCard = ({parkingLot}) => {
    const [parkedCars, setParkedCars] = useState([]);
    const [renters, setRenters] = useState([]);
    let rentersById = useRef({});

    useEffect(() => {
        ParkedService.getParked()
            .then(cars => {
                setParkedCars(cars.filter(c => c['parking_lot'] === parkingLot.id));
            })

        ParkedService.getRentals()
            .then(rentals => {
                setRenters(rentals.filter(r => r['parking_lot'] === parkingLot.id));
            })
    }, [parkingLot.id]);

    useEffect(() => {
        renters.forEach(r => {
            rentersById.current[r.plate] = r.status;
        });
    }, [renters, rentersById]);

    return (
        <ParkingLotCardContainer>
            <ParkingLotCardHeader name={parkingLot.name} address={parkingLot.address}/>

            <PlateGrid>
                {parkedCars.map(pc => (
                    <PlateCard plate={pc.plate} violator={!rentersById.current[pc.plate]}/>
                ))}
            </PlateGrid>

        </ParkingLotCardContainer>
    );
};

export default ParkingLotCard;
