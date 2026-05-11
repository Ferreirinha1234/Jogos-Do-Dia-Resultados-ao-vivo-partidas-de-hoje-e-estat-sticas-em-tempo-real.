const todayGames = document.getElementById("today-games");
const liveGames = document.getElementById("live-games");

/*
API GRATUITA:
https://www.football-data.org/

Você precisa pegar uma chave gratuita:
https://www.football-data.org/client/register
*/

const API_KEY = "SUA_API_KEY";

async function buscarJogos() {

    try{

        const response = await fetch(
            "https://api.football-data.org/v4/matches",
            {
                headers:{
                    "X-Auth-Token": API_KEY
                }
            }
        );

        const data = await response.json();

        mostrarJogos(data.matches);

    }catch(error){

        console.log("Erro:", error);

        todayGames.innerHTML = `
            <p>Erro ao carregar jogos.</p>
        `;
    }
}

function mostrarJogos(jogos){

    todayGames.innerHTML = "";
    liveGames.innerHTML = "";

    jogos.forEach(jogo => {

        const home = jogo.homeTeam.name;
        const away = jogo.awayTeam.name;

        const scoreHome = jogo.score.fullTime.home ?? 0;
        const scoreAway = jogo.score.fullTime.away ?? 0;

        const status = jogo.status;

        const competition = jogo.competition.name;

        const horario = new Date(jogo.utcDate)
            .toLocaleTimeString("pt-BR",{
                hour:"2-digit",
                minute:"2-digit"
            });

        const card = `
            <div class="card">

                <div class="league">
                    ${competition}
                </div>

                <div class="teams">
                    ${home} x ${away}
                </div>

                <div class="score">
                    ${scoreHome} - ${scoreAway}
                </div>

                <div>
                    ⏰ ${horario}
                </div>

                <div class="status">
                    ${status}
                </div>

            </div>
        `;

        if(status === "IN_PLAY"){

            liveGames.innerHTML += card;

        }else{

            todayGames.innerHTML += card;
        }

    });

}

buscarJogos();

/* Atualiza automaticamente */
setInterval(buscarJogos, 60000);