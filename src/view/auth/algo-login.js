import Pipeline from '@pipeline-ui-2/pipeline';
import 'regenerator-runtime/runtime';

window.pipelineConnector = "myAlgoWallet"

const myAlgoWallet = Pipeline.init();

async function ASAbalance(address) {

  const ASAindex = 137594422;

  const main = true;

  let indexerURL = 'https://'

  if (main === true) {
    indexerURL = indexerURL + 'algoexplorerapi.io/idx2/v2/accounts/'
  }
  else {
    indexerURL = indexerURL + "testnet.algoexplorerapi.io/idx2/v2/accounts/"
  }

  let url2 = indexerURL + address
  try {
    let data = await fetch(url2)
    let data2 = await data.json()
    let data3 = data2.account.assets;
    console.log(JSON.stringify(data3));
    let assets = {};
    data3.forEach(element =>
      assets[element["asset-id"]] = element.amount);
    let balance = assets[ASAindex];
    if (balance >= 100000000) {
      console.log("You have enough HDLS's! Click button below to proceed.");
      document.getElementById("login-form").submit();
    }
    else { alert("Sorry! You are too poor for FORUM... You only have " + (balance / 1000000).toFixed(2) + " HDLs. You need 100 to proceed.") };
    console.log(assets);
    return data3;
  } catch (error) {
    console.log(error)
  }
}

function handleConnect() {
  Pipeline.pipeConnector = window.pipelineConnector;
  Pipeline.connect(myAlgoWallet).then(
    data => {
      ASAbalance(data);
    }
  );
}

document.getElementById("walletswitch").innerHTML = `
<select id="walletswitchmain" class="crayons-select">
  <option>myAlgoWallet</option>
  <option>WalletConnect</option>
  <option>AlgoSigner</option>
  </select>
`;

document.getElementById("algbtn").addEventListener('click', event =>{ handleConnect()})


document.getElementById("walletswitchmain").onchange = () => handleSwitch()

function handleSwitch(){
  window.pipelineConnector = document.getElementById("walletswitchmain").value
  console.log(window.pipelineConnector)
}