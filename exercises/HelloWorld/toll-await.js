const { buyTollRoadCard, topUpBalance, useTollRoad } = require('./utils');
async function getTollAccess() {
    try {
        const card = await buyTollRoadCard(25);
        console.log('Kartu tol berhasil dibeli:', card);

        const updatedCard = await topUpBalance(card, 10);
        console.log('Saldo kartu tol berhasil diisi:', updatedCard);

        await useTollRoad(updatedCard);
        console.log('Akses jalan tol berhasil digunakan.');
    } catch (error) {
        console.log('Error:', error.message);
    }
}

// Jangan hapus kode di bawah ini
getTollAccess();