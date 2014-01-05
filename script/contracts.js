
function WorkExperience(title, dates, desc) {
    this.title = title;
    this.dates = dates;
    this.desc = desc;
}

var contracts = [new WorkExperience("Matrix Telematics",
    "Feb 2013 - Mar 2013",
    "Amazon Web Services"),
    new WorkExperience("Manheim Retail Services",
        "Jan 12 - July 12",
        "Enterprise solutions for B2B websites")];

for(var i = 0; i<contracts.len; i++) {
    alert(contracts[i].title);
}