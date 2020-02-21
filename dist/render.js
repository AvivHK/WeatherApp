class Renderer{
    constructor(){
        this.source = $('#city-template').html();
        this.template = Handlebars.compile(this.source);
    }

    render(citiesArr){
        let newHTML = this.template({citiesArr});
        $('#cities-container').empty().append(newHTML);
    }
}