import React, { Component } from "react";
import Pipeline from "@pipeline-ui-2/pipeline";
import renderTable from "../../Portfolio/components/tables";
import { useToggle } from "react-use";
import './slider.css'

interface IProps {
}

interface IState {
  myAddress?: string;
  walletBalance?: number;
  toggle?: string;
  Mainnet?: true;
  Testnet?: true;
  checked?: boolean;
  labelNet?: string;
}

export const fetchDetails = async (address) => {
  let data = await fetch("https://algoexplorerapi.io/idx2/v2/accounts/" + address)
  let dataJson = await data.json()
  console.log(dataJson)
  let assets = []
  dataJson.account.assets.forEach(asset => {
    let row = []
    row.push(asset["asset-id"])
    row.push((asset.amount / 1000000))
    assets.push(row)
  })
  document.getElementById("table").innerHTML = renderTable(assets, ["asset", "amount"])
}

const wallet = Pipeline.init()
Pipeline.main = true
class PipeConnect extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      myAddress: "",
      walletBalance: 0,
      checked: true,
      labelNet: "MainNet",
    }
  }

  setNet = (event) => {
    if (event.target.value === "TestNet") {
      Pipeline.main = false;
    } else {
      Pipeline.main = true;
    }
  };

  switchWallet = (event) => {
    Pipeline.pipeConnector = event.target.id
    Pipeline.connect(wallet).then(data => {
      document.getElementById("wallet-connect-2").style.display = "none";
      document.getElementById("wallet-connected").style.display = "flex";
      this.setState({ myAddress: data })
      Pipeline.balance(data).then(data2 => {
        document.getElementById("modal-root-1").style.display = "none";
        document.getElementById("modal-root-2").style.display = "none";
        this.setState({ walletBalance: data2 })
        //this.refresh(data)
        setInterval(this.refresh, 5000)
      })
    })
  }

  switchNet = (event) => {
    Pipeline.main = event.target.checked
    this.setState({ checked: !this.state.checked })
    let message1 = "MainNet"
    let message2 = "Testnet"
    if
      (Pipeline.main) {
      this.setState({ labelNet: message1 })
    }
    else
      this.setState({ labelNet: message2 })
  }

  refresh = () => {
    Pipeline.balance(
      this.state.myAddress
    )
      .then(data3 => { this.setState({ walletBalance: data3 }) })
  }

  render() {
    return (
      <div>
        <div id="modal-root-2" className="modal-backdrop show" style={{ display: "none" }}></div>
        <div
          id="modal-root-1" className="modal fade show"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-modal="true"
          role="dialog"
          style={{ display: "none", paddingRight: "0.333374px" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content border-0">
              <div className="modal-header bg-card light">
                <h5 className="modal-title text-white" id="exampleModalLabel">
                  Algo Wallets
                </h5>

                <button type="button" className="btn-close btn-close-white text-white" data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close"
                  onClick={() => {
                    document.getElementById(
                      "modal-root-2"
                    ).style.display = "none"
                    document.getElementById(
                      "modal-root-1"
                    ).style.display = "none";
                    ;
                  }}>
                </button>
              </div>
              <div className="modal-body">
                <button id="WalletConnect" className="crayons-btn w-100" onClick={this.switchWallet}>
                  WalletConnect
                </button>
                <button id="AlgoSigner" className="crayons-btn w-100" onClick={this.switchWallet}>
                  AlgoSigner
                </button>
                <button id="myAlgoWallet" className="crayons-btn w-100" onClick={this.switchWallet}>
                  MyAlgoWallet
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="crayons-btn crayons-btn--secondary " id="wallet-connect-2"
          aria-haspopup="true" data-toggle="modal" data-target="modal-root-1" aria-expanded="true"
          onClick={() => {
            document.getElementById(
              "modal-root-2"
            ).style.display = "block"
            document.getElementById(
              "modal-root-1"
            ).style.display = "block";
            ;
          }}
        >
          <svg className="svg-inline--fa fa-wallet " aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wallet" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>
          <span className="count__title-2">Connect Wallet</span>
        </button>
        <div id="wallet-connected" className="crayons-select-2" style={{ display: "none" }}>
          <div className="walled-connected-mi" style={{ display: "none", width: "20px", height: "20px", color: "var(--algocloud-body-bg-2)" }}>
            <svg className="svg-inline--fa fa-wallet " aria-hidden="true" focusable="false" data-prefix="fas" data-icon="wallet" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path></svg>
          </div>

          <div id="my-balance" className="own-balance">
            <p style={{ marginBottom: "0px" }}>{this.state.walletBalance + " Algo"}</p>
            <span className="currency" />
          </div>
          <div className="dropdown">
            <button id="own-address" className="own-address">
              {this.state.myAddress}
            </button>
            <div className="dropdown__content dropdown__content-wallet">
              <button className="copyable-1 dropdown-item">
                <div className="copyable">
                  <div className="copyable__text">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      className="copy-icon"
                      fill="currentColor"
                      viewBox="0 0 512 512"><path d="M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z" /></svg>copy address</div>
                  <span className="copy" />
                </div>
              </button>
              <a
                className="dropdown-item"
                id="algoexplorer"
                target="_blank"
                rel="noreferrer"
                href={
                  "https://algoexplorer.io/address/" +
                  this.state.myAddress
                }
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width={16}
                height={16}
                className="external-link-icon"
                fill="currentColor"
              >
                  <path d="M384 320c-17.67 0-32 14.33-32 32v96H64V160h96c17.67 0 32-14.32 32-32s-14.33-32-32-32L64 96c-35.35 0-64 28.65-64 64V448c0 35.34 28.65 64 64 64h288c35.35 0 64-28.66 64-64v-96C416 334.3 401.7 320 384 320zM488 0H352c-12.94 0-24.62 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.88L370.8 96L169.4 297.4c-12.5 12.5-12.5 32.75 0 45.25C175.6 348.9 183.8 352 192 352s16.38-3.125 22.62-9.375L416 141.3l41.38 41.38c9.156 9.141 22.88 11.84 34.88 6.938C504.2 184.6 512 172.9 512 160V24C512 10.74 501.3 0 488 0z" />
                </svg>

                AlgoExplorer
              </a>
              <button
                id="disconnect-me"
                className="dropdown-item"
              ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" className="eject-icon" fill="currentColor"><path d="M48.01 319.1h351.1c41.62 0 63.49-49.63 35.37-80.38l-175.1-192.1c-19-20.62-51.75-20.62-70.75 0L12.64 239.6C-15.48 270.2 6.393 319.1 48.01 319.1zM399.1 384H48.01c-26.39 0-47.99 21.59-47.99 47.98C.0117 458.4 21.61 480 48.01 480h351.1c26.39 0 47.99-21.6 47.99-47.99C447.1 405.6 426.4 384 399.1 384z"></path></svg>
                Disconnect
              </button>
              <div className="form-check form-switch dropdown-item crayons-select">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  // defaultChecked={true}
                  onChange={this.switchNet}
                  checked={this.state.checked}
                ></input>
                <span> {this.state.labelNet}</span>
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                </label>
              </div>
            </div>
          </div>
        </div>
        <div id="table"></div>
      </div>
    )
  }
}

export default PipeConnect