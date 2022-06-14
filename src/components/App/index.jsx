import React, {useState, useEffect} from 'react';
import Header from '../Header';
import { ParkingLotGrid } from './styles.js';
import ParkingLotCard from "../ParkingLotCard";
import ParkedService from "../../services/ParkedService";

function App() {
    const [parkingLots, setParkingLots] = useState([]);
    useEffect(() => {
        ParkedService.getParkingLots()
            .then(setParkingLots);
    }, [parkingLots]);

    return (
        <>
            <Header />
            <ParkingLotGrid>
                {parkingLots.map(pl => (
                    <ParkingLotCard parkingLot={pl} key={pl.id}/>
                ))}
            </ParkingLotGrid>
        </>
    );
}

export default App;
