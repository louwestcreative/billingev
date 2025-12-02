var t = TrelloPowerUp.iframe();

window.addEventListener('load', () => {
  console.log('Power-Up client loaded');
});

window.TrelloPowerUp.initialize({
  'card-buttons': function(t) {
    return t.card('labels')
      .then(card => {
        return [{
          icon: 'https://louwestcreative.github.io/billingev/icons/payment.png',
          text: 'Add Payment',
          callback: function(t) {
            return t.popup({
              title: 'Add Payment',
              url: './payment-entry.html',
              height: 260
            });
          }
        }];
      });
  },

  'card-badges': async function(t) {
    const card = await t.card('labels');
    const labels = card.labels;
    const payments = await t.get('card', 'shared', 'payments') || [];
    const totalReceived = payments.reduce((sum, p) => sum + p.amount, 0);

    const labelNames = labels.map(l => l.name.toLowerCase());
    let retainer = 0;
    if (labelNames.includes('kitsap gal')) retainer = 4000;
    else if (labelNames.includes('pierce gal')) retainer = 1875;

    const totalOwed = retainer;
    const balance = totalOwed - totalReceived;

    return [
      { text: `Owed: $${totalOwed.toFixed(2)}`, color: 'red' },
      { text: `Paid: $${totalReceived.toFixed(2)}`, color: 'green' },
      { text: `Balance: $${balance.toFixed(2)}`, color: 'blue' }
    ];
  }
});
