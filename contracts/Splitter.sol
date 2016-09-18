import "ConvertLib.sol";

contract Splitter {
	address accountA;
	address accountB;

	//mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function Splitter() {
		accountA = 0x88743434361c4f99a90589f3d7c84390573a7e79;
		accountB = 0x71e4c1d57615308e737982aae546440473ab23c5;

		//balances[accountA] = 0;
		//balances[accountB] = 0;
	}

	function sendCoin(uint amount) returns(bool sufficient) {
		/*
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		var half = amount/2;

		balances[accountA] += half;
		balances[accountB] += half;

	   */
		var half = amount/2;

		Transfer(msg.sender, accountA, half);
		Transfer(msg.sender, accountB, half);

		if (accountA.send(half) && accountB.send(half)) {
			return true;
		} else {
			return false;
		}
	}

	/*
	function getBalanceInEth(address addr) returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) returns(uint) {
		return balances[addr];
	}
   */
}
