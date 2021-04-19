<template>
  <div><!--最外层容器-->
    <div style="float:right;margin:0 0 0 -800px; width:100%">

      <div style="margin:50px 0 0 800px; background:#00000000">
        <div style="width:400px;background:#00000000">
          <template>{{ mintTextValue }}</template>
        </div>
        <div style="width:400px;background:#00000000">
          <el-input v-model="input1" placeholder="to"></el-input>
        </div>
        <div style="width:400px;background:#00000000">
          <el-input v-model="input2" placeholder="value"></el-input>
        </div>

        <div style="width:400px;background:#00000000">
          <template>{{ multiText7 }}</template>
          <el-input v-model="multiTextInput9" placeholder="签名信息"></el-input>
        </div>

        <div>
          <el-button @click="mintFunction">{{ claim }}</el-button>
        </div>

        <div style="width:400px;margin:20px 0 0 0;background:#00000000">
          <template>{{ multiText8 }}</template>
          <el-input v-model="multiTextInput10" placeholder=""></el-input>
        </div>
      </div>
    </div>


    <div style="float:left;margin:50px 0 0 100px ; background:#00000000">

      <div>
        <template>{{ multiAddressList }}</template>
      </div>
      <div>
        <div style="width:400px;background:#00000000">
          <template>{{ multiText1 }}</template>
          <el-input v-model="multiTextInput1" placeholder="地址1"></el-input>
        </div>
        <div style="width:400px;background:#00000000">
          <template>{{ multiText2 }}</template>
          <el-input v-model="multiTextInput2" placeholder="地址2"></el-input>
        </div>
        <div style="width:400px;background:#00000000">
          <template>{{ multiText3 }}</template>
          <el-input v-model="multiTextInput3" placeholder="地址3"></el-input>
        </div>
        <div style="width:400px;background:#00000000">
          <template>{{ multiText4 }}</template>
          <el-input v-model="multiTextInput4" placeholder="地址4"></el-input>
        </div>
        <div style="width:400px;background:#00000000">
          <template>{{ multiText5 }}</template>
          <el-input v-model="multiTextInput5" placeholder="地址5"></el-input>
        </div>
        <div style="width:400px;background:#00000000">
          <template>{{ multiText6 }}</template>
          <el-input v-model="multiTextInput6" placeholder="阈值"></el-input>
        </div>
        <div style="width:400px;background:#00000000">
          <template>{{ multiText7 }}</template>
          <el-input v-model="multiTextInput7" placeholder="签名信息"></el-input>
        </div>

        <div>
          <el-button @click="editFunction">{{ editAddress }}</el-button>
        </div>

        <div style="width:400px;margin:20px 0 0 0;background:#00000000">
          <template>{{ multiText8 }}</template>
          <el-input v-model="multiTextInput8" placeholder=""></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const yfxToken = '41528d4f67c7055152052058cd9646c8e2cbfe729e';
const owner_address = '41384da1b1e9d08842d523872b4d42f62c0d97c74f';

export default {
  data() {
    return {
      multiAddressList: '多签地址成员列表：',
      multiText1: '多签地址1（权重1）',
      multiText2: '多签地址2（权重1）',
      multiText3: '多签地址3（权重1）',
      multiText4: '多签地址4（权重1）',
      multiText5: '多签地址5（权重1）',
      multiText6: '阈值',
      multiText7: '多签数据(第一个签名不用输入)',
      multiText8: '签名后的签名信息（通过通讯工具将签名后的信息发送给下一个需要签名的人）:',
      multiTextInput1: '',
      multiTextInput2: '',
      multiTextInput3: '',
      multiTextInput4: '',
      multiTextInput5: '',
      multiTextInput6: '',
      multiTextInput7: '',
      multiTextInput8: '',
      multiTextInput9: '',
      multiTextInput10: '',

      claim: "mint",
      mintTextValue: 'mint功能:',
      input1: '',
      input2: '',

      editAddress: '修改权限',
    }
  },
  async mounted() {
    // import http from '@/request/api.js'
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      console.log("init tronweb success");
    }
    //初始化数据
    let accountdata = await window.tronWeb.trx.getAccount(owner_address)
    console.log(accountdata)
    if (accountdata.owner_permission.keys[0] !== undefined) {
      this.multiTextInput1 = window.tronWeb.address.fromHex(accountdata.owner_permission.keys[0].address)
    }
    if (accountdata.owner_permission.keys[1] !== undefined) {
      this.multiTextInput2 = window.tronWeb.address.fromHex(accountdata.owner_permission.keys[1].address)
    }
    if (accountdata.owner_permission.keys[2] !== undefined) {
      this.multiTextInput3 = window.tronWeb.address.fromHex(accountdata.owner_permission.keys[2].address)
    }
    if (accountdata.owner_permission.keys[3] !== undefined) {
      this.multiTextInput4 = window.tronWeb.address.fromHex(accountdata.owner_permission.keys[3].address)
    }
    if (accountdata.owner_permission.keys[4] !== undefined) {
      this.multiTextInput5 = window.tronWeb.address.fromHex(accountdata.owner_permission.keys[4].address)
    }

    this.multiTextInput6 = accountdata.owner_permission.threshold
  },

  methods: {
    async mintFunction() {
      if (!window.tronWeb && !window.tronWeb.defaultAddress.base58) {
        alert('未连接钱包')
        return;
      }
      this.multiTextInput10 = '';

      if (this.multiTextInput9 === undefined || this.multiTextInput9 === '') {
        let functionSelector = 'mint(address,uint256)';
        let parameters = [{type: 'address', value: this.input1}, {type: 'uint', value: this.input2}];
        let options = {};
        let transaction = await window.tronWeb.transactionBuilder.triggerSmartContract(
            yfxToken,
            functionSelector,
            options,
            parameters,
            window.tronWeb.defaultAddress.base58
        );
        console.log(transaction.transaction);

        let signedTransaction = await window.tronWeb.trx.multiSign(transaction, 0);

        let weightData = await window.tronWeb.trx.getSignWeight(signedTransaction, 0);
        if (weightData.current_weight >= accountdata.owner_permission.threshold) {
          const result = await window.tronWeb.trx.broadcast(signedTransaction);
          console.log(result);
        } else {
          console.log(JSON.stringify(signedTransaction));
        }
      }else {
        let signedTransaction = await window.tronWeb.trx.multiSign(transaction, 0);

        let weightData = await window.tronWeb.trx.getSignWeight(signedTransaction, 0);
        if (weightData.current_weight >= accountdata.owner_permission.threshold) {
          const result = await window.tronWeb.trx.broadcast(signedTransaction);
          console.log(result);
        } else {
          this.multiTextInput10 = JSON.stringify(signedTransaction)
        }
      }
    },

    async editFunction() {
      this.multiTextInput8 = '';
      console.log("multiTextInput8: " + this.multiTextInput8);
      console.log('default address: ' + window.tronWeb.defaultAddress.base58)
      if (!window.tronWeb && !window.tronWeb.defaultAddress.base58) {
        alert('未连接钱包')
        return;
      }
      let accountdata = await window.tronWeb.trx.getAccount(owner_address)

      if (this.multiTextInput7 === undefined || this.multiTextInput7 === '') {
        if (this.multiTextInput6 === undefined || this.multiTextInput6 === '') {
          alert('请输入参数')
          return;
        }

        if (this.multiTextInput1 === undefined || this.multiTextInput1 === '') {
          alert('请输入参数')
          return;
        }

        let ownerArr = [];
        let activesArr = [];
        let threshold = this.multiTextInput6;
        let jsonData = {
          "owner_address": owner_address,
          "owner": {
            "type": 0,
            "id": 0,
            "permission_name": "owner",
            "threshold": Number.parseInt(threshold),
            "keys": ownerArr
          },
          "actives": [{
            "type": 2,
            "id": 2,
            "permission_name": "active0",
            "threshold": Number.parseInt(threshold),
            "operations": "7fff1fc0037e0000000000000000000000000000000000000000000000000000",
            "keys": activesArr
          }]
        };

        if (this.multiTextInput1 !== undefined && this.multiTextInput1 !== '') {
          let option = {
            address: window.tronWeb.address.toHex(this.multiTextInput1),
            weight: 1
          }
          ownerArr.push(option);
          activesArr.push(option);
        }
        if (this.multiTextInput2 !== undefined && this.multiTextInput2 !== '') {
          let option = {
            address: window.tronWeb.address.toHex(this.multiTextInput2),
            weight: 1
          }
          ownerArr.push(option);
          activesArr.push(option);
        }
        if (this.multiTextInput3 !== undefined && this.multiTextInput3 !== '') {
          let option = {
            address: window.tronWeb.address.toHex(this.multiTextInput3),
            weight: 1
          }
          ownerArr.push(option);
          activesArr.push(option);
        }
        if (this.multiTextInput4 !== undefined && this.multiTextInput4 !== '') {
          let option = {
            address: window.tronWeb.address.toHex(this.multiTextInput4),
            weight: 1
          }
          ownerArr.push(option);
          activesArr.push(option);
        }
        if (this.multiTextInput5 !== undefined && this.multiTextInput5 !== '') {
          let option = {
            address: window.tronWeb.address.toHex(this.multiTextInput5),
            weight: 1
          }
          ownerArr.push(option);
          activesArr.push(option);
        }

        console.log('transaction1:   ' + JSON.stringify(jsonData))

        const url = 'https://api.shasta.trongrid.io/wallet/accountpermissionupdate';
        const options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(jsonData)
        };
        console.log(1111)
        fetch(url, options)
            .then(res => res.json())
            .then(async function (json) {
              console.log('transaction2:   ' + JSON.stringify(json))
              let signedTransaction = await window.tronWeb.trx.multiSign(json, 0);

              let weightData = await window.tronWeb.trx.getSignWeight(signedTransaction, 0);
              if (weightData.current_weight >= accountdata.owner_permission.threshold) {
                const result = await window.tronWeb.trx.broadcast(signedTransaction);
                console.log(result);
              } else {
                console.log(JSON.stringify(signedTransaction));
              }
            })
            .catch(err => console.error('error:' + err));
      } else {
        console.log('transaction3:   ' + this.multiTextInput7)
        let signedTransaction = await window.tronWeb.trx.multiSign(JSON.parse(this.multiTextInput7), 0);

        let weightData = await window.tronWeb.trx.getSignWeight(signedTransaction, 0);
        if (weightData.current_weight >= accountdata.owner_permission.threshold) {
          const result = await window.tronWeb.trx.broadcast(signedTransaction);
          console.log(result);
        } else {
          this.multiTextInput8 = JSON.stringify(signedTransaction);
        }
      }
    }
  }
}
</script>

<style>
</style>
