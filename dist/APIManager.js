class APIManager {

    constructor() {
        this.cityArr = []
    }

    async getDataFromDB() {
        const cities = await $.get(`/cities`)
        for (let city of cities) {
            this.cityArr.unshift(city)
        }
    }

    async getCityData(cityName) {
        const city = await $.get(`/city/${cityName}`)
        city.new = true
        this.cityArr.unshift(city)
        return city;
    }

    async saveCity(cityName) {
        let city = await this.getCityData(cityName)
        $.post(`/city/`, city)
    }

    async removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function () {
                console.log(`deleting ${cityName}!`)
            }
        })
        for (let i in this.cityArr) {
            if (this.cityArr[i].name == cityName) {
                this.cityArr.splice(i, 1)
                break;
            }
        }
    }
}
