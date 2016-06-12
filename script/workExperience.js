
function addExperienceAccordion(id, header, works, title) {
    var accordionGroup = '<h2 title="'+title+'">' + header + '</h2><div class="panel-group">';
    for (var i = 0; i < works.length; i++) {
        accordionGroup += '<div class="panel panel-default">';
        accordionGroup += '<div class="panel-heading"><h4 class="panel-title">';
        accordionGroup += '<a data-toggle="collapse" data-parent="#' + id + '-accordion"';
        accordionGroup += 'href="#' + works[i].id + '" aria-expanded="false">' + works[i].header + '</a>';
        accordionGroup += '</h4></div>';
        accordionGroup += '<div id="' + works[i].id + '" class="panel-collapse collapse">';
        accordionGroup += '<div class="accordion-inner">';
        accordionGroup += '<h5>' + works[i].dates + '</h5>';
        accordionGroup += '<p>' + works[i].desc + '</p>';
        if (typeof(works[i].sub) != 'undefined') {
            accordionGroup += '<h5>' + works[i].sub + '</h5>';
            accordionGroup += '<p>' + works[i].subText + '</p>';
        }
        accordionGroup += '</div>';
        accordionGroup += '</div>';
        accordionGroup += '</div>';
    }
    accordionGroup += '</div>';
    $('#' + id + '-accordion').append(accordionGroup);
}

// model
function WorkExperience(id, header, dates, desc, sub, subText) {
    this.id = id;
    this.header = header;
    this.dates = dates;
    this.desc = desc;
    this.sub = sub;
    this.subText = subText;
}

// controller
var workExperienceCtrl = function(){
    this.perms = perms;
    this.contracts = contracts;
    this.freelance = freelance;
};
angular.module('cs')
    .controller('workExperienceCtrl', workExperienceCtrl);