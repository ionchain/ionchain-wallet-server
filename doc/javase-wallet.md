## IONC-wallet-server(JAVA_SE)

how to build a ethereum wallet via org.web3j.core 


step 1: 获得web3j支持

    HttpService httpService = new HttpService("http://127.0.0.1:7545/");
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
