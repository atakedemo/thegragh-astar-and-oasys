# thegragh-astar-and-oasys
Loot Adventureにおいてインデックス作成＆クロスチェーン検討のため作成

# ASTARテストネットでの対応
### 0. サンプルコントラクトのセットアップ
The Graphでインデックスを作成するNFTのコントラクトをShibuyaにデプロイする
1. /contract 配下へ移動し、コントラクトをデプロイする
   ``` bash
   npx hardhat run --network shibuya scirpts/deploy_nft_sample.js
   ``` 

2. 環境変数を設定する。/contract/.env を作成し、下記変数を設定する。
    ```
    PRIVATE_KEY=(開発用の秘密鍵)
    API_URL_SHIBUYA=(Shibuyaで使用するRPC URL ex:https://shibuya.blastapi.io/~)
    API_KEY_SHIBUYA=(エクスプローラのAPIキー ex:abc1234~)
   ```
3. コントラクトを検証する
   ``` bash
   npx hardhat verify --network shibuya CONTRACT_ADDRESS
   ```

4.  コントラクトを検証する
    ``` bash
    npx hardhat verify --network shibuya CONTRACT_ADDRESS
    ```
   
5.  エクスプローラーでコントラクトをミントする

### 1. Gragh Nodeの変更
1. graph-node/docker-compose.ymlを変更
   ``` 
   version: '3'
   services:
     graph-node:
       image: graphprotocol/graph-node
       ports:
         - '8000:8000'
         - '8001:8001'
         - '8020:8020'
         - '8030:8030'
         - '8040:8040'
       depends_on:
         - ipfs
         - postgres
       extra_hosts:
         - 172.25.0.1:host-gateway
       environment:
         postgres_host: postgres
         postgres_user: graph-node
         postgres_pass: let-me-in
         postgres_db: graph-node
         ipfs: 'ipfs:5001'
         #ethereum: 'mainnet:http://172.25.0.1:8545'
         ethereum: 'shibuya:https://shibuya.blastapi.io/~'
         #ethereum: 'mchtestnet:https://rpc.oasys.sand.mchdfgh.xyz/'
         GRAPH_LOG: info
    ...
   ``` 
  
2. dockerの更新を反映
   ``` bash
   ./setup.sh
   docker-compose up
   ```

### 2. Subgraphの変更
1. la-itemnft-astar/subgraph.yamlを変更
   ```
   specVersion: 0.0.5
   schema:
     file: ./schema.graphql
   dataSources:
     - kind: ethereum
       name: SampleItemNft
      # network: mainnet
      # source:
      #   address: "0x~"
      #   abi: SampleItemNft
      #   startBlock: 38689776
       network: shibuya
       source:
         address: "0x~"
         abi: SampleItemNft
         startBlock: 123~
   ```

3. la-itemnft-astar/networks.jsonを変更(各コントラクトの情報は自身の設定に合わせて変更)
   ```
   {
    "mainnet": {
      "SampleItemNft": {
        "address": "0x~",
        "startBlock": 123~
      }
    },
    "shibuya": {
      "SampleItemNft": {
        "address": "0x~",
        "startBlock": 123~
      }
    }
   } 
   ``` 

3. Subgraphをデプロイして更新を反映
   ``` bash
   yarn create-local
   yarn deploy-local
   ```

4. 上記3で表示されるURLへアクセスし、クエリできることを確認する。
   ``` bash
   ...
   
   Deployed to http://localhost:8000/subgraphs/name/atakedemo/la-itemnft-astar/graphql

   Subgraph endpoints:
   Queries (HTTP):     http://localhost:8000/subgraphs/name/atakedemo/la-itemnft-astar
   ```

### 3.表示用フロントエンドの作成
1. アプリの作成
   ``` bash
   npx create-next-app front-web
   ```
2. ライブラリインストール
   ``` bash
   cd front-web
   npm install @apollo/client 
   ```
3. 接続先の変更｜front-web/pages/_app.tsx でDockerにてローカルで立ち上げたGraphノードへの接続情報を設定する。
   ```
   const client = new ApolloClient({
     cache: new InMemoryCache(),
     //uri: 'https://api.studio.thegraph.com/query/34004/[プロジェクト名]/[バージョン名]',
     uri: 'http://localhost:8000/subgraphs/name/atakedemo/la-itemnft-astar',
   })

    export default function App({ Component, pageProps }: AppProps) {
      return (
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      )
    } 
   ```
4. ローカルで起動
   ``` bash
   npx run dev  
   ```

***
# Oasys テストネットでの対応
各接続先情報をOasysテストネットのものや、Verce Layerのテストネットの接続先情報へ変更する
（追記中）

***
# 参考資料
* [Deploy Subgraphs to Any EVM](https://medium.com/coinmonks/deploy-subgraphs-to-any-evm-aaaccc3559f)
* [The Graph | Astar Docs](https://docs.astar.network/docs/build/integrations/indexers/thegraph)
* [TheGraph(Subgraph)を使って独自のERC20トークンの保有者一覧をフロント（React）に表示する - Qiita](https://qiita.com/toshiaki_takase/items/761435120d7ca9c7ff6c#react%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E6%A7%8B%E7%AF%89)