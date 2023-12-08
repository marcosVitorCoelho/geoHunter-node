export interface Coordinates {
    latitude: number;
    longitude: number;
}

function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const { latitude: lat1, longitude: lon1 } = coord1;
    const { latitude: lat2, longitude: lon2 } = coord2;

    const radlat1 = degreesToRadians(lat1);
    const radlon1 = degreesToRadians(lon1);
    const radlat2 = degreesToRadians(lat2);
    const radlon2 = degreesToRadians(lon2);

    const dlat = radlat2 - radlat1;
    const dlon = radlon2 - radlon1;

    const a =
        Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c;

    return distance;
}

