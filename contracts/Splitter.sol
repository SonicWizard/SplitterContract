import "ConvertLib.sol";

contract Splitter {
	address accountA;
	address accountB;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function Splitter() {
		accountA = 0x88743434361c4f99a90589f3d7c84390573a7e79;
		accountB = 0x71e4c1d57615308e737982aae546440473ab23c5;
	}

	function sendCoin() returns(bool sufficient) {
		var half = msg.value/2;

		Transfer(msg.sender, accountA, half);
		Transfer(msg.sender, accountB, half);

		if (accountA.send(half) && accountB.send(half)) {
			return true;
		} else {
			return false;
		}
	}

	function getAccountA() returns(address addr) {
		return accountA;
	}

	function getAccountB() returns(address addr) {
		return accountB;
	}
}
