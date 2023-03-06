// @ts-nocheck
import React, { Component } from "react";
import Pipeline from "@pipeline-ui-2/pipeline"; //change to import Pipeline from 'Pipeline for realtime editing Pipeline index.js, and dependency to: "Pipeline": "file:..",
import { sendTxns } from "@pipeline-ui-2/pipeline/utils";
import algosdk from "algosdk";
import { fetchDetails } from "../Portfolio/components/PipeConnect";
var asset = parseInt(71185554);
var refresh = false;
var ready = false;
const myAlgoWallet = Pipeline.init();
Pipeline.main = false;
var mynet = Pipeline.main ? "MainNet" : "TestNet";
const tealNames = ["daoDeposit"];

function toggleFlex(id = "", on = true) {
  if (on) {
    document.getElementById(id).style.display = "flex";
  } else {
    document.getElementById(id).style.display = "none";
  }
}

function log(data) {
  document.getElementById("log").innerText = data;
  document.getElementById("own-address").innerText = data.slice(0, 10) + "...";
}

const tealContracts = {
  daoDeposit: {},
};
async function getContracts() {
  for (let i = 0; i < tealNames.length; i++) {
    let name = tealNames[i];
    let data = await fetch("teal/" + name + ".txt");
    tealContracts[name].program = await data.text();
    let data2 = await fetch("teal/" + name + " clear.txt");
    tealContracts[name].clearProgram = await data2.text();
  }
}

class PortfolioPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      net: mynet,
      txID: "",
      myAddress: "",
      balance: 0,
      appAddress: "",
      goal: 0,
      level: 0,
      fundAmount: "Not fetched yet...",
      share: 0,
      depositAmount: 0,
      myProfits: 0,
      withdrawn: 0,
      contribution: 0,
      staked: 0,
      rewards: 0,
      stakedRound: 0,
      currentRound: 0,
      myAsaBalance: "Not fetched yet...",
      progress: "",
    };
  }
  componentDidMount() {
    getContracts();
  }
  fetchBalance = (addr) => {
    Pipeline.balance(addr).then((data) => {
      this.setState({ balance: data });
    });
  };
  setNet = (event) => {
    if (event.target.value === "TestNet") {
      Pipeline.main = false;
      this.setState({ net: "TestNet" });
    } else {
      Pipeline.main = true;
      this.setState({ net: "MainNet" });
    }
  };
  handleConnect = () => {
    Pipeline.connect(myAlgoWallet).then((data) => {
      this.setState({ myAddress: data });
      setInterval(() => this.fetchBalance(this.state.myAddress), 5000);
    });
  };
  switchConnector = (event) => {
    Pipeline.pipeConnector = event.target.value;
    console.log(Pipeline.pipeConnector);
  };
  deploy = async () => {
    let name = "daoDeposit";
    Pipeline.deployTeal(
      tealContracts[name].program,
      tealContracts[name].clearProgram,
      [1, 1, 3, 6],
      ["create"]
    ).then((data) => {
      document.getElementById("appid").value = data;
      this.setState({ appAddress: algosdk.getApplicationAddress(data) });
    });
  };
  delete = async () => {
    Pipeline.deleteApp(document.getElementById("appid").value).then((data) => {
      this.setState({ txID: data });
    });
  };
  clear = async () => {
    let transServer = "https://node.testnet.algoexplorerapi.io/v2/transactions";
    if (Pipeline.main === true) {
      transServer = "https://node.algoexplorerapi.io/v2/transactions";
    }
    let params = await Pipeline.getParams();
    let appId = parseInt(document.getElementById("appid").value);
    let txn = algosdk.makeApplicationClearStateTxn(
      this.state.myAddress,
      params,
      appId
    );
    let signedTxn = await Pipeline.sign(txn, false);
    let txid = await sendTxns(signedTxn, transServer, false, "", true);
    this.setState({ txID: txid });
  };
  fundingLevel = async () => {
    let appId = document.getElementById("appid").value;
    let appAddress = algosdk.getApplicationAddress(parseInt(appId));
    this.setState({ appAddress: appAddress });
    let balance = await Pipeline.balance(appAddress);
    this.setState({ level: (balance / (this.state.goal / 1000000)) * 100 });
    this.setState({ fundAmount: balance });
    this.readLocalState(Pipeline.main, this.state.myAddress, appId).then(
      () => { }
    );
  };
  optIn = async () => {
    let appId = document.getElementById("appid").value;
    this.state.appAddress = algosdk.getApplicationAddress(parseInt(appId));
    let args = [];
    args.push("register");
    Pipeline.optIn(appId, args).then((data) => {
      this.setState({ txID: data });
      setInterval(() => this.fundingLevel(), 5000);
    });
  };
  withdraw = async () => {
    let appId = document.getElementById("appid").value;
    let appAddress = algosdk.getApplicationAddress(parseInt(appId));
    Pipeline.appCall(appId, ["withdraw"], [appAddress], [asset]).then(
      (data) => {
        this.setState({ txID: data });
      }
    );
  };
  redeem = async () => {
    let appId = document.getElementById("appid").value;
    let amount = parseInt(document.getElementById("fundAmt").value);
    let appAddress = algosdk.getApplicationAddress(parseInt(appId));
    Pipeline.appCall(appId, ["redeem"], [appAddress], [asset]).then((data) => {
      this.setState({ txID: data });
    });
  };
  salvage = async () => {
    let appId = document.getElementById("appid").value;
    let appAddress = algosdk.getApplicationAddress(parseInt(appId));
    Pipeline.appCall(appId, ["salvage"], [appAddress], [asset]).then((data) => {
      this.setState({ txID: data });
    });
  };
  fund = async () => {
    let appId = document.getElementById("appid").value;
    let appAddress = algosdk.getApplicationAddress(parseInt(appId));
    let famt = parseInt(document.getElementById("fundAmt").value);
    Pipeline.appCallWithTxn(
      appId,
      ["fund"],
      appAddress,
      famt,
      "funding",
      asset,
      [appAddress],
      [asset]
    ).then((data) => {
      this.setState({ txID: data });
    });
  };
  addasset = () => {
    let appId = document.getElementById("appid").value;
    let appAddress = algosdk.getApplicationAddress(parseInt(appId));

    Pipeline.appCall(appId, ["addasset"], [appAddress], [asset]).then(
      (data) => {
        this.setState({ txID: data });


      }
    );
  };
  deposit = async () => {
    let appId = document.getElementById("appid").value;
    let appAddress = algosdk.getApplicationAddress(parseInt(appId));
    let depositAmt = parseInt(document.getElementById("depAmt").value);
    Pipeline.appCallWithTxn(
      appId,
      ["deposit"],
      appAddress,
      depositAmt,
      "depositing",
      asset,
      [appAddress],
      [asset]
    ).then((data) => {
      this.setState({ txID: data });
    });
  };
  modifyTeal = () => {
    let replacement = document.getElementById("asa").value;
    asset = parseInt(replacement);
    alert("ASA changed!");

  };
  fundApp = () => {
    let amount = parseInt(document.getElementById("sendAlgo").value);
    let appId = document.getElementById("appid").value;
    let appAddress = algosdk.getApplicationAddress(parseInt(appId));

    Pipeline.send(appAddress, amount, "burn ASA", undefined, undefined, 0).then(
      (data) => {
        this.setState({ txID: data });

      }
    );
  };

  readLocalState = async (net, addr, appIndex) => {
    try {
      let url = "";
      if (!net) {
        url = "https://indexer.testnet.algoexplorerapi.io";
      } else {
        url = "https://algoindexer.algoexplorerapi.io";
      }
      let appData = await fetch(url + "/v2/accounts/" + addr);
      let appJSON = await appData.json();
      appJSON.account.assets.forEach((element) => {
        if (element["asset-id"] === asset) {
          let asaBalance = element.amount;
          this.setState({ myAsaBalance: asaBalance / 1000000 });
        }
      });
      let AppStates = await appJSON.account["apps-local-state"];
      AppStates.forEach((state) => {
        if (state.id === parseInt(appIndex)) {
          let keyvalues = state["key-value"];
          keyvalues.forEach((entry) => {
            switch (entry.key) {
              case "YW10":
                let contribution = entry.value.uint;
                this.setState({ contribution: contribution / 1000000 });
                this.setState({
                  share:
                    parseInt(
                      (contribution / (this.state.staked * 1000000)) * 100
                    ) || 0,
                });
                break;
              case "d2l0aGRyYXdu":
                let withdrawn = entry.value.uint;
                this.setState({ withdrawn: withdrawn || 0 });
                break;
              case "cm91bmQ=":
                let stakedRound = entry.value.uint;
                this.setState({ stakedRound: stakedRound });
                this.setState({ redeamRound: stakedRound + 20 });
                break;
              default:
                break;
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  startRefresh = () => {
    this.fundingLevel();
    if (!refresh) {
      setInterval(() => this.fundingLevel(), 5000);
    }
    refresh = true;
  };
  render() {
    return (

      <div align="center">
        <div id="table-div" style={{ display: "none" }}></div>
        <button
          id="disconnect-me"
          onClick={() => {
            fetchDetails("NIN73GEWDWBU3HHEPGWGIQZMOITN4PU3YVTKMR3ESI7DCH5ME4E5TLB4XU")
            document.getElementById("table-div").style.display = "block"
          }}
          className="btn btn--transparent btn--warning"
        >
          Disconnect
        </button>
        <select onClick={this.setNet}>
          <option>MainNet</option>
          <option>TestNet</option>
        </select>

        <h5>{this.state.net}
        </h5>

        <div>
          <div className="container">
            <header className="header">
              <div>
                <div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    className="bi bi-wallet"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
                  </svg>
                  <span className="count__title-2">Connect Wallet</span>

                </div>
                <div />
              </div>
            </header>
            <div id="modal-root-1" className="modal-backdrop show" style={{ display: "none" }} ></div>

            <div className="modal-dialog modal-sm modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Algo Wallets</h2>
                  <button
                    id="wallet-connect-close"
                    className="btn-close btn-close-white text-white"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.75732 7.75732L16.2426 16.2426" />
                      <path d="M7.75739 16.2426L16.2427 7.75732" />
                    </svg>
                  </button>
                </div>



              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default PortfolioPage;
