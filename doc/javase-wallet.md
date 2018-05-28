## IONC-wallet-server(JAVA_SE)

how to build a ethereum wallet via org.web3j.core 

    可参考：https://github.com/ethjava/web3j-sample

#### Maven Dependency
Java 8:

    <dependency>
        <groupId>org.web3j</groupId>
        <artifactId>core</artifactId>
        <version>3.4.0</version>
    </dependency>
    
Android:

    <dependency>
        <groupId>org.web3j</groupId>
        <artifactId>core</artifactId>
        <version>3.3.1-android</version>
    </dependency>


step 1: 获得web3j支持

    HttpService httpService = new HttpService("https://ropsten.infura.io/JOEnl84Gm76oX0RMUrJB");
    web3 = Web3j.build(httpService);
    Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().sendAsync().get();
    String clientVersion = web3ClientVersion.getWeb3ClientVersion();
    System.out.println(clientVersion);

step 2: 通过BIP39算法生成钱包（助记词、私钥、公钥、地址、keystore文件）
        
     String keyStoreDir = WalletUtils.getDefaultKeyDirectory();
     System.out.println("生成keyStore文件的默认目录：" + keyStoreDir);
     //通过密码及keystore目录生成钱包
     Bip39Wallet wallet = WalletUtils.generateBip39Wallet("yourpassword", new File(keyStoreDir));
     //keyStore文件名
     System.out.println(wallet.getFilename());
     //12个单词的助记词
     System.out.println(wallet.getMnemonic());
     
step 3-1: 通过密码与助记词获得钱包地址、公钥及私钥信息  
 
     Credentials credentials = WalletUtils.loadBip39Credentials("yourpassword",
                 "cherry type collect echo derive shy balcony dog concert picture kid february");
     //钱包地址
     System.out.println(credentials.getAddress());
     //公钥16进制字符串表示
     System.out.println(credentials.getEcKeyPair().getPublicKey().toString(16));
     //私钥16进制字符串表示
     System.out.println(credentials.getEcKeyPair().getPrivateKey().toString(16));

 step 3-2: 通过密码与keyStore文件获得钱包地址、公钥及私钥信息  

     credentials = WalletUtils.loadCredentials("yourpassword", keyStoreDir + "/UTC--2018-05-22T02-46-57.932000000Z--ae45f5aec6e6e7c0780a2a09dc830a9c3cb5b16b.json" );
     System.out.println(credentials.getAddress());
     System.out.println(credentials.getEcKeyPair().getPublicKey().toString(16));
     System.out.println(credentials.getEcKeyPair().getPrivateKey().toString(16));

 step 4: 通过密码与keyStore文件进行转账操作 
     
    try {
         web3 = Web3j.build(new HttpService("http://127.0.0.1:8545"));  
         //通过密码和keystore文件获得钱包控制权
         Credentials credentials = WalletUtils.loadCredentials("aaaaaaaa", "/Users/yves/ethereum/privateChain/keystore/UTC--2018-05-22T11-48-03.459005936Z--0df14334e094acc0197d52a415d799c2b8a3b04b");
         //转账交易
         TransactionReceipt transferReceipt = WalletTransfer.sendFunds(
            web3, credentials,//web3指定网络、credentials指定转出钱包账户
            "0x18f54aade5dde6ce3772b78b293d76c25d874f92",  // 将以太币发送到此账户
            BigDecimal.ONE, Convert.Unit.ETHER)
            .send();
    }catch (Exception e){
         e.printStackTrace();
    }      
    
 step 5: 通过账户地址查询余额
 
    web3 = Web3j.build(new HttpService("http://127.0.0.1:8545"));
    Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().sendAsync().get();
 
    EthGetBalance ethGetBalance = web3
                         .ethGetBalance("0x0df14334e094acc0197d52a415d799c2b8a3b04b", DefaultBlockParameterName.LATEST)
                         .sendAsync()
                         .get();        
 
    BigInteger wei = ethGetBalance.getBalance();         
    System.out.println("balance is :" + wei);
    
    
 step 6:通过私钥导入钱包；
 
    /**
      * 导入私钥
      *
      * @param privateKey 私钥
      * @param password   密码
      * @param directory  存储路径 默认测试网络WalletUtils.getTestnetKeyDirectory() 默认主网络 WalletUtils.getMainnetKeyDirectory()
      */
     private static void importPrivateKey(BigInteger privateKey, String password, String directory) {
         ECKeyPair ecKeyPair = ECKeyPair.create(privateKey);
         try {
             String keystoreName = WalletUtils.generateWalletFile(password,
                     ecKeyPair,
                     new File(directory),
                     true);
             System.out.println("keystore name " + keystoreName);
         } catch (CipherException | IOException e) {
             e.printStackTrace();
         }
     }

      
 step 7: 代币信息查询、账户代币余额查询及钱包转账操作
    
    具体请查看当前目录的TokenClient.java文件
   
