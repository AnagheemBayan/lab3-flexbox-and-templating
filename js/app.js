'use strict';
let keywords = [];
let infoArray = [];
let allPictures = [];
let page =1;

function Images(item) {
    this.image_url = item.image_url;
    this.title = item.title;
    this.description = item.description;
    this.keyword = item.keyword;
    this.horns = item.horns;
    keywords.push(this.keyword);
    allPictures.push(this);

};

Images.prototype.renderIt = function () {
    

    let template = $('#mustache-template').html();
    let html = Mustache.render(template, this);

    return html;
};

function getData(array) {

   
    for (let i = 0; i < array.length; i++) {
        if (infoArray.indexOf(array[i]) === -1) {
            infoArray.push(array[i]);
        }
    }

}

function selected() {

    $('select').append('<option value="all" id="option">filter by keywords</option>');

    for (let i = 0; i < infoArray.length; i++) {

        let option = $('#option').clone();
        $('select').append(option);
        option.html(infoArray[i]);
        option.removeAttr('id');
        option.attr('value', infoArray[i]);

    }
    $('#select').on('change', function () {
        $('div').css({ 'display': 'none' });

        $('.' + this.value).css({ 'display': 'inline-block' })
    })

}

function forSorting1(arr) {
    arr.sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
        } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
        }
        return 0;
    })
    return arr;
};
function forSorting2(arr) {
    arr.sort((a, b) => {
        if (a.horns < b.horns) {
            return -1;
        } else if (a.horns > b.horns) {
            return 1;
        }
        return 0;
    })
    return arr;
};



Images.readJson1 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-1.json', ajaxSettings).then((data) => {

            forSorting1(data);

        data.forEach((item) => {
            let horn = new Images(item);
            $('#allItems').append(horn.renderIt());
        });
        getData(keywords);
        selected();
    });

};

Images.readJson2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-2.json', ajaxSettings).then((data) => {

        forSorting1(data);

        data.forEach((item) => {
            let horn = new Images(item);
            $('#allItems').append(horn.renderIt());
        });
        getData(keywords);
        selected();
    });

};


$(() => Images.readJson1());

function page1() {
    $('.all').remove();
    keywords = [];
    infoArray = [];
    $('option').remove();
    Images.readJson1();

    page =1;
}

function page2() {
    $('.all').remove();
    keywords = [];
    infoArray = [];
    $('option').remove();
   Images.readJson2();

    page =2;

}




function sort1(){
    let currentSort =document.getElementById("select").value;

    if(page == 1){
        $('.all').remove();
        keywords = [];
        infoArray = [];
        $('option').remove();
        
        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };
    
        $.ajax('data/page-1.json', ajaxSettings).then((data) => {
    
                forSorting1(data);
    
            data.forEach((item) => {
                let horn = new Images(item);
                $('#allItems').append(horn.renderIt());
            });
            getData(keywords);
            selected();

            document.getElementById("select").value = currentSort;
            $('div').css({ 'display': 'none' });
            $('.' + currentSort).css({ 'display': 'inline-block' })
        });
    
    }

    if(page == 2){
        $('.all').remove();
        keywords = [];
        infoArray = [];
        $('option').remove();
        
        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };
    
        $.ajax('data/page-2.json', ajaxSettings).then((data) => {
    
                forSorting1(data);
    
            data.forEach((item) => {
                let horn = new Images(item);
                $('#allItems').append(horn.renderIt());
            });
            getData(keywords);
            selected();

            document.getElementById("select").value = currentSort;
            $('div').css({ 'display': 'none' });
            $('.' + currentSort).css({ 'display': 'inline-block' })
        });
    
    } 
}


function sort2(){
    let currentSort =document.getElementById("select").value;

    if(page == 1){
        $('.all').remove();
        keywords = [];
        infoArray = [];
        $('option').remove();
        
        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };
    
        $.ajax('data/page-1.json', ajaxSettings).then((data) => {
    
                forSorting2(data);
    
            data.forEach((item) => {
                    let horn = new Images(item);
                    $('#allItems').append(horn.renderIt());
        
            });
            getData(keywords);
            selected();

            document.getElementById("select").value = currentSort;
            $('div').css({ 'display': 'none' });
            $('.' + currentSort).css({ 'display': 'inline-block' })
        });

    }

    if(page == 2){
        $('.all').remove();
        keywords = [];
        infoArray = [];
        $('option').remove();
        



        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        };
    
        $.ajax('data/page-2.json', ajaxSettings).then((data) => {
    
                forSorting2(data);
    
            data.forEach((item) => {
                let horn = new ImagesS(item);
                $('#allItems').append(horn.renderIt());
            });
            getData(keywords);
            selected();

            document.getElementById("select").value = currentSort;
            $('div').css({ 'display': 'none' });
            $('.' + currentSort).css({ 'display': 'inline-block' })
        });
    } 


    

}