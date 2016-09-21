var accounts;
var account;

var accountA;
var accountB;
var splitterAddress;

Splitter.setNetwork('9151973');

var splitter = Splitter.deployed();

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
	splitter.getAddress.call().then(function(value) {
		var balance_element = document.getElementById("balance");
		web3.eth.getBalance(splitter.address, function (err, balance) {
			balance_element.innerHTML = web3.fromWei(balance, 'ether');
		});
	}).catch(function(e) {
		console.log(e);
		setStatus("Error getting balance; see log.");
	});

	splitter.getAccountA.call().then(function (account) {
		accountA = account;
		web3.eth.getBalance(accountA, function (err, balance) {
			document.getElementById('accountAbalance').innerHTML = web3.fromWei(balance, 'ether');
		});
	});

	splitter.getAccountB.call().then(function (account) {
		accountB = account;
		web3.eth.getBalance(accountB, function (err, balance) {
			document.getElementById('accountBbalance').innerHTML = web3.fromWei(balance, 'ether');
		});
	});
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}
