
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
    this.contractExperience = new WorkExperience("contract", "Contract", contracts, "Worked for these companies");
    this.freelanceExperience = new WorkExperience("freelance", "Freelance", freelance, "Projects undertaken for these companies");
    this.permExperience = new WorkExperience("perm", "Permanent", perms, "Employed by these companies");
    console.log(this);
};
angular.module('cs')
    .controller('workExperienceCtrl', workExperienceCtrl);

angular.module('cs')
    .directive('experienceAccordion', function(){
        return {
            restrict: 'E',
            scope: {
                header: '=type',
                items: '=works'
            },
            templateUrl: "experienceAccordion.html"
        };
    });