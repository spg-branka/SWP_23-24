console.log('here is my query:');
// TODO:
// Eine Abfrage, welche die Watchlist-Namen zu einem gegebenen User liefert.
// Eine Abfrage, welche die Musikstücke aus einer Watchlist ausgibt.

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//Abfrage, welche die Watchlist-Namen zu einem gegebenen User liefert
async function getWatchlistsForUser(userId) {
        const userWatchlists = await prisma.benutzer.findMany({
            select: { watchLists: { select: { name: true } } },
            where: { id: userId },
        });

}

//Abfrage, welche die Musikstücke aus einer Watchlist ausgibt
async function getTracksFromWatchlist(watchlistId) {
        const watchlistTracks = await prisma.watchlist.findMany({
            select: { tracks: { select: { name: true }}},
            where: { id: watchlistId },
        });
}

//beispiele
const userId = 1;
const watchlistId = 1;

getWatchlistsForUser(userId)
    .then(() => {
        console.log(`Watchlists für Benutzer ${userId}:`);
    })

getTracksFromWatchlist(watchlistId)
    .then(() => {
        console.log(`Tracks aus Watchlist ${watchlistId}:`);
    })