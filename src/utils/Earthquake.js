class Earthquake {
    constructor(title, longitude, latitude, kilometers, date) {
        this.title = title;
        this.longitude = longitude;
        this.latitude = latitude;
        this.kilometers = kilometers;
        this.date = date;
        this.clicked = false;
    }
}

export default Earthquake;