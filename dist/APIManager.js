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

    isExist(cityName) {
        for (let city of this.cityArr) {
            if (city.name.toLowerCase() === cityName.toString().toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    async showCity(cityName){
        if(!this.isExist(cityName)){
            let city = await $.get(`/city/${cityName}`)
            this.cityArr.unshift(city)
            city.new = true
        }
    }


    async saveCity(cityName, index) {
        let city = await $.get(`/city/${cityName}`)
        city.new = false
        if (index) {
            await $.post(`/city/`, city)
            this.cityArr.splice(index, 0, city)
        }
        else {
            await $.post(`/city/`, city)
            const index = this.cityArr.findIndex(a => a.name == cityName)
            if(index === 0 || index){
                this.cityArr.splice(index,1,city)
            }
            else{
                this.cityArr.unshift(city)
            }
        }
    }

    async removeCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: function () {
            }
        })
        for (let i in this.cityArr) {
            if (this.cityArr[i].name == cityName) {
                this.cityArr.splice(i, 1)
                break;
            }
        }
    }
    async updateCity(cityName) {
        let isNew;
        if(this.cityArr.find(a => a.name == cityName).new){
            isNew = true
        }
        else{
            isNew = false;
        }
        let city = await $.ajax({
            url: `/city/${cityName}`,
            type: `PUT`,
            success: function () { }
        })
        for (let cityIndex in this.cityArr) {
            if (this.cityArr[cityIndex].name == cityName) {
                this.cityArr[cityIndex] = city
                isNew ? city.new=true : city.new=false
            }
        }
    }
}
