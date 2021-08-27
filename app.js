// ************************************************* GLOBAL VARIABLES ************************************************* //
const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');
const path = require('path');

let name_1, name_2;

let inputLog = "", csvLog = "";


// ************************************************* ARRAYS & OBJECTS ************************************************* //
let Count = new Array();
let Position = new Array();

let namesObject = {
    "male": [],
    "female": [],
    "count": [],
    "percentage": []
};

let matchObject = {
    "male": [],
    "female": [],
    "count": [],
    "percentage": []
};

let finalObject = {
    "Percentage": [],
    "Male": [],
    "Female": []
};


// ************************************************* FUNCTIONS ************************************************* //
//--------------------------------------------------------------------------------------------------------------//
function InputNames() {
    csvLog += "--------------------------------Enter Individual Name Format Chosen---------------------------------------\n";

    console.log("\n");
    name_1 = prompt('Please enter name of Male:  ');
    name_2 = prompt('Please enter name of Female:  ');

    let testName_1 = /^[a-zA-Z]+$/.test(name_1);
    let testName_2 = /^[a-zA-Z]+$/.test(name_2);

    if ((testName_1 == false) || (testName_2 == false)) {
        inputLog += "ERROR: only letters to be used in names! \nMale: " + testName_1 + "\tFemale: " + testName_2;

        console.log("\nPlease enter letters only!");
        InputNames();
    }

    namesObject.male = name_1;
    namesObject.female = name_2;

    let newString = namesObject.male.toLowerCase() + "matches" + namesObject.female.toLowerCase();
    let posCount = 0;

    inputLog += "\n\nFunction - InputNames() \n\nNames to be used: " + namesObject.male + ", " + namesObject.female + " \n\nNames converted to string for characters counting:\n" + newString + "\n\nCounting of characters takes place now...\n";

    for (let i = 0; i < newString.length; i++) {
        let charCount = 1;

        for (let j = i + 1; j < newString.length; j++) {
            if (newString.charAt(i) == newString.charAt(j)) {
                charCount++;

                Position[posCount] = j;
                posCount++;
                inputLog += "Duplicate count: " + charCount + " \tPosition of Duplicate: " + j + " \n";
            }
        }

        if (charCount > 1) {
            Count[i] = charCount;
        } else {
            Count[i] = 1;
        }
    }

    Position.sort((a, b) => b - a);
    let uPosition = [...new Set(Position)];

    let x = 0;

    inputLog += "\nDuplicate position before splicing: " + Position + " \nDuplicate position after splicing: " + uPosition + " \n\nCharacter count before splicing: " + Count + " \n";

    while (x < uPosition.length) {
        Count.splice(uPosition[x], 1);
        x++;
    }

    namesObject.count = Count;
    inputLog += "Character count after splicing: " + namesObject.count;
}


//--------------------------------------------------------------------------------------------------------------//
function ConvertCSV() {
    var usersMale = new Array();
    var usersFemale = new Array();

    csvLog += "--------------------------------CSV File Format Chosen---------------------------------------\n";

    console.log("\nPlease make sure the CSV File to be used is in this folder.")
    console.log("What is the name of you csv file 'name'.csv? (Not Case-Sensitive)");
    let csvFile = prompt("Enter name here: ");

    let csvPath = path.join('./Csv/' + csvFile + '.csv');

    while (fs.existsSync(csvPath) == false) {
        csvLog += "\nERROR: Please enter the correct File Name! \nFile Name: " + csvFile + ".csv ";

        console.log("\nPlease make sure the CSV File to be used is in this folder.")
        console.log("What is the name of you csv file 'name'.csv? (Not Case-Sensitive)");
        csvFile = prompt("Enter name here: ");
        csvPath = path.join('./Csv/' + csvFile + '.csv');
    }

    let data = fs.readFileSync(csvPath, "utf8");

    data = data.split("\r\n");
    for (let i in data) {
        data[i] = data[i].split(";");
    }

    csvLog += "\n\nCSV Input Log: \n CSV File used: " + csvFile + ".csv \n\nFile is being verified... \n\nData is converted: \n" + data + "\n\n";

    for (let i = 0; i < data.length; i++) {
        if ((data[i][1].toLowerCase()) == "m") {
            usersMale.push(data[i][0]);
        }
        else if ((data[i][1].toLowerCase()) == "f") {
            usersFemale.push(data[i][0]);
        }
    }

    csvLog += "\n\n--------------------Data Converted To Arrays------------------------\n";
    csvLog += "Male users array before splicing: \n" + usersMale + "\n\nFemale users array before splicing: \n" + usersFemale + "\n\n";

    if (usersMale[0] == data[0][0]) {
        usersMale[0] = usersMale[0].substring(1);
    }

    if (usersFemale[0] == data[0][0]) {
        usersFemale[0] = usersFemale[0].substring(1);
    }

    for (let i = 0; i < usersMale.length; i++) {
        for (let j = usersMale.length; j > i; j--) {
            if ((usersMale[i] == usersMale[j] && i < j)) {
                usersMale.splice(j, 1);
            }
        }
    }

    for (let i = 0; i < usersFemale.length; i++) {
        for (let j = usersFemale.length; j > i; j--) {

            if ((usersFemale[i] == usersFemale[j] && i < j)) {
                usersFemale.splice(j, 1);
            }
        }
    }

    csvLog += "Male users array after splicing: \n" + usersMale + "\n\nFemale users array after splicing: \n" + usersFemale + "\n\n";

    let matchCount = 0;

    csvLog += "\n\n--------------------Splicing Arrays------------------------\n";

    for (var k = 0; k < usersMale.length; k++) {
        for (var l = 0; l < usersFemale.length; l++) {
            let newString = usersMale[k].toLowerCase() + "matches" + usersFemale[l].toLowerCase();
            let posCount = 0;

            for (let i = 0; i < newString.length; i++) {
                let charCount = 1;

                for (let j = i + 1; j < newString.length; j++) {
                    if (newString.charAt(i) == newString.charAt(j)) {
                        charCount++;

                        Position[posCount] = j;
                        posCount++;

                        csvLog += "Duplicate count: " + charCount + " \tPosition of Duplicate: " + j + " \n";
                    }
                }

                if (charCount > 1) {
                    Count[i] = charCount;
                } else {
                    Count[i] = 1;
                }
            }

            Position.sort((a, b) => b - a);
            let uPosition = [...new Set(Position)];

            csvLog += "\nDuplicate position before splicing: " + Position + " \nDuplicate position after splicing: " + uPosition + " \n\nCharacter count before splicing: " + Count + " \n";

            let x = 0;

            while (x < uPosition.length) {
                Count.splice(uPosition[x], 1);
                x++;
            }

            csvLog += "Character count after splicing: " + Count + "\n";

            let word = Count.join("");

            matchObject.male[matchCount] = usersMale[k];
            matchObject.female[matchCount] = usersFemale[l];
            matchObject.count[matchCount] = word;
            matchObject.percentage[matchCount] = "";

            matchCount++;
        }
    }
}

//--------------------------------------------------------------------------------------------------------------//
function CalculateMatch() {
    console.log("\n\nWelcome to Good Match!!!" +
        "\nAt Good Match, we will evaluate the likeness between two individuals" +
        " in order to match the perfect pair for the upcoming tennis tournament." +
        "\n\nPlease confirm whether you wish to evaluate partners through Entering 2 Names or a CSV File! \n" +
        "Please choose an option (Not case senitive): Names or CSV");

    let inputOption = prompt('Enter here: ');

    let tempVar = inputOption.toLowerCase();

    while (!(tempVar == "names" || tempVar == "csv")) {
        csvLog += "ERROR: Please enter the correct option! \nOption Selected: " + tempVar;
        inputLog += "ERROR: Please enter the correct option! \nOption Selected: " + tempVar;

        console.log("Only choose 1 of the following options... \nNames / CSV \n");
        inputOption = prompt('Enter here: ');
        tempVar = inputOption.toLowerCase();
    }


    // :::::::::: Names Calculation :::::::::: //
    if (tempVar == "names") {
        InputNames();

        let x = new Array();
        let y = new Array();

        x = namesObject.count;

        inputLog += "\nCharacter count value used in the calculation of matching percentage:\n" + x;

        while ((x.length > 2) || (x.join().length > 2)) {
            let z = new Array();
            let count = 0;

            y = x;

            inputLog += "\n\n\nTemporary Array Y - TOP OF LOOP:\n" + y;

            while (y.length >= 2) {
                if (y.length == 2) {
                    if ((y[0] >= 10) || (y[1] >= 10)) {
                        if ((y[0] >= 10)) {
                            let temp = y[0];
                            let tempArray = Array.from(temp.toString()).map(Number);

                            parseInt(tempArray);

                            inputLog += "\nTemporary Array Y:\n" + tempArray;

                            y.shift();

                            let x = 0;

                            while (x < tempArray.length) {
                                y.splice(y[x], 0, tempArray[x]);
                                x++;
                            }

                            inputLog += "\nTemporary Array Y:\n" + y;
                        } else {
                            let temp = y[0];
                            let tempArray = Array.from(temp.toString()).map(Number);

                            parseInt(tempArray);

                            inputLog += "\nTemporary Array Y:\n" + tempArray;

                            y.pop();

                            let x = 0;

                            while (x < tempArray.length) {
                                y.splice(y[x + 1], 0, tempArray[x]);
                                x++;
                            }
                            inputLog += "\nTemporary Array Y:\n" + y;
                        }
                    } else {
                        let x = y[0].toString() + "" + y[1].toString();
                        parseInt(x);

                        finalMatch = x;

                        z[count] = x;
                    }
                }
                inputLog += "\nTemporary Array Y:\n" + y;

                z[count] = y[0] + y[(y.length - 1)];

                y.pop();
                y.shift();

                count++;

                inputLog += "\nTemporary Array Z:\n" + z;
                inputLog += "\nTemporary Array Y:\n" + y;
            }
            if (y.length == 1) {
                z[count] = y[0];
            }

            x = z;
        }

        parseInt(finalMatch);
        namesObject.percentage = finalMatch;

        inputLog += "\n\nFinal Match Percentage: " + finalMatch;

        console.log("\n\n-----------------------------------------------\n\n");

        if (finalMatch >= 80) {
            console.log("\n%s matches %s : %s %, good match!", namesObject.male, namesObject.female, namesObject.percentage);

        } else {
            console.log("\n%s matches %s : %s %", name_1, name_2, finalMatch);
        }

        console.log("\n\n-----------------------------------------------\n\n");

        console.log("\nCurrently the end of the trial version. Thank you for using Good Match!");
        console.log("\nGood Match usage logs are saved in the LOGS folder, please use them as a reference!");
    }
    // :::::::::: CSV Calculation :::::::::: //
    else if (tempVar == "csv") {
        ConvertCSV();

        for (let i = 0; i < matchObject.count.length; i++) {

            csvLog += "\n\n--------------------Calculation for Array Item: " + i + "------------------------\n";

            let x = [matchObject.count[i].length];
            let y = new Array();

            for (let j = 0; j < matchObject.count[i].length; j++) {
                let word = matchObject.count[i];
                x[j] = parseInt(word[j]);
            }

            csvLog += "\n\nTemporary Array Y: \n" + x;


            while ((x.length > 2) || (x.join().length > 2)) {
                let z = new Array();
                let count = 0;

                csvLog += "\nTemporary Array x - TOP: \n" + x;

                y = x;
                csvLog += "\nTemporary Array Y - TOP: \n" + y + "\n";
                while (y.length >= 2) {
                    if (y.length == 2) {
                        if ((y[0] >= 10) || (y[1] >= 10)) {
                            if ((y[0] >= 10)) {
                                let temp = y[0];
                                let tempArray = Array.from(temp.toString()).map(Number);

                                parseInt(tempArray);

                                csvLog += "\nTemporary Array Y: \n" + tempArray;

                                y.shift();

                                let x = 0;

                                while (x < tempArray.length) {
                                    y.splice(y[x], 0, tempArray[x]);
                                    x++;
                                }

                                csvLog += "\nTemporary Array Y: \n" + y;
                            } else {
                                let temp = y[0];
                                let tempArray = Array.from(temp.toString()).map(Number);

                                parseInt(tempArray);

                                csvLog += "\nTemporary Array Y: \n" + tempArray;

                                y.pop();

                                let x = 0;

                                while (x < tempArray.length) {
                                    y.splice(y[x + 1], 0, tempArray[x]);
                                    x++;
                                }

                                csvLog += "\nTemporary Array Y: \n" + y;
                            }
                        } else {
                            let x = y[0].toString() + "" + y[1].toString();
                            parseInt(x);

                            finalMatch = x;

                            z[count] = x;
                        }
                    }

                    z[count] = y[0] + y[(y.length - 1)];

                    y.pop();
                    y.shift();

                    count++;
                }

                if (y.length == 1) {
                    z[count] = y[0];
                }

                x = z;
            }

            parseInt(finalMatch);
            csvLog += "\n\nFinal Match Percentage: " + finalMatch + "\n\n";
            if (finalMatch >= 80) {
                matchObject.percentage[i] = finalMatch;
            } else {
                matchObject.percentage[i] = finalMatch;
            }
        }
    }
}


//--------------------------------------------------------------------------------------------------------------//
function SortData() {
    CalculateMatch();

    let temp = new Array();

    if (matchObject.male.length > 2) {
        for (let i = 0; i < matchObject.male.length; i++) {
            temp[i] = matchObject.percentage[i];
        }

        csvLog += "\n\n-----------------------------------------------------------------------\n";
        csvLog += "\n\nSorting of percentages to find out which individuals will be partners.\n\nPercentage array before sort: \n" + temp;

        temp.sort((a, b) => b - a);

        csvLog += "\nPercentage array after sort: \n" + temp;

        for (let i = 0; i < temp.length; i++) {
            for (let j = 0; j < matchObject.percentage.length; j++) {
                if (temp[i] == matchObject.percentage[j]) {
                    finalObject.Percentage[i] = matchObject.percentage[j];
                    finalObject.Male[i] = matchObject.male[j];
                    finalObject.Female[i] = matchObject.female[j];

                    csvLog += "\n\nArray arranged from Highest Percentages Partners: \nPercentage: " + finalObject.Percentage[i] + "\nMale: " + finalObject.Male[i] + "\nFemale: " + finalObject.Female[i];
                }
            }
        }

        for (let i = 0; i < finalObject.Percentage.length; i++) {
            for (let j = finalObject.Percentage.length; j > i; j--) {
                if ((finalObject.Male[i] == finalObject.Male[j] && i < j) || (finalObject.Female[i] == finalObject.Female[j] && i < j)) {
                    finalObject.Percentage.splice(j, 1);
                    finalObject.Male.splice(j, 1);
                    finalObject.Female.splice(j, 1);
                }
            }
        }

        csvLog += "\n\n----------------Final Partners----------------";
        console.log("\n\n----------------Final Partners----------------\n");

        for (let i = 0; i < finalObject.Percentage.length; i++) {
            csvLog += "\n\nPair: " + (i + 1) + "\nPercentage: " + finalObject.Percentage[i] + "\nMale: " + finalObject.Male[i] + "\nFemale: " + finalObject.Female[i];

            console.log("\n\nPair: " + (i + 1) + "\nPercentage: " + finalObject.Percentage[i] + "\nMale: " + finalObject.Male[i] + "\nFemale: " + finalObject.Female[i]);
        }

        console.log("\n\n-----------------------------------------------\n\n");
        console.log("\nCurrently the end of the trial version. Thank you for using Good Match!");
        console.log("\nGood Match usage logs are saved in the LOGS folder, please use them as a reference!");
    }
}


//--------------------------------------------------------------------------------------------------------------//
function LogResults() {
    SortData();

    let date = Date.now();
    let txtname = path.join('./log/csvlog-' + date + '.txt');
    //let txtname = path.join('./log/output.txt');
    let txtname1 = path.join('./log/inputlog-' + date + '.txt');

    if (matchObject.male.length > 2) {
        fs.writeFile(txtname, csvLog, (err) => {
            if (err) throw err;
            console.log('CSV log saved!');
        });
    } else {
        fs.writeFile(txtname1, inputLog, (err) => {
            if (err) throw err;
            console.log('CSV log saved!');
        });
    }

    console.log("\n\nPress enter to exit...");
    prompt();
}


// ************************************************* RUN ************************************************* //
//InputNames();
//ConvertCSV();
//CalculateMatch();
//SortData();
LogResults();

module.exports = {LogResults};
