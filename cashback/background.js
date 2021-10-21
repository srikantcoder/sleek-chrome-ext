chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  switch(msg.name) {
    case 'get-applicable-deal':
      console.log("Getting applicable deal");
      var url = "http://localhost:8082/deals";
      var host = msg.url.split("/")[0];
      fetch(url).
        then(response => response.json()).
        then(deals => {
          for (var i = 0; i < deals.length; i++) {
            const deal = deals[i];
            var retailerDomains = deal.retailer_domains;

            for (var j = 0; j < retailerDomains.length; j++) {
                var retailerDomain = retailerDomains[j];
                var retailerDomainPrefixed = "www." + retailerDomains[j];
                if (retailerDomain == host || retailerDomainPrefixed == host) {
                  var id = deal.deal_id;
                  var type = deal.deal_type;
                  var amount = deal.deal_amount;
                  const applicableDeal = {
                    ID: id,
                    Type: type,
                    Amount: amount
                  };

                  console.log(applicableDeal);
                  sendResponse({deal: applicableDeal, error: null});
                  return;
                }
              }
            }
          }).catch((error) => {
            console.log(error);
            sendResponse({deal: deal, error: new Error('Error encountered while retrieving deals.', { cause: error })});
          });
          break;

      case 'activate-deal':
        console.log("Activating deal");
        var url = "http://localhost:8082/activate-deal/"+msg.id;
        console.log(url);
        fetch(url, {method: "POST"}).
          then(response => {
              sendResponse({activated: true, error: null});
            }).catch((error) => {
              console.log(error);
              sendResponse({activated: false, error: new Error('Error encountered in activating the deal.', { cause: error })});
            });
        break;
        
      default:
        sendResponse({error: new Error('Method call not supported')});
    }

    return true;
});
