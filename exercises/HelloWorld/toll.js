const { buyTollRoadCard, topUpBalance, useTollRoad } = require('./utils');

function getTollAccess() {
    buyTollRoadCard(25)
        .then((card) => {
            console.log('Kartu tol berhasil dibeli:', card);
            return topUpBalance(card, 10);
        })
        .then((updatedCard) => {
            console.log('Saldo kartu tol berhasil diisi:', updatedCard);
            return useTollRoad(updatedCard);
        })
        .then(() => {
            console.log('Akses jalan tol berhasil digunakan.');
        })
        .catch((error) => {
            console.log('Error:', error.message);
        });
}

// Jangan hapus kode di bawah ini
getTollAccess();