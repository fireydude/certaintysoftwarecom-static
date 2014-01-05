
function addExperienceAccordion(id, title, works) {
    var accordionGroup = '<h2>' + title + '</h2><div class="accordion-group">';
    for (var i = 0; i < works.length; i++) {
        accordionGroup += '<div class="accordion-heading">';
        accordionGroup += '<a class="accordion-toggle btn-lft btn" data-toggle="collapse" data-parent="#' + id + '-accordion"';
        accordionGroup += 'href="#' + works[i].id + '">' + works[i].title + '</a>';
        accordionGroup += '</div>';
        accordionGroup += '<div id="' + works[i].id + '" class="acccordion-body collapse">';
        accordionGroup += '<div class="accordion-inner">';
        accordionGroup += '<h5>' + works[i].dates + '</h5>';
        accordionGroup += '<p>' + works[i].desc + '</p>';
        if (typeof(works[i].sub) != 'undefined') {
            accordionGroup += '<h5>' + works[i].sub + '</h5>';
            accordionGroup += '<p>' + works[i].subText + '</p>';
        }
        accordionGroup += '</div>';
        accordionGroup += '</div>';
    }
    accordionGroup += '</div>';
    $('#' + id + '-accordion').append(accordionGroup);
}
function WorkExperience(id, title, dates, desc, sub, subText) {
    this.id = id;
    this.title = title;
    this.dates = dates;
    this.desc = desc;
    this.sub = sub;
    this.subText = subText;
}
