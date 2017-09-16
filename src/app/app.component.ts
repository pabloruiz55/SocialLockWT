import { Component, HostListener, NgZone, OnInit } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const metaincoinArtifacts = require('../../build/contracts/MetaCoin.json');
import { canBeNumber } from '../util/validation';

declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  MetaCoin = contract(metaincoinArtifacts);

  // TODO add proper types these variables
  account: any;
  accounts: any;
  web3: any;

  balance: number;
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;

  contractAddress:any;

  constructor(private _ngZone: NgZone) {

  }

  ngOnInit(){
    //console.log("hola");
    this.checkAndInstantiateWeb3();
    this.onReady();
  }

  // @HostListener('window:load')
  // windowLoaded() {
  //   this.checkAndInstantiateWeb3();
  //   this.onReady();
  // }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
  };

  onReady(){
    // Bootstrap the MetaCoin abstraction for Use.
    this.MetaCoin.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      this.accounts = accs;
      //console.log(this.accounts);
      this.account = this.accounts[0];

      this.refreshBalance();
      this.getContractAddress();
      console.log("cuenta logueada: ",this.account);
      this.getBalanceOfAccount(this.account);

    });
  };

  refreshBalance(){
    let meta = this.MetaCoin.deployed()
    .then(instance => {
      instance.getBalance.call(this.account, {from: this.account}).then(
        value => {
          this.balance = value;
          this.getBalanceOfAccount(this.account);
          this.getContractBalance();
        }).catch(function(e) {
          console.log(e);
          this.setStatus('Error getting balance; see log.');
        })
    });
  }

  setStatus = message => {
    this.status = message;
  };

  getBalanceOfAccount(_account:string){
    let meta = this.MetaCoin.deployed()
    .then(instance => {
      instance.getBalance.call(_account, {
        from: this.account
      }).then(
        function(balance) {
          console.log("Cuenta logueada:",_account);
          console.log("Balance de la cuenta logueada:",balance.toNumber());
        }).catch(function(e) {
          console.log(e);
          this.setStatus('Error getting balance; see log.');
        })
    });
  }

  // RECORDAR QUE ESTA ES LA MANERA DE HACERLO!!!!!
  getContractBalance(){
    let meta = this.MetaCoin.deployed()
    .then(instance => {
      instance.getContractBalance.call().then(
        function(balance) {
          console.log("Balance del contrato:",balance.toNumber());
        }).catch(function(e) {
          console.log(e);
          this.setStatus('Error getting balance; see log.');
        })
    });
  }

  payCoin(amount:number){

    let meta;
    this.setStatus('Initiating transaction... (please wait)');
    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.payCoin(this.account, amount, {
          from: this.account
        });
      })
      .then(() => {
        this.setStatus('Transaction complete!');
        //Chequear esto despues. Por qué tengo que hacer el timeout
        //para que le de tiempo de actualizar el valor antes de cheuqear balance?
        setTimeout(()=>{
          this.refreshBalance();
        },3000)
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  };

  testBalance(){
    //this.refreshBalance();
    this.getBalanceOfAccount(this.account);
    this.getContractBalance();
  }

  // User to user. Está desactualizado. VER payCoin()
  sendCoin(amount:number,receiver:string){

    let meta;

    this.setStatus('Initiating transaction... (please wait)');

    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.sendCoin(receiver, amount, {
          from: this.account
        });
      })
      .then(() => {
        this.setStatus('Transaction complete!');
        //this.refreshBalance();
        this.getBalanceOfAccount(this.account);
        this.getContractBalance();

      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  };

  getContractAddress(){
    this.MetaCoin
      .deployed()
      .then(instance => {
        console.log("Contract Address: ",instance.address);
        this.getContractBalance();
        this.contractAddress = instance.address;
      })
  }
}
