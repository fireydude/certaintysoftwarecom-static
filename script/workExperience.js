
// model
function WorkExperience(id, header, dates, desc, sub, subText) {
    this.id = id;
    this.header = header;
    this.dates = dates;
    this.desc = desc;
    this.sub = sub;
    this.subText = subText;
}

// model
function WorkExperienceGroup(id, header, items, desc) {
    this.id = id;
    this.header = header;
    this.items = items;
    this.desc = desc;
}

// controller
var workExperienceCtrl = function(){
    this.contractExperience = new WorkExperienceGroup("contract", "Contract", contracts, "Worked for these companies");
    this.freelanceExperience = new WorkExperienceGroup("freelance", "Freelance", freelance, "Projects undertaken for these companies");
    this.permExperience = new WorkExperienceGroup("perm", "Permanent", perms, "Employed by these companies");

};

angular.module('cs')
    .controller('workExperienceCtrl', workExperienceCtrl);

angular.module('cs')
    .directive('experienceAccordion', function(){
        return {
            restrict: 'E',
            scope: {
                model: '=type',
            },
            templateUrl: "experienceAccordion.html"
        };
    });