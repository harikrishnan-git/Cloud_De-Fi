import React, { Component,useState } from 'react'
import dai from '../dai.png'
import stake from 'stake.js'

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:"stake",
    };
  }
  render() {
    return (
      <div id="content" className="mt-3">
        <center><h1 className='text-dark'>De-Fi Token Farming</h1></center>
        <br /><br />
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mDAI</td>
              <td>{window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')} DAPP</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body bg-dark">
            <div className='flex'>
            <button className='btn btn-outline-primary' onClick={(e) =>{
              this.state.page = "stake"
            }}>STAKE</button>
            <button className='btn btn-outline-primary' onClick={(e) =>{
              this.state.page = "transfer"
            }}>TRANSFER</button>
            </div>
            {if(this.state.page=="stake"){
              return(<stake />)
            }else{
              return(<transfer />)
            }}
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
