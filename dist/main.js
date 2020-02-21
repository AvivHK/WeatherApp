const apiManager = new APIManager()
const renderer = new Renderer()


const loadPage = async function () {
    await apiManager.getDataFromDB()
    renderer.render(apiManager.cityArr)
}

const handleSearch = async function () {
    let cityName = $("#searchBar").find("input").val()
    if (cityName != "") {
        await apiManager.showCity(cityName)
        renderer.render(apiManager.cityArr)
        $("#searchBar").find("input").val("")
    }
}

$("#cities-container").on("click", ".fa-plus-circle", function () {
    let cityName = $(this).closest(".cityCard").find(".name").text()
    $(this).attr("class", "fas fa-minus-circle")
    apiManager.saveCity(cityName)
})

$("#cities-container").on("click", ".fa-minus-circle", async function () {
    let cityName = $(this).closest(".cityCard").find(".name").text()
    await apiManager.removeCity(cityName)
    $(this).closest(".cityCard").remove()
})

$("#cities-container").on("click", ".updateButton", async function () {
    let cityName = $(this).siblings(".name").text()
    await apiManager.updateCity(cityName)
    renderer.render(apiManager.cityArr)
})




loadPage()