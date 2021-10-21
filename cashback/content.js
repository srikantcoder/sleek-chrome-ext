chrome.runtime.sendMessage({name: 'get-applicable-deal', url: window.location.hostname}, (response) => {
  console.log('received applicable deal ', response);
  if (response.error == null) {
    var applicableDeal = response.deal;
    var dealAmount = applicableDeal.Amount;
    var amountSuffix = " CAD";

    if (applicableDeal.Type === "PERCENTAGE") {
      dealAmount = dealAmount * 100;
      amountSuffix = "%";
    }

    if (dealAmount > 0) {
      if (confirm('You can get a cashback deal of ' + dealAmount +
          amountSuffix + '. Shall we activate the deal?')) {
        chrome.runtime.sendMessage({name: 'activate-deal', id: applicableDeal.ID}, (response) => {
          if (response.error == null && response.activated) {
            console.log('Deal activated');
            window.alert("Deal activated");
          } else {
            console.error(response.error);
          }
        });

      } else {
        // Do nothing!
        console.log('No deal activated');
      }
    } else {
      console.log('Ignoring returned deal as its amount is 0');
    }
  } else {
    console.error(response.error);
  }
});
