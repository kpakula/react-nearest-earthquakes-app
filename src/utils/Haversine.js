class Haversine {

    static getRadiusOfEarth() {
        return 6371;
    }

    static calculateDistance(startLatitude, startLongitude, endLatitude, endLongitude) {
        const radiansStartLatitude = Haversine.degreesToRadians(startLatitude);
        const radiansEndLatitude = Haversine.degreesToRadians(endLatitude);

        const radiansLatitude = Haversine.degreesToRadians((endLatitude - startLatitude));
        const radiansLongitude = Haversine.degreesToRadians((endLongitude - startLongitude));


        const a = Haversine.formula(radiansLatitude) + Math.cos(radiansStartLatitude) * Math.cos(radiansEndLatitude) * Haversine.formula(radiansLongitude);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));


        return (Haversine.getRadiusOfEarth() * c);
    }

    static formula(radians) {
        return Math.pow(Math.sin(radians / 2), 2);
    }

    static degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}

export default Haversine;
