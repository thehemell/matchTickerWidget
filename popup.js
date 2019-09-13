'use strict';

/*
fetch(`http://localhost/~danilrayanov/`, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow',
}).then(response => {
    console.log(response.body);
}).catch(
    err => error(err)
);

function error(msg) {
    console.log(msg);
}*/

const xhr = new XMLHttpRequest();

xhr.open("GET", "http://api.skybound.ru/", true);

xhr.onload = function(){
    const matches = JSON.parse(xhr.responseText);

    const elMatchesList = document.getElementById('matchesList');

    function createMatch(item, elMatch) {
        elMatch.classList.add('b-match');
        elMatch.setAttribute('id', item.id);
        elMatch.setAttribute('href', 'https://cybersport.ru/' + item.uri);
        elMatch.setAttribute('target', '_blank');

        let elMatchHeader = document.createElement('div');

        elMatchHeader.classList.add('b-match__header');
        elMatch.appendChild(elMatchHeader);

        let elMatchHeaderRight = document.createElement('div');

        elMatchHeaderRight.classList.add('b-match__header-right');
        elMatchHeader.appendChild(elMatchHeaderRight);

        let elMatchDiscipline = document.createElement('div');

        elMatchDiscipline.classList.add('icon');
        elMatchDiscipline.classList.add('icon__' + item.discipline.slug);
        elMatchHeaderRight.appendChild(elMatchDiscipline);

        let elMatchReportage = document.createElement('div');

        elMatchReportage.classList.add('reportage');
        elMatchReportage.append(item.reportage.title);
        elMatchHeaderRight.appendChild(elMatchReportage);

        let elMatchHeaderDate = document.createElement('div');

        /* let date = new Date();

        date.setTime(item.timestamp);

        console.log( date.getUTCFullYear() );*/

        let d = new Date(0);

        d.setUTCSeconds(item.timestamp);

        let hours = d.getHours(),
            minutes = d.getMinutes();

        if(hours < 10) {
            hours = '0' + hours;
        }

        if(minutes === 0) {
            minutes = '00';
        }

        elMatchHeaderDate.append(hours + ':' + minutes);
        elMatchHeader.appendChild(elMatchHeaderDate);

        let elMatchTeams = document.createElement('div');

        elMatchTeams.classList.add('b-match__info');
        elMatch.appendChild(elMatchTeams);

        createTeam(item.team1, item.score1, elMatchTeams);
        createTeam(item.team2, item.score2, elMatchTeams)
    }

    function createTeam(team, score, el) {
        let elMatchTeam = document.createElement('div');

        elMatchTeam.classList.add('b-match-team');
        el.appendChild(elMatchTeam);

        let elMatchTeamLeft = document.createElement('div');

        elMatchTeamLeft.classList.add('d-flex');
        elMatchTeam.appendChild(elMatchTeamLeft);

        let elMatchTeamLogo = document.createElement('img');

        elMatchTeamLogo.classList.add('b-match-team__logo');
        elMatchTeamLogo.setAttribute('alt', team.title);

        if (team.title === 'TBD') {
            elMatchTeamLogo.setAttribute('src', 'http://cybersport.ru.local/assets/img/no-photo/no-photo-main.png');
        } else {
            elMatchTeamLogo.setAttribute('src', team.image);
        }

        elMatchTeamLeft.appendChild(elMatchTeamLogo);

        let elMatchTeamName = document.createElement('div');

        elMatchTeamName.classList.add('b-match-team__name');
        elMatchTeamName.append(team.title);
        elMatchTeamLeft.appendChild(elMatchTeamName);

        let elMatchTeamScore = document.createElement('div');

        elMatchTeamScore.append(score);
        elMatchTeam.appendChild(elMatchTeamScore);
    }

    function createCollapse(type, title) {
        let elCollapse = document.createElement('div');

        elCollapse.setAttribute('id', type);
        elCollapse.setAttribute('collapse', type);
        elMatchesList.appendChild(elCollapse);

        let elCollapseTitle = document.createElement('div');

        elCollapseTitle.classList.add('b-collapse__title');
        elCollapseTitle.append(title);
        elCollapse.appendChild(elCollapseTitle);

        let elCollapseContent = document.createElement('div');

        elCollapseContent.classList.add('b-collapse__content');
        elCollapse.appendChild(elCollapseContent);
    }

    createCollapse('active', 'Текущие');
    createCollapse('future', 'Будущие');

    matches.forEach(function (item) {

        let elMatch = document.createElement('a');

        createMatch(item, elMatch);

        if (item.status === 'active' || item.status === 'future') {
            if (item.status === 'active') {
                document.getElementById('active').querySelector('.b-collapse__content').appendChild(elMatch);
            } else {
                document.getElementById('future').querySelector('.b-collapse__content').appendChild(elMatch);
            }
        }
    });


    let elCollapseTitle = document.querySelectorAll('.b-collapse__title');

    elCollapseTitle.forEach(function (item) {
        item.addEventListener('click', function() {
            let itemContent = item.nextElementSibling;

            itemContent.classList.toggle('b-collapse__content_hide');
        });
    });
};

xhr.send();