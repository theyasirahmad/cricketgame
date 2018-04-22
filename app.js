var divE = document.getElementById("divElement");
var team1E = document.getElementById("teamName1");
var team2E = document.getElementById("teamName2");
function teamsName() {
    var teamsE = document.getElementById("teams");
    teamsE.innerHTML = team1E.value + " vs " + team2E.value;
    var buttonE = document.createElement("button");
    buttonE.innerHTML = "Start TOSS";
    divE.appendChild(buttonE);
    buttonE.setAttribute("onclick", "toss(this)");
}
var count = 0;
function toss(rE) {

    var toss = Math.ceil(Math.random() * 2);
    var tosswinner;
    if (toss == 1) {
        tosswinner = "you won the toss <br/> select";
    }
    else {
        tosswinner = "you loss the toss";
    }
    var tossAnounced = document.createElement("h2");
    tossAnounced.innerHTML = tosswinner;
    divE.appendChild(tossAnounced);
    rE.disabled = true;

    if (toss == 1) {
        var battingbtn = document.createElement("button");
        battingbtn.setAttribute("id", "batting");
        var bowlingbtn = document.createElement("button");
        bowlingbtn.setAttribute("id", "bowling");
        battingbtn.innerHTML = "batting";
        bowlingbtn.innerHTML = "bowling"
        battingbtn.setAttribute("onclick", "inningsSelected(1)");
        bowlingbtn.setAttribute("onclick", "inningsSelected(2)");

        divE.appendChild(battingbtn);
        divE.appendChild(bowlingbtn);
    }
    else {
        inningsSelected(3);
    }

}

function inningsSelected(argu) {

    var selectedInnings, innselect;
    if (argu == 1 || argu == 2) {
        var battingElement = document.getElementById("batting");
        var bowlingElement = document.getElementById("bowling");
        battingElement.disabled = true;
        bowlingElement.disabled = true;
    }
    if (argu == 1) {
        selectedInnings = "You are batting";
        innselect = 1;
    }
    else if (argu == 2) {
        selectedInnings = "you are bowling";
        innselect = 2;
    }
    else {
        var randomNum = Math.ceil(Math.random() * 2);
        if (randomNum == 1) {
            selectedInnings = "oppnentes are bowling first";
            innselect = 3;
        }
        else {
            selectedInnings = "opponents are batting  first";
            innselect = 4;
        }
    }

    var selectedInningsElement = document.createElement("h2");
    selectedInningsElement.innerHTML = selectedInnings;
    divE.appendChild(selectedInningsElement);
    var letsStart = document.createElement("button");
    letsStart.innerHTML = "LETS PLAYY!!";
    letsStart.setAttribute("onclick", "start('" + innselect + "')");
    divE.appendChild(letsStart);
}
var table1 = document.createElement("table");
var batbtn = document.createElement("button");
var balbtn = document.createElement("button");
var secondInningsTeam;
var inning1,inning2;
var secondBtn;
function start(para) {
   // console.log(para);
    var team1 = team1E.value;
    var team2 = team2E.value;
    document.documentElement.innerHTML = "";
    var announcement = document.createElement("h1");
    announcement.innerHTML = team1 + " vs " + team2;
    document.body.appendChild(announcement);
    // var table1 = document.createElement("table");
    document.body.appendChild(table1);
    table1.setAttribute("border", "2");
    var tablerow = document.createElement("tr");
    tablerow.innerHTML = "SCORE CARD";

    var tablerow11 = document.createElement("tr");

    table1.appendChild(tablerow);
    // if (para == 1 || para == 3) {
    // var batbtn = document.createElement("button");
    if (para == 1 || para == 3) {
        batbtn.innerHTML = "BAT";
        tablerow11.innerHTML = team1 + " batting ";
        secondInningsTeam = team2 + " batting ";
        secondBtn = "BALL";
        inning1=team1;
        inning2=team2;

    }
    else {
        batbtn.innerHTML = "BALL";
        tablerow11.innerHTML = team2 + " batting ";
        secondInningsTeam = team1 + " batting ";
        secondBtn = "BAT";
        inning1=team2;
        inning2=team1;
    }

    batbtn.setAttribute("onclick", "batting()");
    document.body.appendChild(batbtn);
    table1.appendChild(tablerow11);
    //}
    // else {

    // }
}
var target = 0;
var wickets = 0;
var overs = 1;
var balls = 1;
var runs = [0, 1, 2, 3, 4, 6, 6, 0, "W", "N", 4, 4, 4];

// var runs=[0,1,"W","W","W","W","W","W","W","N",4,4,4];
var score = 0;
var ballScore;
var overContent = document.createElement("div");
function batting() {
    if (balls === 1 && overs === 1) {

        document.body.appendChild(overContent);

    }
    overContent.innerHTML = "";

    var oversElement = document.createElement("h2");
    ballScore = runs[Math.floor(Math.random() * 11)];
    if (ballScore == "W") {
        wickets++;
        oversElement.innerHTML = "Wicket "
    }
    else if (ballScore == "N") {
        balls--;

        var run = [0, 1, 2, 3, 4, 6, 6, 0, 4, 4, 4];
        ballScore = run[Math.floor(Math.random() * 10)];
        score = score + ballScore;
        oversElement.innerHTML = " NO BALL + " + ballScore;
    }
    else {
        score = score + ballScore;
        oversElement.innerHTML = ballScore;
    }


    overContent.appendChild(oversElement);
    var oversElement = document.createElement("h2");
    oversElement.innerHTML = "over no: " + overs + " ball no: " + balls + " score =" + score;
    overContent.appendChild(oversElement);
    balls++;

    if (wickets === 2) {
        var scoreCardUpdate = document.createElement("tr");
        scoreCardUpdate.innerHTML = "WICKETS= " + wickets + " OVERS= " + overs + " runs= " + score;
        table1.appendChild(scoreCardUpdate);
        var scoreCardUpdate = document.createElement("tr");
        target = score;
        scoreCardUpdate.innerHTML = "ALL OUT TARGET = " + target;
        table1.appendChild(scoreCardUpdate);
        //button disable
        batbtn.disabled = true;

        secondInnings();
        balbtn.innerHTML = secondBtn;
        balbtn.setAttribute("onclick", "secondbtnInn()");
        document.body.removeChild(overContent);
        document.body.appendChild(balbtn);

    }

    if (overs === 1 && balls == 7) {

        var scoreCardUpdate = document.createElement("tr");
        scoreCardUpdate.innerHTML = "WICKETS= " + wickets + " OVERS= " + overs + " runs= " + score;
        table1.appendChild(scoreCardUpdate);
        overs = 2;
        balls = 1;


    }
    if (overs === 2 && balls === 7) {
        var scoreCardUpdate = document.createElement("tr");
        target = score;
        scoreCardUpdate.innerHTML = "OVERS COMPLETED TARGET = " + target;
        table1.appendChild(scoreCardUpdate);
        //button disable
        batbtn.disabled = true;
        secondInnings();
        // batbtn.nextSibling.appendChild(balbtn);
        balbtn.innerHTML = secondBtn;
        balbtn.setAttribute("onclick", "secondbtnInn()");
        document.body.removeChild(overContent);
        document.body.appendChild(balbtn);

    }



}


function secondInnings() {
    var scoreCardUpdate = document.createElement("tr");
    scoreCardUpdate.innerHTML = secondInningsTeam;
    table1.appendChild(scoreCardUpdate);
    wickets = 0;
    overs = 1;
    balls = 1;
    score = 0;
    ballScore;



}

function secondbtnInn() {
    {
        if (balls === 1 && overs === 1) {

            document.body.appendChild(overContent);

        }
        overContent.innerHTML = "";

        var oversElement = document.createElement("h2");
        ballScore = runs[Math.floor(Math.random() * 11)];
        if (ballScore == "W") {
            wickets++;
            oversElement.innerHTML = "Wicket "
        }
        else if (ballScore == "N") {
            balls--;

            var run = [0, 1, 2, 3, 4, 6, 6, 0, 4, 4, 4];
            ballScore = run[Math.floor(Math.random() * 10)];
            score = score + ballScore;
            oversElement.innerHTML = " NO BALL + " + ballScore;
        }
        else {
            score = score + ballScore;
            oversElement.innerHTML = ballScore;
        }


        overContent.appendChild(oversElement);
        var oversElement = document.createElement("h2");
        oversElement.innerHTML = "over no: " + overs + " ball no: " + balls + " score =" + score;
        overContent.appendChild(oversElement);
        balls++;

        if (wickets === 2) {
            winnerannouc();
        }

        if (overs === 1 && balls == 7) {

            var scoreCardUpdate = document.createElement("tr");
            scoreCardUpdate.innerHTML = "WICKETS= " + wickets + " OVERS= " + overs + " runs= " + score;
            table1.appendChild(scoreCardUpdate);
            overs = 2;
            balls = 1;


        }
        if (overs === 2 && balls === 7) {
            winnerannouc();
        }

        if (score > target){
            var scoreCardUpdate = document.createElement("tr");
            //console.log(secondInningsTeam);
            balbtn.disabled=true;
            scoreCardUpdate.innerHTML = "WINNERS = " + inning2;
            table1.appendChild(scoreCardUpdate);
            
        }
        


    }
}

function winnerannouc(){
    if(score < target){
        var scoreCardUpdate = document.createElement("tr");
        balbtn.disabled=true;
        scoreCardUpdate.innerHTML = "WINNERS = " + inning1;
        table1.appendChild(scoreCardUpdate);
        
    }
    else if (score===target) {
        var scoreCardUpdate = document.createElement("tr");
        scoreCardUpdate.innerHTML = "MATCH TIE";
        table1.appendChild(scoreCardUpdate);
        
    }
}