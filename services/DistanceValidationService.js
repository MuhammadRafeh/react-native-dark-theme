import { GeoPosition } from "../models/GeoLocation";




export function checkDistance(location, position){

    /*
    This is the Haversine formula
    and it works with a sqherical model of the earth
    therefore it is about 0.3% inacurate however for our usecase this should be good enough
    */

    console.log(location);

    const EarthRadius = 6371e3;
    const lat1 = location.lat * (Math.PI/180);
    const lat2 = position.lat * (Math.PI/180);
    const deltalat = (position.lat - location.lat) * (Math.PI/180);
    const deltalng = (position.lng - location.lng) * (Math.PI/180);

    const a =   Math.sin(deltalat/2) * Math.sin(deltalat/2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltalng/2) * Math.sin(deltalng/2);
    const c =   2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = EarthRadius * c;
    /*
    distance is in meters
    console.log(distance);
    */


    if(distance <= location.area * 1000){
        return true;
    }
    else{
        return false;
    }
}