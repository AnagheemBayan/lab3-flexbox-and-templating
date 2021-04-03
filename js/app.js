'use strict';
let  searchArr = [];
let  infoArray= [];
let picArr= [];

function ImgConstructor(element) {
    this.image_url = element.image_url;
    this.title = element.title;
    this.description =element.description;
    this.keyword = element.keyword;
    this.horns = element.horns;
    searchArr.push(this.keyword);
    picArr.push(this);

};
// ////////////////// to show the data as it's from html file and the tags that are used 

ImgConstructor.prototype.renderIt = function () {

    let template = $('#mustache-template').html();
    let html = Mustache.render(template, this);

    return html;
};

// ///////////////////////////// to get the data and store it in empty array
function getData(array) {

   
    for (let i = 0; i < array.length; i++) {
        if (infoArray.indexOf(array[i]) === -1) {
            infoArray.push(array[i]);
        }
    }

}
// ///////////////////////////// used to copy the html parents and children 

function selected() {

    $('select').append('<option value="all" id="option"> Search by keywords</option>');

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

// //////////////////////////////////// to sort the data based on title or horns 

function Sorting1(arr) {
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
function Sorting2(arr) {
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



ImgConstructor.readJson1 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-1.json', ajaxSettings).then((data) => {

        Sorting1(data);

        data.forEach((element) => {
            let horn = new ImgConstructor (element);
            $('#allItems').append(horn.renderIt());
        });
        getData(searchArr);
        selected();
    });

};

ImgConstructor.readJson2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };

    $.ajax('data/page-2.json', ajaxSettings).then((data) => {

        Sorting1(data);

        data.forEach((element) => {
            let horn = new ImgConstructor(element);
            $('#allItems').append(horn.renderIt());
        });
        getData(searchArr);
        selected();
    });

};

///////////

$(() => ImgConstructor.readJson1());

function page1() {
    $('.all').remove();
     searchArr = [];
    infoArray = [];
    $('option').remove();
    ImgConstructor.readJson1();
}

function page2() {
    $('.all').remove();
      searchArr= [];
    infoArray = [];
    $('option').remove();
    ImgConstructor.readJson2();
}
