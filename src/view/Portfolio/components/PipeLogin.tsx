import React, { Component } from "react";
import Pipeline from "@pipeline-ui-2/pipeline";

const HDL = 137594422
const tinymanHDL = 552706313
const HDLyieldy = 596954871

interface IProps {
    checkAll(address: string);
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

const wallet = Pipeline.init()
Pipeline.main = true
class PipeLogin extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            myAddress: "",
            walletBalance: 0,
            checked: true,
            labelNet: "MainNet",
        }
    }

    handleSwitch = (event) => {
        Pipeline.pipeConnector = event.target.value
        console.log(Pipeline.pipeConnector)
    }

    checkAll = async () => {
        let address;
        if (Pipeline.pipeConnector === "myAlgoWallet") {
            const wallet = Pipeline.init();
            address = await Pipeline.connect(wallet);
        } else {
            address = await Pipeline.connect();
        }

        this.props.checkAll(address);

        // try {

        //     let url = "https://algoindexer.algoexplorerapi.io"


        //     let appData = await fetch(url + '/v2/accounts/' + address)
        //     let appJSON = await appData.json()

        //     appJSON.account.assets.forEach(element => {
        //         switch (element["asset-id"]) {
        //             case HDL:
        //                 alert("myHDL" + element.amount / 1000000)
        //                 break;
        //             case tinymanHDL:
        //                 alert("myTiny" + element.amount / 1000000)
        //                 break;
        //             default:
        //                 break;
        //         }
        //     })

        //     let appIds = [HDLyieldy]

        //     let AppStates = await appJSON.account["apps-local-state"]
        //     AppStates.forEach(async (state) => {
        //         if (appIds.includes(state.id)) {
        //             console.log(state)
        //             let keyvalues = state["key-value"]
        //             keyvalues.forEach(entry => {
        //                 switch (entry.key) {
        //                     case "VXNlcl9TdGFrZQ==":
        //                         //let User_Stake = fromMicroFormatNumber(window.atob(entry.value.byte))
        //                         break;
        //                     default:
        //                         break;
        //                 }
        //             })
        //         }
        //     })
        //     let params = await Pipeline.getParams()

        //     let note = Math.random().toString()

        //     let txnTest = Pipeline.makeTransfer(address, 0, note, 0, params)

        //     let signed = await Pipeline.sign(txnTest)

        //     return [signed.toString(), address]

        // }
        // catch (error) { console.log(error) }
    }

    render() {
        return (
            <div>
                <select id="walletswitchmain" onChange={(this.handleSwitch)} className="crayons-select">
                    <option>myAlgoWallet</option>
                    <option>WalletConnect</option>
                    <option>AlgoSigner</option>
                </select>
                <div className="mb-3 mt-3" >
                    <input
                        type="button"
                        onClick={() => this.checkAll()}
                        id="algbtn"
                        name="commit"
                        value="Connect to Algorand" className="crayons-btn crayons-btn--l w-100" />
                </div>
            </div>

        )
    }
}


export default PipeLogin